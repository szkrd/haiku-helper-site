'use strict'
const compareFeet = require('./compareFeet')
const expect = require('chai').expect

describe('compareFeet', function () {
  var comp = compareFeet
  it('should split a line to syllables and then compare their feet with predefined schemes', function () {
    expect(
      comp('Roskad a kásás hó, cseperészget a bádogeresz már', 'hexameter')
    ).to.be.true

    expect(
      comp('Gyűlölöm azt, aki telt kupa mellett bort iszogatván', 'hexameter') &&
      comp('háborut emleget és lélekölő viadalt.', 'pentameter')
    ).to.be.true

    expect(
      comp('Gyűlölöm azt, aki telt kupa mellett bort iszogatván\n' +
        'háborut emleget és lélekölő viadalt.', 'disztichon')
    ).to.be.true

    expect(
      comp('Bús düledékeiden, Husztnak romvára megállék!', 'hexameter') &&
      comp('Csend vala felleg alól szállt fel az éjjeli hold.', 'pentameter')
    ).to.be.true

    expect(
      comp('Bús düledékeiden, Husztnak romvára megállék!\n' +
        'Csend vala felleg alól szállt fel az éjjeli hold.', 'disztichon')
    ).to.be.true

    expect(
      comp('S kedvelem azt, aki bölcs, és Aphrodité meg a Múzsák\n' +
        'szép adományairól zengve szeretni tanít.', 'disztichon')
    ).to.be.true

    expect(
      comp('Próféták által szólt rígen néked az isten,\n' +
        'Azkit igírt, ímé, vígre megadta fiát.', 'disztichon')
    ).to.be.true
  })
})
