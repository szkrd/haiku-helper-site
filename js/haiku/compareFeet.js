var haiku = window.haiku || {};
haiku.compareFeet = (function () {
    "use strict";

    var self = haiku,
        forms,
        compareLine;

    forms = {
        hexameter: "-(UU|-) -(UU|-) -(UU|-) -(UU|-) -UU -(U|-)",
        pentameter: "-UU -UU -  -UU -UU -",
        disztichon: ["hexameter", "pentameter"]
    };

    compareLine = function (source, rs) { //{{{
        rs = "^" + rs.replace(/\s/g, "") + "$";
        rs = new RegExp(rs);
        return rs.test(source);
    }; //}}}


    return function (source, rs) { //{{{
        if (forms[rs]) {
            rs = forms[rs];
        }
        source = source.split(/\n/);
        var i, l, m = 0, rsCurrent;
        for (i = 0, l = source.length; i < l; i += 1) {
            if ($.isArray(rs)) {
                if (m > rs.length - 1) {
                    m = 0;
                }
                rsCurrent = rs[m];
                m++;
            } else {
                rsCurrent = rs;
            }
            if (forms[rsCurrent]) {
                rsCurrent = forms[rsCurrent];
            }
            if (!compareLine(self.splitToSyllLengths(source[i]), rsCurrent)) {
                return false;
            }
        }
        return true;
    } //}}}

}());