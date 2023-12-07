import { Buffer } from 'node:buffer'
import { decodeJWT } from '../decodeJWT.js'
import { Buffer as BufferEdge } from 'buffer/'
import { describe, test, expect } from '@jest/globals'


describe('decodeJWT()', () => {
  test('throws if jwt is incorrect', () => {
    const jwtOptions = [ undefined, null, 9, '', 'a', 'a.b', 'a.b,c' ]

    for (const jwt of jwtOptions) {
      let error

      // @ts-ignore
      try { decodeJWT(jwt, Buffer) }
      catch (e) { error = e }

      expect(error).toEqual({ id: 'fln__decode__invalid-jwt', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } })

      // @ts-ignore
      try { decodeJWT(jwt, BufferEdge) }
      catch (e) { error = e }

      expect(error).toEqual({ id: 'fln__decode__invalid-jwt', message: 'Please provide a string token, with 3 parts, seperated by a dot', _errorData: { jwt } })
    }
  })

  
  test('decodes jwt', () => {
    const payload = { sessionUid: '0xfffd8d6ad4921cf0', userUid: '0xfffd8d6ad3a274ec' }

    const jwtOptions = [
      'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImV4cCI6MTcwMTc1MjkzNX0.eyJ1c2VyVWlkIjoiMHhmZmZkOGQ2YWQzYTI3NGVjIiwic2Vzc2lvblVpZCI6IjB4ZmZmZDhkNmFkNDkyMWNmMCJ9.AAd1mBRP96BwHEJLPX05uQh4YAzzFZKr77KiHv2-var_oGW5KyIXaMYDaMJatzI8TBekoM7GWKPLodLT7OLOT2YhAJl5JOlHPHlmtvVR_8526an6HpeHSG8ZA5SjXM74caDSnXDISz84BIWTdt_fW2em5_k36J8P3iiegA8TXtX0LVuF',
      'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImV4cCI6MTcwMjQ5ODEzNX0.eyJ1c2VyVWlkIjoiMHhmZmZkOGQ2YWQzYTI3NGVjIiwic2Vzc2lvblVpZCI6IjB4ZmZmZDhkNmFkNDkyMWNmMCJ9.AUCiu11AxtHQV3sougs9SERQ_Dm1hk_74YIyZMUNzMit9xm5CzFPpeFGE2vjerOZcKnp72doTVxb9mF-WGSnfSmhAeZ-v1LpOObYmbQ_SKycZ7gMq2RL34Mn6labEeNHdYdUv6Sf-obkV9BbXXQM8U6r1KlnViPvqicF0zkcdllUPk4q'
    ]

    for (const jwt of jwtOptions) {
      expect(decodeJWT(jwt, Buffer)).toEqual(payload)
      expect(decodeJWT(jwt, BufferEdge)).toEqual(payload)
    }
  })
})
