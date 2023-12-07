/**
 * Decode JWT token
 * @param { string } jwt 
 * @param { any } Buffer
 * @throws { { id: 'fln__decode__invalid-jwt', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } } } - `IF (!jwt || typeof jwt !== 'string' || jwt.split('.').length !== 3)`
 * @returns { any }
*/
export function decodeJWT (jwt, Buffer) {
  return JSON.parse(Buffer.from(getPayload(jwt), 'base64').toString())
}


/**
 * Get payload section of JWT token
 * @param { string } jwt 
 * @returns { string }
 */
function getPayload (jwt) {
  const error = { id: 'fln__decode__invalid-jwt', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } }

  if (!jwt || typeof jwt !== 'string') throw error

  const parts = jwt.split('.')

  if (parts.length !== 3) throw error

  return parts[1]
}
