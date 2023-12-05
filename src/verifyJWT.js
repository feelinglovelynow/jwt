import { getNowInSeconds } from './getNowInSeconds.js'
import { getAlgorithmOptions } from './getAlgorithmOptions.js'

/**
 * Throws errors if JWT is invalid and returns the JWT's decoded payload if it's valid
 * @param { string } jwt 
 * @param { string } publicJWK 
 * @param {  any } Buffer 
 * @returns { Promise<any> }
*/
export async function verifyJWT (jwt, publicJWK, Buffer) {
  const tokenParts = getTokenParts(jwt)
  const headerAsString = Buffer.from(tokenParts[0], 'base64').toString() // base64 to string
  const expiresInAsSeconds = JSON.parse(headerAsString).exp

  if (expiresInAsSeconds <= getNowInSeconds()) throw { id: 'fln__verify__expired', message: 'Token has expired', _errorData: { jwt } }
  else {
    const signatureInUInt8 = Buffer.from(tokenParts[2], 'base64') // base46 to uInt8
    const headerPayloadAsArrayBuffer = new TextEncoder().encode(`${ headerAsString }.${ Buffer.from(tokenParts[1], 'base64').toString() }`)
    const publicKey = await crypto.subtle.importKey('jwk', JSON.parse(publicJWK), getAlgorithmOptions('import'), true, ['verify'])
    const isValid = await crypto.subtle.verify(getAlgorithmOptions('verify'), publicKey, signatureInUInt8, headerPayloadAsArrayBuffer)

    if (!isValid) throw { id: 'fln__verify__invalid', message: 'Token is invalid', _errorData: { jwt } }
    else return JSON.parse(Buffer.from(tokenParts[1], 'base64').toString()) // base64 to json
  }
}


/**
 * Get parts of token in an array of strings
 * @param { string } jwt 
 * @returns { string[] }
 */
function getTokenParts (jwt) {
  const error = { id: 'fln__verify__bad-format', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } }

  if (!jwt || typeof jwt !== 'string') throw error

  const parts = jwt.split('.')

  if (parts.length !== 3) throw error

  return parts
}
