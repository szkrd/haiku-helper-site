'use strict'
const haiku = require('./haiku')
const expect = require('chai').expect

describe('haiku', function () {
  // http://hu.wikipedia.org/wiki/Id%C5%91m%C3%A9rt%C3%A9kes_versel%C3%A9s
  describe('splitToSyllables', function () {
    var f = haiku.splitToSyllables
    it('should split a word to syllables', function () {
      expect(f('csoki')).to.have.length(2)
      expect(f('szerepe')).to.have.length(3)
      expect(f('vadász')).to.have.length(2)
      expect(f('Béni')).to.have.length(2)

      expect(f('csodaszép')).to.have.length(3)
      expect(f('éjszaka')).to.have.length(3)
      expect(f('forró')).to.have.length(2)
      expect(f('csiribiri')).to.have.length(4)
      expect(f('ki látta?')).to.have.length(3)

      expect(f('valóság')).to.have.length(3)
      expect(f('őrjöngve')).to.have.length(3)
      expect(f('óh, az éj!')).to.have.length(3)
      expect(f('csodaparipa')).to.have.length(5)
      expect(f('hársfatea')).to.have.length(4)
      expect(f('borogatás')).to.have.length(4)

      expect(f('szerelemnek')).to.have.length(4)
      expect(f('álombeli')).to.have.length(4)
      expect(f('barangolni')).to.have.length(4)
      expect(f('alszik a vár')).to.have.length(4)
      expect(f('száncsengő')).to.have.length(3)
    })
  })

  describe('splitToSyllLengths', function () {
    var f = haiku.splitToSyllLengths
    it('should split a word to syllables length markers', function () {
      expect(f('csoki')).to.equal('UU')
      expect(f('szerepe')).to.equal('UUU')
      expect(f('vadász')).to.equal('U-')
      expect(f('Béni')).to.equal('-U')

      expect(f('csodaszép')).to.equal('UU-')
      expect(f('éjszaka')).to.equal('-UU')
      expect(f('forró')).to.equal('--')
      expect(f('csiribiri')).to.equal('UUUU')
      expect(f('ki látta?')).to.equal('U-U')

      expect(f('valóság')).to.equal('U--')
      expect(f('őrjöngve')).to.equal('--U')
      expect(f('óh, az éj!')).to.equal('-U-')
      expect(f('csodaparipa')).to.equal('UUUUU')
      expect(f('hársfatea')).to.equal('-UUU')
      expect(f('borogatás')).to.equal('UUU-')

      expect(f('szerelemnek')).to.equal('UU-U') // UU--???
      expect(f('álombeli')).to.equal('--UU')
      expect(f('barangolni')).to.equal('U--U')
      expect(f('alszik a vár')).to.equal('-UU-')
      expect(f('száncsengő')).to.equal('---')

      expect(f('Gyűlölöm azt, aki telt kupa mellett bort iszogatván')).to.equal('-UU-UU-UU---UU--')
      expect(f('háborut emleget és lélekölő viadalt.')).to.equal('-UU-UU--UU-UU-')
    })
    // todo: vowelIsLowOrHigh
  })
})
