/*globals console, $, describe, it, expect*/
/*jslint browser:true nomen:true*/
$(function () {
    "use strict";
    var H = window.haiku;

    // http://hu.wikipedia.org/wiki/Id%C5%91m%C3%A9rt%C3%A9kes_versel%C3%A9s
    describe("splitToSyllables", function () {
        var f = H.splitToSyllables;
        it("should split a word to syllables", function() {
            expect(f("csoki").length).toBe(2);
            expect(f("szerepe").length).toBe(3);
            expect(f("vadász").length).toBe(2);
            expect(f("Béni").length).toBe(2);

            expect(f("csodaszép").length).toBe(3);
            expect(f("éjszaka").length).toBe(3);
            expect(f("forró").length).toBe(2);
            expect(f("csiribiri").length).toBe(4);
            expect(f("ki látta?").length).toBe(3);

            expect(f("valóság").length).toBe(3);
            expect(f("őrjöngve").length).toBe(3);
            expect(f("óh, az éj!").length).toBe(3);
            expect(f("csodaparipa").length).toBe(5);
            expect(f("hársfatea").length).toBe(4);
            expect(f("borogatás").length).toBe(4);

            expect(f("szerelemnek").length).toBe(4);
            expect(f("álombeli").length).toBe(4);
            expect(f("barangolni").length).toBe(4);
            expect(f("alszik a vár").length).toBe(4);
            expect(f("száncsengő").length).toBe(3);
        });
    });

    describe("splitToSyllLengths", function () {
        var f = H.splitToSyllLengths;
        it("should split a word to syllables length markers", function() {
            expect(f("csoki", true)).toBe("UU");
            expect(f("szerepe", true)).toBe("UUU");
            expect(f("vadász", true)).toBe("U-");
            expect(f("Béni", true)).toBe("-U");

            expect(f("csodaszép", true)).toBe("UU-");
            expect(f("éjszaka", true)).toBe("-UU");
            expect(f("forró", true)).toBe("--");
            expect(f("csiribiri", true)).toBe("UUUU");
            expect(f("ki látta?", true)).toBe("U-U");

            expect(f("valóság", true)).toBe("U--");
            expect(f("őrjöngve", true)).toBe("--U");
            expect(f("óh, az éj!", true)).toBe("-U-");
            expect(f("csodaparipa", true)).toBe("UUUUU");
            expect(f("hársfatea", true)).toBe("-UUU");
            expect(f("borogatás", true)).toBe("UUU-");

            expect(f("szerelemnek", true)).toBe("UU-U"); // UU--???
            expect(f("álombeli", true)).toBe("--UU");
            expect(f("barangolni", true)).toBe("U--U");
            expect(f("alszik a vár", true)).toBe("-UU-");
            expect(f("száncsengő", true)).toBe("---");
        });
    });

    jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
    jasmine.getEnv().execute();

}());