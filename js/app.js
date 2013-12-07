/*globals app, console, $*/
/*jslint browser:true nomen:true*/
window.app = (function (H) {
    "use strict";
    var getTextAsLines, onTextChange, letterIsVowel, vowelsInWord, vowelsPerLinesStat,
        syllLengthStat, saveToStorage, restoreFromStorage, store, hasNoVowels,
        vowels, lsKey, init;

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

    lsKey = "rmzPoemHelper";

    // for contentEditable we may something more sophisticated
    getTextAsLines = function () {
        var text = $("#Text").val();
        text = text.replace(/\r\n/g, "\n"); // yes, ie
        return text.split(/\n/);
    };

    vowelsPerLinesStat = function () {
        var lines = getTextAsLines(), i, l, line, vCountStr = "", count;
        for (i = 0, l = lines.length; i < l; i += 1) {
            line = $.trim(lines[i]);
            count = H.vowelsInWord(line);
            vCountStr += (line ? count : "&nbsp;") + "<br />\n";
        }
        $("#VowelCountStat").html(vCountStr);
    };

    syllLengthStat = function () {
        var lines = getTextAsLines(), i, l, line, vCountStr = "", count;
        for (i = 0, l = lines.length; i < l; i += 1) {
            line = $.trim(lines[i]);
            count = H.splitToSyllLengths(line, true);
            vCountStr += (line ? count : "&nbsp;") + "<br />\n";
        }
        $("#SyllLengthStat").html(vCountStr);
    };

    store = {
        save: function () {
            localStorage.setItem(lsKey, $("#Text").val());
        },
        restore: function () {
            $("#Text").val(localStorage.getItem(lsKey) || "");
        }
    };

    onTextChange = function () {
        vowelsPerLinesStat();
        syllLengthStat();
        store.save();
    };

    init = function () {
        store.restore();
        $("#Text").on("keyup", onTextChange);
        onTextChange();
    };

    return {
        init: init
    };
}(window.haiku));

$(app.init);