import { Buffer } from 'node:buffer'
import { Buffer as BufferEdge } from 'buffer/'
import { toBase64Url } from './toBase64Url.js'
import { getAlgorithmOptions  } from './getAlgorithmOptions.js'


function _toBase64Url(content, Buffer) {
  return Buffer.from(content).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '')
}


describe('toBase64Url()', () => {
  test('encodes', async () => {
    const options = [
      JSON.stringify({ hello: 'world' })
    ]

    const privateJWK = JSON.stringify({ "key_ops": ["sign"], "ext": true, "kty": "EC", "x": "ASD9FAf6K79rBE4WtN1QPwxIQ0BJToa64nolcyuq7EnbQdivt7HjHYIktMeWjCNy4v2AdzxKMM7sDLIzDN8ljilc", "y": "AKf50KZlHgptseBbzaP5rZnLmSkSS-DQSE1UUgN_YGo9eUP1sWNjBMAyXCpsk3rvEgZtYq3_7gH-TmH7LLcZTf0V", "crv": "P-521", "d": "ATQGp5GjYX3x5_xKRg91F6NKz1DuW1q9w1L4JYbcqT62za_v910LsyrUKd_cZX8Mwldj3IcmNzS8Horzu7ijXYzx" })
    const privateKey = await crypto.subtle.importKey('jwk', JSON.parse(privateJWK), getAlgorithmOptions('import'), true, ['sign'])

    options.push(await crypto.subtle.sign(getAlgorithmOptions('sign'), privateKey, new TextEncoder().encode(options[0])))

    for (const content of options) {
      expect(toBase64Url(content, Buffer)).toEqual(_toBase64Url(content, Buffer))
      expect(toBase64Url(content, BufferEdge)).toEqual(_toBase64Url(content, Buffer))
      expect(toBase64Url(content, Buffer)).toEqual(_toBase64Url(content, BufferEdge))
    }
  })
})
