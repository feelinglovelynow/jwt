#!/bin/bash
pnpm test &&
npx istanbul-badges-readme --statementsLabel='Coverage' &&
rm -rf ./dist ./tsc &&
pnpm tsc &&
node ./esbuild.js &&
cp ./src/index.ts ./dist/index.ts
