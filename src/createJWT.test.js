import { Buffer } from 'node:buffer'
import { createJWT } from './createJWT.js'
import { Buffer as BufferEdge } from 'buffer/'
import { toBase64Url } from './toBase64Url.js'
import { getNowInSeconds } from './getNowInSeconds.js'
import { describe, test, expect, jest } from '@jest/globals'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'
import { getHeaderAndPayloadAsStrings } from './getHeaderAndPayloadAsStrings.js'


let jwt, jwtEdge, importSpy, signSpy, privateKey, signatureAsArrayBuffer


const expiresInAsSeconds = 540
const jwtPayload = { userUid: 'userUid9', signInId: 'signInId9' }
const header = JSON.stringify({ alg: 'ES512', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
const payload = JSON.stringify(jwtPayload)
const united = `${ header }.${ payload }`
const unitedAsArrayBuffer = new TextEncoder().encode(united)
const privateJWK = JSON.stringify({ "key_ops": ["sign"], "ext": true, "kty": "EC", "x": "ASD9FAf6K79rBE4WtN1QPwxIQ0BJToa64nolcyuq7EnbQdivt7HjHYIktMeWjCNy4v2AdzxKMM7sDLIzDN8ljilc", "y": "AKf50KZlHgptseBbzaP5rZnLmSkSS-DQSE1UUgN_YGo9eUP1sWNjBMAyXCpsk3rvEgZtYq3_7gH-TmH7LLcZTf0V", "crv": "P-521", "d": "ATQGp5GjYX3x5_xKRg91F6NKz1DuW1q9w1L4JYbcqT62za_v910LsyrUKd_cZX8Mwldj3IcmNzS8Horzu7ijXYzx" })


describe('createJWT()', () => {
  beforeEach(async () => {
    signSpy = jest.spyOn(crypto.subtle, 'sign')
    importSpy = jest.spyOn(crypto.subtle, 'importKey')
    jest.fn(getHeaderAndPayloadAsStrings, () => ({ header, payload, united }))
    jwt = await createJWT(jwtPayload, expiresInAsSeconds, privateJWK, Buffer)
    privateKey = await importSpy.mock.results[0].value
    signatureAsArrayBuffer = await signSpy.mock.results[0].value
  })


  afterEach(() => {
    jest.restoreAllMocks()
  })


  test('calls crypto.subtle.importKey()', () => {
    expect(importSpy).toHaveBeenCalled()
    expect(importSpy).toHaveBeenCalledWith('jwk', JSON.parse(privateJWK), getAlgorithmOptions('import'), true, ['sign'])
  })


  test('calls crypto.subtle.sign()', () => {
    expect(signSpy).toHaveBeenCalled()
    expect(signSpy).toHaveBeenCalledWith(getAlgorithmOptions('sign'), privateKey, unitedAsArrayBuffer)
  })


  test('returns', () => {
    const signatureAsBase64 = toBase64Url(new Uint8Array(signatureAsArrayBuffer), Buffer)
    const signatureAsBase64Edge = toBase64Url(new Uint8Array(signatureAsArrayBuffer), BufferEdge)
    const headerAsBase64 = toBase64Url(header, Buffer)
    const headerAsBase64Edge = toBase64Url(header, BufferEdge)
    const payloadAsBase64 = toBase64Url(payload, Buffer)
    const payloadAsBase64Edge = toBase64Url(payload, BufferEdge)
    expect(jwt).toEqual(`${ headerAsBase64 }.${ payloadAsBase64 }.${ signatureAsBase64 }`)
    expect(jwt).toEqual(`${ headerAsBase64Edge }.${ payloadAsBase64 }.${ signatureAsBase64 }`)
    expect(jwt).toEqual(`${ headerAsBase64Edge }.${ payloadAsBase64Edge }.${ signatureAsBase64 }`)
    expect(jwt).toEqual(`${ headerAsBase64Edge }.${ payloadAsBase64Edge }.${ signatureAsBase64Edge }`)
  })
})
