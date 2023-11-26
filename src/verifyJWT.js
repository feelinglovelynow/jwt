import { getNowInSeconds } from './getNowInSeconds.js'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'

/**
 * Throws errors if JWT is invalid and returns the JWT's decoded payload if it's valid
 * @param { string } jwt 
 * @param { string } publicJWK 
 * @param {  any } Buffer 
 * @returns Promise<any>
*/
export async function verifyJWT (jwt, publicJWK, Buffer) {
  const tokenParts = jwt.split('.')

  if (tokenParts.length !== 3) throw { id: 'fln__verify__invalid-part-length', message: 'Please provide a token with 3 parts', _errorData: { jwt } }
  else {
    const headerAsString = Buffer.from(tokenParts[0], 'base64').toString() // base64 to string
    const expiresInAsSeconds = JSON.parse(headerAsString).exp

    if (expiresInAsSeconds <= getNowInSeconds()) throw { id: 'fln__verify__expired', message: 'Token has expired', _errorData: { jwt } }
    else {
      const signatureInUInt8 = Buffer.from(tokenParts[2], 'base64') // base46 to uInt8
      const headerPayloadAsArrayBuffer = new TextEncoder().encode(`${headerAsString}.${Buffer.from(tokenParts[1], 'base64').toString()}`)
      const publicKey = await crypto.subtle.importKey('jwk', JSON.parse(publicJWK), getAlgorithmOptions('import'), true, ['verify'])
      const isValid = await crypto.subtle.verify(getAlgorithmOptions('verify'), publicKey, signatureInUInt8, headerPayloadAsArrayBuffer)

      if (!isValid) throw { id: 'fln__verify__invalid', message: 'Token is invalid', _errorData: { jwt } }
      else return JSON.parse(Buffer.from(tokenParts[1], 'base64').toString()) // base64 to json
    }
  }
}
