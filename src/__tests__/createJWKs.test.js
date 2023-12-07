import { createJWKs } from '../createJWKs.js'
import { getAlgorithmOptions } from '../getAlgorithmOptions.js'
import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'


/** @type { jest.SpiedFunction<typeof crypto.subtle.generateKey> } */
let spyGenerateKey

/** @type { jest.SpiedFunction<typeof crypto.subtle.exportKey> } */
let spyExportKey

/** @type { jest.SpiedFunction<typeof JSON.stringify> } */
let spyJsonStringify


describe('createJWKs()', () => {
  beforeEach(async () => {
    spyGenerateKey = jest.spyOn(crypto.subtle, 'generateKey')
    spyExportKey = jest.spyOn(crypto.subtle, 'exportKey')
    spyJsonStringify = jest.spyOn(JSON, 'stringify')
    jest.spyOn(console, 'log')
    await createJWKs()
  })


  afterEach(() => {
    jest.restoreAllMocks()
  })


  test('calls crypto.subtle.generateKey()', () => {
    expect(crypto.subtle.generateKey).toHaveBeenCalledTimes(1)
    expect(crypto.subtle.generateKey).toHaveBeenCalledWith(getAlgorithmOptions('generate'), true, ['sign', 'verify'])
  })


  test('calls crypto.subtle.exportKey()', async () => {
    /** @type { CryptoKeyPair } */ // @ts-ignore
    const { privateKey, publicKey } = await spyGenerateKey.mock.results[0].value

    expect(crypto.subtle.exportKey).toHaveBeenCalledTimes(2)
    expect(crypto.subtle.exportKey).toHaveBeenCalledWith('jwk', privateKey)
    expect(crypto.subtle.exportKey).toHaveBeenCalledWith('jwk', publicKey)
  })


  test('calls JSON.stringify()', async () => {
    expect(JSON.stringify).toHaveBeenCalledTimes(2)
    expect(JSON.stringify).toHaveBeenCalledWith(await spyExportKey.mock.results[0].value)
    expect(JSON.stringify).toHaveBeenCalledWith(await spyExportKey.mock.results[1].value)
  })


  test('calls console.log()', async () => {
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('privateJWK', spyJsonStringify.mock.results[0].value)
    expect(console.log).toHaveBeenCalledWith('publicJWK', spyJsonStringify.mock.results[1].value)
  })
})
