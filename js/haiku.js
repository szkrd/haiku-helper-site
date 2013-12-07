var haiku = window.haiku || {};
$.extend(haiku, (function () {
    "use strict";

    var vowels, longVowels, lowVowels, highVowels, letters, shortConsonants, doubleConsonants,
        collapseDoubleConsonants, splitToSyllables, splitToSyllLengths, vowelIsLowOrHigh,
        syllableLength, letterIsVowel, vowelsInWord, clearNonLetters;

    shortConsonants = "qwrtzpsdghjklxcvbnmf";
    doubleConsonants = "gy,sz,ty,ly,ny,cs,dz,dzs,zs";
    //longDoubleConsonants = "ssz,tty,lly,nny";
    vowels = "eéöőüűiíaáoóuú";
    longVowels = "éáűőóú";
    lowVowels = "aáoóuú";
    highVowels = "eéiíöőüű";

    splitToSyllables = function (s) { // {{{
        var parts = [], part = "", i, l, chr, add;
        add = function (chunk) {
            if ((chunk.length) && (vowelsInWord(chunk) > 0)) {
                parts.push(chunk);
            }
        };
        s = s.split("");
        for (i = 0, l = s.length; i < l; i += 1) {
            chr = s[i];
            if (letterIsVowel(chr)) {
                add(part);
                part = chr;
            } else {
                part += chr;
            }
        }
        add(part);
        return parts;
    }; // }}}

    splitToSyllLengths = function (s, _asMarks) { // {{{
        var raw = "", i, l;
        s = splitToSyllables(s);
        for (i = 0, l = s.length; i < l; i += 1) {
            raw += syllableLength(s[i]) ? "-" : "U";
            //raw += syllableLength(s[i]); 0 vs 1
        }
        return raw;
    }; // }}}

    // 0 short, 1 long
    // A helyzeténél fogva hosszú szótagnak ugyan rövid a magánhangzója,
    // de utána vagy hosszú, vagy legalább két rövid mássalhangzó szerepel.
    syllableLength = function (s) {
        var i, l, vowelPos = -1, orig = s;
        s = clearNonLetters(s).split("");
        // A természeténél fogva hosszú szótagnak a magánhangzója hosszú.
        for (i = 0, l = s.length; i < l; i += 1) {
            if (longVowels.indexOf(s[i]) > -1) {
                return 1;
            }
        }
        // elso mgh, a tobbi msh
        s = clearNonLetters(collapseDoubleConsonants(orig));
        if (s.length > 2) {
            return 1;
        }
        return 0;
    };

    // sz -> x, gy -> x, ggy -> xgy
    collapseDoubleConsonants = function (s) {
        var ds = doubleConsonants.split(","), to = "x", i, l;
        for (i = 0, l = ds.length; i < l; i += 1) {
            s = s.replace(new RegExp(ds[i], "ig"), to);
        }
        return s;
    };

    clearNonLetters = function (s) {
        var ns = "", i, l;
        s = s.toLowerCase().split("");
        for (i = 0, l = s.length; i < l; i += 1) {
            if (!(shortConsonants.indexOf(s[i]) === -1 && vowels.indexOf(s[i]) === -1)) {
                ns += s[i];
            }
        }
        return ns;
    };

    letterIsVowel = function (chr) { // {{{
        return vowels.indexOf(chr.toLowerCase()) > -1;
    }; // }}}


    // works with syllables as well
    vowelIsLowOrHigh = function (chr) { //{{{
        var i, l, s, sFiltered;
        if (chr.length > 1) {
            s = chr.split("");
            for (i = 0, l = s.length; i < l; i += 1) {
                if (letterIsVowel(s[i])) {
                    sFiltered = s[i];
                }
            }
            if (sFiltered) {
                chr = sFiltered;
            }
        }
        if (lowVowels.indexOf(chr.toLowerCase()) > -1)
            return "low";
        if (highVowels.indexOf(chr.toLowerCase()) > -1)
            return "high";
        // may return undefined
    }; //}}}


    vowelsInWord = function (s) { // {{{
        var i, l, c = 0;
        s = s.split("");
        for (i = 0, l = s.length; i < l; i += 1) {
            c += letterIsVowel(s[i]);
        }
        return c;
    }; // }}}

// EXPORTS

    return {
        splitToSyllables: splitToSyllables,
        splitToSyllLengths: splitToSyllLengths,
        vowelIsLowOrHigh: vowelIsLowOrHigh,
        vowelsInWord: vowelsInWord
    };
}()));