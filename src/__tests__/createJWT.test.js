import { Buffer } from 'node:buffer'
import { createJWT } from '../createJWT.js'
import { Buffer as BufferEdge } from 'buffer/'
import { toBase64Url } from '../toBase64Url.js'
import { getAlgorithmOptions } from '../getAlgorithmOptions.js'
import { getHeaderAndPayloadAsStrings } from '../getHeaderAndPayloadAsStrings.js'
import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'


/** @type { string } */
let jwt

/** @type { string } */
let jwtEdge

/** @type { jest.SpiedFunction<typeof crypto.subtle.sign> } */
let spySign

/** @type { jest.SpiedFunction<typeof crypto.subtle.importKey> } */
let spyImportKey

const expiresInAsSeconds = 540
const jwtPayload = { userUid: 'userUid9', signInId: 'signInId9' }
const privateJWK = JSON.stringify({ "key_ops": ["sign"], "ext": true, "kty": "EC", "x": "ASD9FAf6K79rBE4WtN1QPwxIQ0BJToa64nolcyuq7EnbQdivt7HjHYIktMeWjCNy4v2AdzxKMM7sDLIzDN8ljilc", "y": "AKf50KZlHgptseBbzaP5rZnLmSkSS-DQSE1UUgN_YGo9eUP1sWNjBMAyXCpsk3rvEgZtYq3_7gH-TmH7LLcZTf0V", "crv": "P-521", "d": "ATQGp5GjYX3x5_xKRg91F6NKz1DuW1q9w1L4JYbcqT62za_v910LsyrUKd_cZX8Mwldj3IcmNzS8Horzu7ijXYzx" })



describe('createJWT()', () => {
  beforeEach(async () => {
    spySign = jest.spyOn(crypto.subtle, 'sign')
    spyImportKey = jest.spyOn(crypto.subtle, 'importKey')
    jwt = await createJWT(jwtPayload, expiresInAsSeconds, privateJWK, Buffer)
    jwtEdge = await createJWT(jwtPayload, expiresInAsSeconds, privateJWK, BufferEdge)
  })


  afterEach(() => {
    jest.restoreAllMocks()
  })


  test('calls crypto.subtle.importKey()', () => {
    expect(spyImportKey).toHaveBeenCalled()
    expect(spyImportKey).toHaveBeenCalledWith('jwk', JSON.parse(privateJWK), getAlgorithmOptions('import'), true, ['sign'])
  })


  test('calls crypto.subtle.sign()', async () => {
    const privateKey = await spyImportKey.mock.results[0].value
    const { united } = getHeaderAndPayloadAsStrings(jwtPayload, expiresInAsSeconds)
    const unitedAsArrayBuffer = new TextEncoder().encode(united)

    expect(spySign).toHaveBeenCalled()
    expect(spySign).toHaveBeenCalledWith(getAlgorithmOptions('sign'), privateKey, unitedAsArrayBuffer)
  })


  test('returns', async () => {
    /** @type { CryptoKey } */ // @ts-ignore
    const { header, payload } = getHeaderAndPayloadAsStrings(jwtPayload, expiresInAsSeconds)

    /** @type { ArrayBuffer } */ // @ts-ignore
    const signatureAsArrayBuffer = await spySign.mock.results[0].value

    /** @type { ArrayBuffer } */ // @ts-ignore
    const signatureAsArrayBufferEdge = await spySign.mock.results[1].value

    const headerAsBase64 = toBase64Url(header, Buffer)
    const payloadAsBase64 = toBase64Url(payload, Buffer)
    const signatureAsBase64 = toBase64Url(new Uint8Array(signatureAsArrayBuffer), Buffer)

    const headerAsBase64Edge = toBase64Url(header, BufferEdge)
    const payloadAsBase64Edge = toBase64Url(payload, BufferEdge)
    const signatureAsBase64Edge = toBase64Url(new Uint8Array(signatureAsArrayBufferEdge), BufferEdge)

    expect(jwt).toEqual(`${ headerAsBase64 }.${ payloadAsBase64 }.${ signatureAsBase64 }`)
    expect(jwtEdge).toEqual(`${ headerAsBase64Edge }.${ payloadAsBase64Edge }.${ signatureAsBase64Edge }`)
  })
})
