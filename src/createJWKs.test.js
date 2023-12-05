import { createJWKs } from './createJWKs.js'
import { describe, test, expect, jest } from '@jest/globals'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'


const publicKey = '123'
const privateKey = 'abc'
const publicJWK = { key_ops: ['verify'] }
const privateJWK = { key_ops: ['sign'] }


function setCryptoMock() {
  crypto.subtle.generateKey = jest.fn(() => {
    return Promise.resolve({ privateKey, publicKey })
  })

  crypto.subtle.exportKey = jest.fn((_, key) => {
    return key === publicKey ? 
      Promise.resolve(publicJWK) :
      Promise.resolve(privateJWK)
  })

  console.log = jest.fn()
}


describe('createJWKs()', () => {
  beforeEach(async () => {
    setCryptoMock()
    await createJWKs()
  })


  afterEach(() => {
    jest.restoreAllMocks()
  })


  test('calls crypto.subtle.generateKey()', () => {
    
    expect(crypto.subtle.generateKey).toHaveBeenCalled()
    expect(crypto.subtle.generateKey).toHaveBeenCalledWith(getAlgorithmOptions('generate'), true, ['sign', 'verify'])
  })


  test('calls crypto.subtle.exportKey() and console.log()', () => {
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('privateJWK', JSON.stringify(privateJWK))
    expect(console.log).toHaveBeenCalledWith('publicJWK', JSON.stringify(publicJWK))
  })
})
