/**
 * Convert an item to base64 that also converts url entities
 * @param { any } content 
 * @param { any } Buffer 
 * @returns string
*/
export function toBase64Url (content, Buffer) {
  return Buffer.from(content).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '')
}
