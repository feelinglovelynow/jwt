/**
 * Get algorithm options 
 * @param { 'sign' | 'verify' | 'generate' | 'import' } isFor 
 * @returns { { name: string, namedCurve: string } | { name: string, hash: { name: string } } }
*/
export function getAlgorithmOptions (isFor) {
  return (isFor === 'generate' || isFor === 'import') ?
    { name: 'ECDSA', namedCurve: 'P-521' } :
    { name: 'ECDSA', hash: { name: 'SHA-512' } }
}
