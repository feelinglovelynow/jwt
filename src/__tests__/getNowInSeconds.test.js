import { getNowInSeconds } from '../getNowInSeconds.js'
import { describe, test, expect } from '@jest/globals'


describe('getNowInSeconds()', () => {
  test('returns correctly', () => {
    expect(getNowInSeconds()).toEqual(Math.floor(Date.now() / 1000))
  })
})
