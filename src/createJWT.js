import { toBase64Url } from './toBase64Url.js'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'
import { getHeaderAndPayloadAsStrings } from './getHeaderAndPayloadAsStrings.js'

/**
 * Create JWT token
 * @param { Object } jwtPayload 
 * @param { number } expiresInAsSeconds 
 * @param { string } privateJWK 
 * @param { any } Buffer 
 * @returns { Promise<string> }
*/
export async function createJWT (jwtPayload, expiresInAsSeconds, privateJWK, Buffer) {
  const privateKey = await crypto.subtle.importKey('jwk', JSON.parse(privateJWK), getAlgorithmOptions('import'), true, ['sign'])
  const { header, payload, united } = getHeaderAndPayloadAsStrings(jwtPayload, expiresInAsSeconds)
  const unitedAsArrayBuffer = new TextEncoder().encode(united)
  const signatureAsArrayBuffer = await crypto.subtle.sign(getAlgorithmOptions('sign'), privateKey, unitedAsArrayBuffer)

  const signatureAsBase64 = toBase64Url(new Uint8Array(signatureAsArrayBuffer), Buffer)
  const headerAsBase64 = toBase64Url(header, Buffer)
  const payloadAsBase64 = toBase64Url(payload, Buffer)

  return `${ headerAsBase64 }.${ payloadAsBase64 }.${ signatureAsBase64 }`
}
