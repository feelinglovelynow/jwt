import { getAlgorithmOptions } from './getAlgorithmOptions.js'

/**
 * This function will log the public & private JWK's in the terminal.
 * Calling this function is only necessary when we first create the JWK's.
 * Once we store the pulic and private JWK's and have no need for more JWK's this code may be removed.
 * So place this code locally somewhere server side, call it for the number of JWK's you'd love and then remove it when they're in your `.env` file
 * @returns { Promise<void> }
*/
export async function createJWKs () {
  /** @type { CryptoKeyPair } */ // @ts-ignore
  const { privateKey, publicKey } = await crypto.subtle.generateKey(getAlgorithmOptions('generate'), true, ['sign', 'verify'])

  console.log('privateJWK', JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey)))
  console.log('publicJWK', JSON.stringify(await crypto.subtle.exportKey('jwk', publicKey)))
}
