/**
 * Decode JWT token
 * @param { string } jwt 
 * @param { any } Buffer 
 * @returns { any }
*/
export function decodeJWT (jwt, Buffer) {
  const jwtParts = jwt.split('.')

  if (jwtParts.length !== 3) throw { id: 'fln__decode__invalid-part-length', message: 'Please provide a token with 3 parts', _errorData: { jwt } }
  else return JSON.parse(Buffer.from(jwtParts[1], 'base64').toString())
}
