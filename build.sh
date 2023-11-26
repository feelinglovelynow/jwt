#!/bin/bash
rm -rf ./dist ./tsc &&
pnpm tsc &&
node ./esbuild.cjs &&
cp ./src/index.ts ./dist/index.ts
