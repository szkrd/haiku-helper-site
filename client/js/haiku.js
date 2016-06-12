'use strict'

const shortConsonants = 'qwrtzpsdghjklxcvbnmf'
const doubleConsonants = 'gy,sz,ty,ly,ny,cs,dz,dzs,zs'
// const longDoubleConsonants = 'ssz,tty,lly,nny'
const vowels = 'eéöőüűiíaáoóuú'
const longVowels = 'íéáűőóú'
const lowVowels = 'aáoóuú'
const highVowels = 'eéiíöőüű'

function splitToSyllables (s) {
  const parts = []
  let part = ''
  function add (chunk) {
    if ((chunk.length) && (vowelsInWord(chunk) > 0)) {
      parts.push(chunk)
    }
  }
  s = s.split('')
  for (let i = 0, l = s.length; i < l; i += 1) {
    let chr = s[i]
    if (letterIsVowel(chr)) {
      add(part)
      part = chr
    } else {
      part += chr
    }
  }
  add(part)
  return parts
}

function splitToSyllLengths (s, _asMarks) {
  let raw = ''
  s = splitToSyllables(s)
  for (let i = 0, l = s.length; i < l; i += 1) {
    raw += syllableLength(s[i]) ? '-' : 'U'
    // raw += syllableLength(s[i]); 0 vs 1
  }
  return raw
}

// 0 short, 1 long
// A helyzeténél fogva hosszú szótagnak ugyan rövid a magánhangzója,
// de utána vagy hosszú, vagy legalább két rövid mássalhangzó szerepel.
function syllableLength (s) {
  const orig = s
  s = clearNonLetters(s).split('')
  // A természeténél fogva hosszú szótagnak a magánhangzója hosszú.
  for (let i = 0, l = s.length; i < l; i += 1) {
    if (longVowels.indexOf(s[i]) > -1) {
      return 1
    }
  }
  // elso mgh, a tobbi msh
  s = clearNonLetters(collapseDoubleConsonants(orig))
  if (s.length > 2) {
    return 1
  }
  return 0
}

// sz -> x, gy -> x, ggy -> xgy
function collapseDoubleConsonants (s) {
  const ds = doubleConsonants.split(',')
  const to = 'x'
  for (let i = 0, l = ds.length; i < l; i += 1) {
    s = s.replace(new RegExp(ds[i], 'ig'), to)
  }
  return s
}

function clearNonLetters (s) {
  let ns = ''
  s = s.toLowerCase().split('')
  for (let i = 0, l = s.length; i < l; i += 1) {
    if (!(shortConsonants.indexOf(s[i]) === -1 && vowels.indexOf(s[i]) === -1)) {
      ns += s[i]
    }
  }
  return ns
}

function letterIsVowel (chr) {
  return vowels.indexOf(chr.toLowerCase()) > -1
}

// works with syllables as well
function vowelIsLowOrHigh (chr) {
  var i, l, s, sFiltered
  if (chr.length > 1) {
    s = chr.split('')
    for (i = 0, l = s.length; i < l; i += 1) {
      if (letterIsVowel(s[i])) {
        sFiltered = s[i]
      }
    }
    if (sFiltered) {
      chr = sFiltered
    }
  }
  if (lowVowels.indexOf(chr.toLowerCase()) > -1) {
    return 'low'
  }
  if (highVowels.indexOf(chr.toLowerCase()) > -1) {
    return 'high'
  }
  // may return undefined
}

function vowelsInWord (s) {
  let c = 0
  s = s.split('')
  for (let i = 0, l = s.length; i < l; i += 1) {
    c += letterIsVowel(s[i])
  }
  return c
}

module.exports = {
  splitToSyllables,
  splitToSyllLengths,
  vowelIsLowOrHigh,
  vowelsInWord
}
