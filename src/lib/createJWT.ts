import toBase64Url from './toBase64Url'
import getAlgorithmOptions from './getAlgorithmOptions'
import getHeaderAndPayloadAsStrings from './getHeaderAndPayloadAsStrings'


export default async function createJWT (jwtPayload: Object, expiresInAsSeconds: number, privateJWK: string, Buffer: any): Promise<string> {
  const privateKey = await crypto.subtle.importKey('jwk', JSON.parse(privateJWK), getAlgorithmOptions('import'), true, ['sign'])
  const { header, payload, united } = getHeaderAndPayloadAsStrings(jwtPayload, expiresInAsSeconds)
  const unitedAsArrayBuffer = new TextEncoder().encode(united)
  const signatureAsArrayBuffer = await crypto.subtle.sign(getAlgorithmOptions('sign'), privateKey, unitedAsArrayBuffer)

  const signatureAsBase64 = toBase64Url(new Uint8Array(signatureAsArrayBuffer), Buffer)
  const headerAsBase64 = toBase64Url(header, Buffer)
  const payloadAsBase64 = toBase64Url(payload, Buffer)

  return `${headerAsBase64}.${payloadAsBase64}.${signatureAsBase64}`
}
