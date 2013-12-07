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
            expect(f("csoki")).toBe("UU");
            expect(f("szerepe")).toBe("UUU");
            expect(f("vadász")).toBe("U-");
            expect(f("Béni")).toBe("-U");

            expect(f("csodaszép")).toBe("UU-");
            expect(f("éjszaka")).toBe("-UU");
            expect(f("forró")).toBe("--");
            expect(f("csiribiri")).toBe("UUUU");
            expect(f("ki látta?")).toBe("U-U");

            expect(f("valóság")).toBe("U--");
            expect(f("őrjöngve")).toBe("--U");
            expect(f("óh, az éj!")).toBe("-U-");
            expect(f("csodaparipa")).toBe("UUUUU");
            expect(f("hársfatea")).toBe("-UUU");
            expect(f("borogatás")).toBe("UUU-");

            expect(f("szerelemnek")).toBe("UU-U"); // UU--???
            expect(f("álombeli")).toBe("--UU");
            expect(f("barangolni")).toBe("U--U");
            expect(f("alszik a vár")).toBe("-UU-");
            expect(f("száncsengő")).toBe("---");

            expect(f("Gyűlölöm azt, aki telt kupa mellett bort iszogatván")).toBe("-UU-UU-UU---UU--");
            expect(f("háborut emleget és lélekölő viadalt.")).toBe("-UU-UU--UU-UU-");
        });
        describe("compareFeet", function () {
            var comp = H.compareFeet;
            it("should split a line to syllables and then compare their feet with predefined schemes", function() {

                expect(
                    comp("Roskad a kásás hó, cseperészget a bádogeresz már", "hexameter")
                ).toBe(true);

                expect(
                    comp("Gyűlölöm azt, aki telt kupa mellett bort iszogatván", "hexameter") &&
                    comp("háborut emleget és lélekölő viadalt.", "pentameter")
                ).toBe(true);
                expect(comp("Gyűlölöm azt, aki telt kupa mellett bort iszogatván\nháborut emleget és lélekölő viadalt.", "disztichon")).toBe(true);

                expect(
                    comp("Bús düledékeiden, Husztnak romvára megállék!", "hexameter") &&
                    comp("Csend vala felleg alól szállt fel az éjjeli hold.", "pentameter")
                ).toBe(true);
                expect(comp("Bús düledékeiden, Husztnak romvára megállék!\nCsend vala felleg alól szállt fel az éjjeli hold.", "disztichon")).toBe(true);

                /*expect(
                    comp("Add te Psychéd nekem, Amor, ah add! s vedd lantomat érte,", "hexameter") &&
                    comp("háborut emleget és lélekölő viadalt.", "pentameter")
                ).toBe(true);
                */
            });
        });

        //todo: vowelIsLowOrHigh
    });

    jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
    jasmine.getEnv().execute();

}());