import Levers from '../constants/levers'

const CODE_VALS = [
  '1', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  '2', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  '3', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
  '4'
]

function encodeNumber(number) {
  if (number < 10 || number > 40) {
    throw new Error('Number must be between 10 and 40, was ' + number)
  }
  return CODE_VALS[number - 10]
}

function encode(levers) {
  var array = new Array(59).fill(1)
  Levers.forEach(function(lever) {
    array[lever.num - 1] = encodeNumber(levers[lever.name])
  })
  return array.join('')
}

function decodeDigit(digit) {
  var index = CODE_VALS.indexOf(digit)
  if (index === -1) {
    throw new Error('Invalid digit ' + digit)
  }
  return 10 + index
}

function decode(encoded) {
  var levers = {}
  Levers.forEach(function(lever) {
    var digit = encoded[lever.num - 1]
    if (!digit) {
      throw new Error('Digit at pos ' + lever.pos + ' not found')
    }
    levers[lever.name] = decodeDigit(digit)
  })
  return levers
}

export default {
  encode: encode,
  decode: decode
}
