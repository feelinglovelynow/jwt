import { describe, test, expect } from '@jest/globals'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'


describe('decodeJWT()', () => {
  test('returns correctly if isFor is generate', () => {
    expect(getAlgorithmOptions('generate')).toEqual({ name: 'ECDSA', namedCurve: 'P-521' })
  })


  test('returns correctly if isFor is import', () => {
    expect(getAlgorithmOptions('import')).toEqual({ name: 'ECDSA', namedCurve: 'P-521' })
  })


  test('returns correctly if isFor is not generate or import', () => {
    const options = [ 'sign', 'verify', '9generate', '9import', '', null, undefined, 'hmm' ]

    for (const isFor of options) { // @ts-ignore
      expect(getAlgorithmOptions(isFor)).toEqual({ name: 'ECDSA', hash: { name: 'SHA-512' } })
    }
  })
})
