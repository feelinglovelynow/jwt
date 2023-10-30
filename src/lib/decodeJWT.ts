export default function decodeJWT (jwt: string, Buffer: any) {
  const jwtParts = jwt.split('.')

  if (jwtParts.length !== 3) throw { id: 'fln__decode__invalid-part-length', message: 'Please provide a token with 3 parts' }
  else return JSON.parse(Buffer.from(jwtParts[1], 'base64').toString())
}
