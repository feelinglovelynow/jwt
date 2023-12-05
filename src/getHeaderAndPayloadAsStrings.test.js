import { describe, test, expect } from '@jest/globals'
import { getNowInSeconds } from './getNowInSeconds.js'
import { getHeaderAndPayloadAsStrings } from './getHeaderAndPayloadAsStrings.js'


const expiresInAsSeconds = 540
const payloadAsObject = { sessionUid: 'abc', username: 'chris' }


describe('getHeaderAndPayloadAsStrings()', () => {
  test('returns correctly', () => {
    const header = JSON.stringify({ alg: 'ES512', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
    const payloadAsString = JSON.stringify(payloadAsObject)

    expect(getHeaderAndPayloadAsStrings(payloadAsObject, expiresInAsSeconds)).toEqual({
      header,
      payload: payloadAsString,
      united: `${ header }.${ payloadAsString }`
    })
  })
})
