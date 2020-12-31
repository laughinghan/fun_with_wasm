import siphash from 'siphash24'

var value, key, h

setTimeout(function() {
  value = Uint8Array.from('48760000')
  key = Uint8Array.from('1234567890123456')
  h = siphash(value, key)
  pre.textContent = 'Hash: ' + hexString(h) + '\n'
})

setTimeout(function() {
  for (var i = 0;; i += 1) {
    if (i > 65536) throw 'should be practically impossible'
    value[5] = i % 256
    value[6] = i >> 8
    h = siphash(value, key)
    if (h[0] === 0) break
  }
  pre.textContent += 'Proof of Work: ' + i + ' (' + i.toString(16) + '), hash: ' + hexString(h) + '\n'
})

function hexString(uint8a) {
  return Array.from(uint8a).map(b => ('0' + b.toString(16)).slice(-2)).join('')
}

setTimeout(function() {
  var suite = new Benchmark.Suite;
  suite.add('one siphash call', function() {
    h = siphash(Uint8Array.from('48760000'), Uint8Array.from('1234567890123456'))
  })
  .add('siphash PoW, 8 bits', function() {
    for (var i = 0;; i += 1) {
      if (i > 65536) throw 'should be practically impossible'
      value[5] = i % 256
      value[6] = i >> 8
      h = siphash(value, key)
      if (h[0] === 0) break
    }
  })
  .on('cycle', function(e) {
    pre.textContent += e.target + '\n'
  })

  pre.textContent += '\nBenchmarking:\n'
  suite.run({ async: true })
})
