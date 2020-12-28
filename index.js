import siphash from 'siphash24'

const h = siphash(Uint8Array.from('9876'), Uint8Array.from('1234567890123456'))
pre.textContent = 'Hash: ' + hexString(h)

function hexString(uint8a) {
  return Array.from(uint8a).map(b => ('0' + b.toString(16)).slice(-2)).join('')
}
