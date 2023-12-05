import { Buffer } from 'node:buffer'
import { verifyJWT } from './verifyJWT.js'
import { createJWT } from './createJWT.js'
import { Buffer as BufferEdge } from 'buffer/'
import { describe, test, expect } from '@jest/globals'


let jwt, jwtExpired

const expiresInAsSeconds = 540
const jwtPayload = { sessionUid: 'abc' }
const privateJWK = JSON.stringify({ "key_ops": ["sign"], "ext": true, "kty": "EC", "x": "AD80hVKyHYqKqjeLDzLpqTFlObQY1f5IMW5Qy5CwjTeUbyN27MjESrd6MiXie0WoL-UeSdmRYZcfq_qC5AAOEMQC", "y": "Af7FMqnihRgSUdKP4rneIy8Ktca8EwnAhcQEr7octiguDNyvQlhClsSVDTSA9ARBkS-zDEl4a3LOZG6KR5odZDrY", "crv": "P-521", "d": "AOkTBT9NbybzQPQO6P1ZBfqBc299eBNfGyrYq3B5xgY7fP4_WBEEbtEy0Zyl4B-U0tEN0gJCfIHojedqLvlYcOaT" })
const publicJWK = JSON.stringify({ "key_ops": ["verify"], "ext": true, "kty": "EC", "x": "AD80hVKyHYqKqjeLDzLpqTFlObQY1f5IMW5Qy5CwjTeUbyN27MjESrd6MiXie0WoL-UeSdmRYZcfq_qC5AAOEMQC", "y": "Af7FMqnihRgSUdKP4rneIy8Ktca8EwnAhcQEr7octiguDNyvQlhClsSVDTSA9ARBkS-zDEl4a3LOZG6KR5odZDrY", "crv": "P-521" })

async function bindJwt () {
  if (!jwt && !jwtExpired) {
    jwt = await createJWT(jwtPayload, expiresInAsSeconds, privateJWK, Buffer)
    jwtExpired = await createJWT(jwtPayload, -Math.abs(expiresInAsSeconds), privateJWK, Buffer)
  }
}


describe('verifyJWT()', () => {
  describe('throws if jwt', () => {
    test('has an incorrect format', async () => {
      const jwtOptions = [ undefined, null, 10, '', 'a', 'a.b', 'a.b,c' ]

      for (const jwt of jwtOptions) {
        let error
        const expectedError = { id: 'fln__verify__bad-format', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } }

        try { await verifyJWT(jwt, publicJWK, Buffer) }
        catch (e) { error = e }

        expect(error).toEqual(expectedError)

        try { await verifyJWT(jwt, publicJWK, BufferEdge) }
        catch (e) { error = e }

        expect(error).toEqual(expectedError)
      }
    })


    test('is expired', async () => {
      await bindJwt()

      let error
      const expectedError = { id: 'fln__verify__expired', message: 'Token has expired', _errorData: { jwt: jwtExpired } }

      try { await verifyJWT(jwtExpired, publicJWK, Buffer) }
      catch (e) { error = e }

      expect(error).toEqual(expectedError)

      try { await verifyJWT(jwtExpired, publicJWK, BufferEdge) }
      catch (e) { error = e }

      expect(error).toEqual(expectedError)
    })


    test('is invalid', async () => {
      await bindJwt()

      let error
      const jwtInvalid = jwt.slice(0, -1)
      const expectedError = { id: 'fln__verify__invalid', message: 'Token is invalid', _errorData: { jwt: jwtInvalid } }

      try { await verifyJWT(jwtInvalid, publicJWK, Buffer) }
      catch (e) { error = e }

      expect(error).toEqual(expectedError)

      try { await verifyJWT(jwtInvalid, publicJWK, BufferEdge) }
      catch (e) { error = e }

      expect(error).toEqual(expectedError)
    })
  })


  test('verifies', async () => {
    await bindJwt()

    const r1 = await verifyJWT(jwt, publicJWK, Buffer)
    expect(r1).toEqual(jwtPayload)

    const r2 = await verifyJWT(jwt, publicJWK, BufferEdge)
    expect(r2).toEqual(jwtPayload)
  })
})
