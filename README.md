# 🕉 @feelinglovelynow/jwt


## 💎 Install
```bash
pnpm add @feelinglovelynow/jwt
pnpm add buffer # only necessary if edge (browser) (cloudflare workers)
```


## 🙏 Description
* Node and/or Edge helper functions to create JWK's, create JWT's, decode JWT's and verify JWT's with the subtle crypto api's [ECDSA: SHA-512](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#syntax) algorithm
* First we create JWK's which give us a private and public JWK (I love to put them in my `.env` file)
* Then with the private JWK we may `create` JWT's
* With the public JWK we may `verify` JWT's
* And with no JWK required we may `decode` JWT's


## 💚 Example: Create public and private JWK's
* This function will log the public & private JWK's in the terminal
* Calling this function is only necessary when we first create the JWK's. Once we store the pulic and private JWK's and have no need for more JWK's this code may be removed. So place this code locally somewhere server side, call it for the number of JWK's you'd love and then remove it when they're in your `.env` file
```ts
import { createJWKs } from '@feelinglovelynow/jwt'

createJWKs()
```


## 💛 Example: Create JWT
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { createJWT } from '@feelinglovelynow/jwt'
import { JWK_PRIVATE } from '$env/static/private'

const jwtPayload = { userId: 1 }
const expiresInAsSeconds = 32400 // 9 hours
const jwt = await createJWT(jwtPayload, expiresInAsSeconds, JWK_PRIVATE, Buffer)
```


## 🧡 Example: Decode JWT
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { decodeJWT } from '@feelinglovelynow/jwt'

const decoded = decodeJWT(jwt, Buffer)
```


## ❤️ Example: Verify JWT
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { verifyJWT } from '@feelinglovelynow/jwt'
import { JWK_PUBLIC } from '$env/static/private'

const payload = await verifyJWT(jwt, JWK_PUBLIC, Buffer)
```


## 🌟 Errors we may throw
```ts
throw { id: 'fln__decode__invalid-part-length', message: 'Please provide a token with 3 parts', _errorData: { jwt } }
throw { id: 'fln__verify__invalid-part-length', message: 'Please provide a token with 3 parts', _errorData: { jwt } }
throw { id: 'fln__verify__expired', message: 'Token has expired', _errorData: { jwt } }
throw { id: 'fln__verify__invalid', message: 'Token is invalid', _errorData: { jwt } }
```


## 🎁 All Our Packages
1. @feelinglovelynow/datetime-local: [NPM](https://www.npmjs.com/package/@feelinglovelynow/datetime-local) ⋅ [Github](https://github.com/feelinglovelynow/datetime-local)
1. @feelinglovelynow/dgraph: [NPM](https://www.npmjs.com/package/@feelinglovelynow/dgraph) ⋅ [Github](https://github.com/feelinglovelynow/dgraph)
1. @feelinglovelynow/env-write: [NPM](https://www.npmjs.com/package/@feelinglovelynow/env-write) ⋅ [Github](https://github.com/feelinglovelynow/env-write)
1. @feelinglovelynow/get-form-entries: [NPM](https://www.npmjs.com/package/@feelinglovelynow/get-form-entries) ⋅ [Github](https://github.com/feelinglovelynow/get-form-entries)
1. @feelinglovelynow/get-relative-time: [NPM](https://www.npmjs.com/package/@feelinglovelynow/get-relative-time) ⋅ [Github](https://github.com/feelinglovelynow/get-relative-time)
1. @feelinglovelynow/global-style: [NPM](https://www.npmjs.com/package/@feelinglovelynow/global-style) ⋅ [Github](https://github.com/feelinglovelynow/global-style)
1. @feelinglovelynow/jwt: [NPM](https://www.npmjs.com/package/@feelinglovelynow/jwt) ⋅ [Github](https://github.com/feelinglovelynow/jwt)
1. @feelinglovelynow/loop-backwards: [NPM](https://www.npmjs.com/package/@feelinglovelynow/loop-backwards) ⋅ [Github](https://github.com/feelinglovelynow/loop-backwards)
1. @feelinglovelynow/slug: [NPM](https://www.npmjs.com/package/@feelinglovelynow/slug) ⋅ [Github](https://github.com/feelinglovelynow/slug)
1. @feelinglovelynow/svelte-catch: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-catch) ⋅ [Github](https://github.com/feelinglovelynow/svelte-catch)
1. @feelinglovelynow/svelte-kv: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-kv) ⋅ [Github](https://github.com/feelinglovelynow/svelte-kv)
1. @feelinglovelynow/svelte-loading-anchor: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-loading-anchor) ⋅ [Github](https://github.com/feelinglovelynow/svelte-loading-anchor)
1. @feelinglovelynow/svelte-modal: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-modal) ⋅ [Github](https://github.com/feelinglovelynow/svelte-modal)
1. @feelinglovelynow/svelte-turnstile: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-turnstile) ⋅ [Github](https://github.com/feelinglovelynow/svelte-turnstile)
1. @feelinglovelynow/toast: [NPM](https://www.npmjs.com/package/@feelinglovelynow/toast) ⋅ [Github](https://github.com/feelinglovelynow/toast)
