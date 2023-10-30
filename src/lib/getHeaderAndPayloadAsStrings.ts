import getNowInSeconds from './getNowInSeconds'


export default function getHeaderAndPayloadAsStrings (payloadAsObject: any, expiresInAsSeconds: number) {
  const header = JSON.stringify({ alg: 'ES512', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
  const payloadAsString = JSON.stringify(payloadAsObject)
  return { payload: payloadAsString, header, united: `${header}.${payloadAsString}` }
}
