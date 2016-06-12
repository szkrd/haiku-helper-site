'use strict'

const haiku = require('./haiku')
const forms = {
  hexameter: '-(UU|-) -(UU|-) -(UU|-) -(UU|-) -UU -(U|-)',
  // A klasszikus pentameter első felében csak az egyik daktilus helyébe léphetett spondeus!
  pentameter: '-(UU|-) -(UU|-) -  -UU -UU -',
  disztichon: ['hexameter', 'pentameter']
}

function compareLine (source, rs) {
  rs = '^' + rs.replace(/\s/g, '') + '$'
  rs = new RegExp(rs)
  return rs.test(source)
}

module.exports = function (source, rs) {
  if (forms[rs]) {
    rs = forms[rs]
  }
  source = source.split(/\n/)
  let m = 0
  let rsCurrent
  for (let i = 0, l = source.length; i < l; i += 1) {
    if (Array.isArray(rs)) {
      if (m > rs.length - 1) {
        m = 0
      }
      rsCurrent = rs[m]
      m++
    } else {
      rsCurrent = rs
    }
    if (forms[rsCurrent]) {
      rsCurrent = forms[rsCurrent]
    }
    if (!compareLine(haiku.splitToSyllLengths(source[i]), rsCurrent)) {
      return false
    }
  }
  return true
}
