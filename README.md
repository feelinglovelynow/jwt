# 🕉 @feelinglovelynow/jwt


## 💎 Install
```bash
pnpm add @feelinglovelynow/jwt
pnpm add buffer # only necessary if edge (browser) (cloudflare workers)
```


## 🙏 Description
Node and/or Edge helper functions to create JWK's AND create and verify JWT's with the subtle crypto api (ECDSA)


## 💚 Example: Create public and private jwk
The public & private jwk will log in the terminal, then we put them in our `.env` file
```ts
import { createJWKs } from '@feelinglovelynow/jwt'

createJWKs()
```


## 💛 Example: Create jwt
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { createJWT } from '@feelinglovelynow/jwt'
import { JWK_PRIVATE } from '$env/static/private'

const jwtPayload = { userId: 1 }
const expiresInAsSeconds = 32400 // 9 hours
const jwt = await createJWT(jwtPayload, expiresInAsSeconds, JWK_PRIVATE, Buffer)
```


## 🧡 Example: Decode jwt
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { decodeJWT } from '@feelinglovelynow/jwt'

const decoded = decodeJWT(jwt, Buffer)
```


## ❤️ Example: Verify jwt
```ts
import { Buffer } from 'buffer/' // edge
import { Buffer } from 'node:buffer' // node
import { verifyJWT } from '@feelinglovelynow/jwt'
import { JWK_PUBLIC } from '$env/static/private'

const payload = await verifyJWT(jwt, JWK_PUBLIC, Buffer)
```


## 🌟 Errors
```ts
throw { id: 'fln__decode__invalid-part-length', message: 'Please provide a token with 3 parts' }
throw { id: 'fln__verify__invalid-part-length', message: 'Please provide a token with 3 parts' }
throw { id: 'fln__verify__expired', message: 'Token has expired' }
throw { id: 'fln__verify__invalid', message: 'Token is invalid' }
```


## 🎁 All our NPM Packages
* [@feelinglovelynow/env-write](https://github.com/feelinglovelynow/env-write)
* [@feelinglovelynow/get-form-entries](https://github.com/feelinglovelynow/get-form-entries)
* [@feelinglovelynow/get-relative-time](https://github.com/feelinglovelynow/get-relative-time)
* [@feelinglovelynow/global-style](https://github.com/feelinglovelynow/global-style)
* [@feelinglovelynow/jwt](https://github.com/feelinglovelynow/jwt)
* [@feelinglovelynow/loop-backwards](https://github.com/feelinglovelynow/loop-backwards)
* [@feelinglovelynow/slug](https://github.com/feelinglovelynow/slug)
* [@feelinglovelynow/svelte-loading-anchor](https://github.com/feelinglovelynow/svelte-loading-anchor)
* [@feelinglovelynow/svelte-modal](https://github.com/feelinglovelynow/svelte-modal)
* [@feelinglovelynow/svelte-turnstile](https://github.com/feelinglovelynow/svelte-turnstile)
* [@feelinglovelynow/toast](https://github.com/feelinglovelynow/toast)
