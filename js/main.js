'use strict'

const $ = require('jqlite')
const haiku = require('./haiku')
const LSKEY = 'szkrd/haiku-helper-site'

// Az időmértékes verselés alapegysége a versláb, melynek mértékegysége a mora.
// Egy rövid szótag 1 mora, egy hosszú szótag 2 mora

// A szótag az időmértékes versritmusban a következő magánhangzóig terjed,
// függetlenül attól, hogy a következő magánhangzó ugyanabban a szóban vagy a rá
// következőben található.

// A szótag rövid, ha a magánhangzója rövid, és utána legfeljebb egy rövid mássalhangzó van.
// Ebből következően kétfajta hosszú szótag létezik.
// A természeténél fogva hosszú szótagnak a magánhangzója hosszú.
// A helyzeténél fogva hosszú szótagnak ugyan rövid a magánhangzója, de utána vagy hosszú,
// vagy legalább két rövid mássalhangzó szerepel

// for contentEditable we may something more sophisticated
function getTextAsLines () {
  let text = $('#Text').val() || ''
  text = text.replace(/\r\n/g, '\n') // yes, ie
  return text.split(/\n/)
}

function vowelsPerLinesStat () {
  let lines = getTextAsLines()
  let vCountStr = ''
  for (let i = 0, l = lines.length; i < l; i += 1) {
    const line = lines[i].trim()
    const count = haiku.vowelsInWord(line)
    vCountStr += (line ? count : '&nbsp;') + '<br />\n'
  }
  $('#VowelCountStat').html(vCountStr)
}

function syllLengthStat () {
  const lines = getTextAsLines()
  let vCountStr = ''
  let sylls = []
  for (let i = 0, l = lines.length; i < l; i += 1) {
    const line = lines[i].trim()
    sylls = sylls.concat(haiku.splitToSyllables(line))
    const lngth = haiku.splitToSyllLengths(line).replace(/(.)/g, '<span class="hoverable">$1</span>')
    vCountStr += (line ? lngth : '&nbsp;') + '<br />\n'
  }
  $('#SyllLengthStat').html(vCountStr)
  $('#SyllLengthStat span.hoverable').each(function (i, el) {
    el = $(el)
    var tooltip
    if (sylls[i]) {
      tooltip = $('<span class="tooltip"></span>')
      tooltip.text(sylls[i]).appendTo(el)
      el.addClass(haiku.vowelIsLowOrHigh(sylls[i]))
    }
  })
};

const store = {
  save () {
    localStorage.setItem(LSKEY, $('#Text').val())
  },
  restore () {
    $('#Text').val(localStorage.getItem(LSKEY) || '')
  }
}

function onTextChange () {
  vowelsPerLinesStat()
  syllLengthStat()
  store.save()
};

function init () {
  store.restore()
  $('#Text').on('keyup', onTextChange)
  onTextChange()
};

module.exports = {
  init
}
