import Constants from './constants';

const CODE_VALS = [
  '1', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  '2', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  '3', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
  '4'
];

function encodeNumber(number) {
  if (number < 10 || number > 40) {
    throw new Error('Number must be between 10 and 40, was ' + number);
  }
  return CODE_VALS[number - 10];
}

function encode(levers) {
  var array = new Array(59).fill(1);
  Constants.LEVER_SECTIONS.forEach(function(section) {
    section.groups.forEach(function(group) {
      group.levers.forEach(function(lever) {
        var number = levers[section.key + '.' + group.key + '.' + lever.key];
        array[lever.pos - 1] = encodeNumber(number);
      });
    });
  });
  return array.join('');
}

function decodeDigit(digit) {
  var index = CODE_VALS.indexOf(digit);
  if (index === -1) {
    throw new Error('Invalid digit ' + digit);
  }
  return 10 + index;
}

function decode(encoded) {
  var levers = {};
  Constants.LEVER_SECTIONS.forEach(function(section) {
    section.groups.forEach(function(group) {
      group.levers.forEach(function(lever) {
        var digit = encoded[lever.pos - 1];
        if (!digit) {
          throw new Error('Digit at pos ' + lever.pos + ' not found');
        }
        levers[section.key + '.' + group.key + '.' + lever.key] =
          decodeDigit(digit);
      })
    });
  });
  return levers;
}

export default {
  encode: encode,
  decode: decode
};
