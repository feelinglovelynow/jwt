import { getNowInSeconds } from './getNowInSeconds.js'

/**
 * Recieves the payload for a JWT and its expiration and returns the header, payload and full JWT
 * @param { any } payloadAsObject 
 * @param { number } expiresInAsSeconds 
 * @returns { { header: string, payload: string, united: string } }
*/
export function getHeaderAndPayloadAsStrings (payloadAsObject, expiresInAsSeconds) {
  const header = JSON.stringify({ alg: 'ES512', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
  const payloadAsString = JSON.stringify(payloadAsObject)

  return {
    header,
    payload: payloadAsString,
    united: `${ header }.${ payloadAsString }`
  }
}
