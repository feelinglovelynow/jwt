/**
 * Returns the now time in seconds since epoch
 * @returns number
*/
export function getNowInSeconds () {
  return Math.floor(Date.now() / 1000)
}
