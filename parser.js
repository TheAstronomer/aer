! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = t || self).prettierPlugins = t.prettierPlugins || {},
        t.prettierPlugins.babel = {}))
}(this, (function(t) {
    "use strict";
    var e = function(t, e) {
        const s = new SyntaxError(t + " (" + e.start.line + ":" + e.start.column + ")");
        return s.loc = e,
            s
    };

    function s(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function i(t, e) {
        return t(e = {
                exports: {}
            }, e.exports),
            e.exports
    }
    var r = Object.freeze({
        __proto__: null,
        default: {
            EOL: "\n"
        }
    });
    const a = t => {
        if ("string" != typeof t)
            throw new TypeError("Expected a string");
        const e = t.match(/(?:\r?\n)/g) || [];
        if (0 === e.length)
            return;
        const s = e.filter(t => "\r\n" === t).length;
        return s > e.length - s ? "\r\n" : "\n"
    };
    var n = a;
    n.graceful = t => "string" == typeof t && a(t) || "\n";
    var o, h = (o = r) && o.default || o,
        p = i((function(t, e) {
            function s() {
                const t = h;
                return s = function() {
                        return t
                    },
                    t
            }

            function i() {
                const t = (e = n) && e.__esModule ? e : {
                    default: e
                };
                var e;
                return i = function() {
                        return t
                    },
                    t
            }
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.extract = function(t) {
                    const e = t.match(o);
                    return e ? e[0].trimLeft() : ""
                },
                e.strip = function(t) {
                    const e = t.match(o);
                    return e && e[0] ? t.substring(e[0].length) : t
                },
                e.parse = function(t) {
                    return m(t).pragmas
                },
                e.parseWithComments = m,
                e.print = function({ comments: t = "", pragmas: e = {} }) {
                    const r = (0,
                            i().default)(t) || s().EOL,
                        a = Object.keys(e),
                        n = a.map(t => f(t, e[t])).reduce((t, e) => t.concat(e), []).map(t => " * " + t + r).join("");
                    if (!t) {
                        if (0 === a.length)
                            return "";
                        if (1 === a.length && !Array.isArray(e[a[0]])) {
                            const t = e[a[0]];
                            return "".concat("/**", " ").concat(f(a[0], t)[0]).concat(" */")
                        }
                    }
                    const o = t.split(r).map(t => "".concat(" *", " ").concat(t)).join(r) + r;
                    return "/**" + r + (t ? o : "") + (t && a.length ? " *" + r : "") + n + " */"
                };
            const r = /\*\/$/,
                a = /^\/\*\*/,
                o = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
                p = /(^|\s+)\/\/([^\r\n]*)/g,
                c = /^(\r?\n)+/,
                u = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g,
                l = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g,
                d = /(\r?\n|^) *\* ?/g;

            function m(t) {
                const e = (0,
                    i().default)(t) || s().EOL;
                t = t.replace(a, "").replace(r, "").replace(d, "$1");
                let n = "";
                for (; n !== t;)
                    n = t,
                    t = t.replace(u, "".concat(e, "$1 $2").concat(e));
                t = t.replace(c, "").trimRight();
                const o = Object.create(null),
                    h = t.replace(l, "").replace(c, "").trimRight();
                let m;
                for (; m = l.exec(t);) {
                    const t = m[2].replace(p, "");
                    "string" == typeof o[m[1]] || Array.isArray(o[m[1]]) ? o[m[1]] = [].concat(o[m[1]], t) : o[m[1]] = t
                }
                return {
                    comments: h,
                    pragmas: o
                }
            }

            function f(t, e) {
                return [].concat(e).map(e => "@".concat(t, " ").concat(e).trim())
            }
        }));
    s(p);
    p.extract,
        p.strip,
        p.parse,
        p.parseWithComments,
        p.print;
    var c = {
            hasPragma: function(t) {
                const e = Object.keys(p.parse(p.extract(t)));
                return e.includes("prettier") || e.includes("format")
            },
            insertPragma: function(t) {
                const e = p.parseWithComments(p.extract(t)),
                    s = Object.assign({
                        format: ""
                    }, e.pragmas),
                    i = p.print({
                        pragmas: s,
                        comments: e.comments.replace(/^(\s+?\r?\n)+/, "")
                    }).replace(/(\r\n|\r)/g, "\n"),
                    r = p.strip(t);
                return i + (r.startsWith("\n") ? "\n" : "\n\n") + r
            }
        },
        u = t => t[t.length - 1];

    function l(t, e) {
        return !(e = e || {}).ignoreDecorators && t.declaration && t.declaration.decorators && t.declaration.decorators.length > 0 ? l(t.declaration.decorators[0]) : !e.ignoreDecorators && t.decorators && t.decorators.length > 0 ? l(t.decorators[0]) : t.__location ? t.__location.startOffset : t.range ? t.range[0] : "number" == typeof t.start ? t.start : t.loc ? t.loc.start : null
    }

    function d(t) {
        const e = t.nodes && u(t.nodes);
        if (e && t.source && !t.source.end && (t = e),
            t.__location)
            return t.__location.endOffset;
        const s = t.range ? t.range[1] : "number" == typeof t.end ? t.end : null;
        return t.typeAnnotation ? Math.max(s, d(t.typeAnnotation)) : t.loc && !s ? t.loc.end : s
    }
    var m = {
            locStart: l,
            locEnd: d,
            composeLoc: function(t, e = t) {
                const s = "number" == typeof e ? e : -1,
                    i = l(t),
                    r = -1 !== s ? i + s : d(e),
                    a = t.loc.start;
                return {
                    start: i,
                    end: r,
                    range: [i, r],
                    loc: {
                        start: a,
                        end: -1 !== s ? {
                            line: a.line,
                            column: a.column + s
                        } : e.loc.end
                    }
                }
            }
        },
        f = t => "string" == typeof t ? t.replace((({ onlyFirst: t = !1 } = {}) => {
            const e = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
            return new RegExp(e, t ? void 0 : "g")
        })(), "") : t;
    const D = t => !Number.isNaN(t) && (t >= 4352 && (t <= 4447 || 9001 === t || 9002 === t || 11904 <= t && t <= 12871 && 12351 !== t || 12880 <= t && t <= 19903 || 19968 <= t && t <= 42182 || 43360 <= t && t <= 43388 || 44032 <= t && t <= 55203 || 63744 <= t && t <= 64255 || 65040 <= t && t <= 65049 || 65072 <= t && t <= 65131 || 65281 <= t && t <= 65376 || 65504 <= t && t <= 65510 || 110592 <= t && t <= 110593 || 127488 <= t && t <= 127569 || 131072 <= t && t <= 262141));
    var y = D,
        x = D;
    y.default = x;
    const g = t => {
        if ("string" != typeof(t = t.replace(/\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g, "  ")) || 0 === t.length)
            return 0;
        t = f(t);
        let e = 0;
        for (let s = 0; s < t.length; s++) {
            const i = t.codePointAt(s);
            i <= 31 || i >= 127 && i <= 159 || (i >= 768 && i <= 879 || (i > 65535 && s++,
                e += y(i) ? 2 : 1))
        }
        return e
    };
    var P = g,
        E = g;
    P.default = E;
    const C = /[|\\{}()[\]^$+*?.-]/g;
    var b = t => {
        if ("string" != typeof t)
            throw new TypeError("Expected a string");
        return t.replace(C, "\\$&")
    };
    const T = /[^\x20-\x7F]/;

    function A(t) {
        return (e, s, i) => {
            const r = i && i.backwards;
            if (!1 === s)
                return !1;
            const { length: a } = e;
            let n = s;
            for (; n >= 0 && n < a;) {
                const s = e.charAt(n);
                if (t instanceof RegExp) {
                    if (!t.test(s))
                        return n
                } else if (!t.includes(s))
                    return n;
                r ? n-- : n++
            }
            return (-1 === n || n === a) && n
        }
    }
    const w = A(/\s/),
        S = A(" \t"),
        N = A(",; \t"),
        F = A(/[^\r\n]/);

    function k(t, e) {
        if (!1 === e)
            return !1;
        if ("/" === t.charAt(e) && "*" === t.charAt(e + 1))
            for (let s = e + 2; s < t.length; ++s)
                if ("*" === t.charAt(s) && "/" === t.charAt(s + 1))
                    return s + 2;
        return e
    }

    function I(t, e) {
        return !1 !== e && ("/" === t.charAt(e) && "/" === t.charAt(e + 1) ? F(t, e) : e)
    }

    function v(t, e, s) {
        const i = s && s.backwards;
        if (!1 === e)
            return !1;
        const r = t.charAt(e);
        if (i) {
            if ("\r" === t.charAt(e - 1) && "\n" === r)
                return e - 2;
            if ("\n" === r || "\r" === r || "\u2028" === r || "\u2029" === r)
                return e - 1
        } else {
            if ("\r" === r && "\n" === t.charAt(e + 1))
                return e + 2;
            if ("\n" === r || "\r" === r || "\u2028" === r || "\u2029" === r)
                return e + 1
        }
        return e
    }

    function L(t, e, s) {
        const i = S(t, (s = s || {}).backwards ? e - 1 : e, s);
        return i !== v(t, i, s)
    }

    function B(t, e) {
        let s = null,
            i = e;
        for (; i !== s;)
            s = i,
            i = N(t, i),
            i = k(t, i),
            i = S(t, i);
        return i = I(t, i),
            i = v(t, i), !1 !== i && L(t, i)
    }

    function M(t, e) {
        let s = null,
            i = e;
        for (; i !== s;)
            s = i,
            i = S(t, i),
            i = k(t, i),
            i = I(t, i),
            i = v(t, i);
        return i
    }

    function O(t, e, s) {
        return M(t, s(e))
    }
    const R = {};

    function _(t) {
        return R[t]
    }
    [
        ["|>"],
        ["??"],
        ["||"],
        ["&&"],
        ["|"],
        ["^"],
        ["&"],
        ["==", "===", "!=", "!=="],
        ["<", ">", "<=", ">=", "in", "instanceof"],
        [">>", "<<", ">>>"],
        ["+", "-"],
        ["*", "/", "%"],
        ["**"]
    ].forEach((t, e) => {
        t.forEach(t => {
            R[t] = e
        })
    });
    const j = {
            "==": !0,
            "!=": !0,
            "===": !0,
            "!==": !0
        },
        U = {
            "*": !0,
            "/": !0,
            "%": !0
        },
        q = {
            ">>": !0,
            ">>>": !0,
            "<<": !0
        };

    function V(t, e, s) {
        let i = 0;
        for (let r = s = s || 0; r < t.length; ++r)
            "\t" === t[r] ? i = i + e - i % e : i++;
        return i
    }

    function z(t, e) {
        const s = t.slice(1, -1),
            i = {
                quote: '"',
                regex: /"/g
            },
            r = {
                quote: "'",
                regex: /'/g
            },
            a = "'" === e ? r : i,
            n = a === r ? i : r;
        let o = a.quote;
        if (s.includes(a.quote) || s.includes(n.quote)) {
            o = (s.match(a.regex) || []).length > (s.match(n.regex) || []).length ? n.quote : a.quote
        }
        return o
    }

    function H(t, e, s) {
        const i = '"' === e ? "'" : '"',
            r = t.replace(/\\([\s\S])|(['"])/g, (t, r, a) => r === i ? r : a === e ? "\\" + a : a || (s && /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(r) ? r : "\\" + r));
        return e + r + e
    }

    function W(t) {
        return t && (t.comments && t.comments.length > 0 && t.comments.some(t => K(t) && !t.unignore) || t.prettierIgnore)
    }

    function K(t) {
        return "prettier-ignore" === t.value.trim()
    }

    function J(t, e) {
        (t.comments || (t.comments = [])).push(e),
            e.printed = !1,
            "JSXText" === t.type && (e.printed = !0)
    }
    var X = {
        replaceEndOfLineWith: function(t, e) {
            const s = [];
            for (const i of t.split("\n"))
                0 !== s.length && s.push(e),
                s.push(i);
            return s
        },
        getStringWidth: function(t) {
            return t ? T.test(t) ? P(t) : t.length : 0
        },
        getMaxContinuousCount: function(t, e) {
            const s = t.match(new RegExp("(".concat(b(e), ")+"), "g"));
            return null === s ? 0 : s.reduce((t, s) => Math.max(t, s.length / e.length), 0)
        },
        getMinNotPresentContinuousCount: function(t, e) {
            const s = t.match(new RegExp("(".concat(b(e), ")+"), "g"));
            if (null === s)
                return 0;
            const i = new Map;
            let r = 0;
            for (const t of s) {
                const s = t.length / e.length;
                i.set(s, !0),
                    s > r && (r = s)
            }
            for (let t = 1; t < r; t++)
                if (!i.get(t))
                    return t;
            return r + 1
        },
        getPrecedence: _,
        shouldFlatten: function(t, e) {
            return _(e) === _(t) && ("**" !== t && ((!j[t] || !j[e]) && (!("%" === e && U[t] || "%" === t && U[e]) && ((e === t || !U[e] || !U[t]) && (!q[t] || !q[e])))))
        },
        isBitwiseOperator: function(t) {
            return !!q[t] || "|" === t || "^" === t || "&" === t
        },
        getPenultimate: function(t) {
            return t.length > 1 ? t[t.length - 2] : null
        },
        getLast: u,
        getNextNonSpaceNonCommentCharacterIndexWithStartIndex: M,
        getNextNonSpaceNonCommentCharacterIndex: O,
        getNextNonSpaceNonCommentCharacter: function(t, e, s) {
            return t.charAt(O(t, e, s))
        },
        skip: A,
        skipWhitespace: w,
        skipSpaces: S,
        skipToLineEnd: N,
        skipEverythingButNewLine: F,
        skipInlineComment: k,
        skipTrailingComment: I,
        skipNewline: v,
        isNextLineEmptyAfterIndex: B,
        isNextLineEmpty: function(t, e, s) {
            return B(t, s(e))
        },
        isPreviousLineEmpty: function(t, e, s) {
            let i = s(e) - 1;
            return i = S(t, i, {
                    backwards: !0
                }),
                i = v(t, i, {
                    backwards: !0
                }),
                i = S(t, i, {
                    backwards: !0
                }),
                i !== v(t, i, {
                    backwards: !0
                })
        },
        hasNewline: L,
        hasNewlineInRange: function(t, e, s) {
            for (let i = e; i < s; ++i)
                if ("\n" === t.charAt(i))
                    return !0;
            return !1
        },
        hasSpaces: function(t, e, s) {
            return S(t, (s = s || {}).backwards ? e - 1 : e, s) !== e
        },
        setLocStart: function(t, e) {
            t.range ? t.range[0] = e : t.start = e
        },
        setLocEnd: function(t, e) {
            t.range ? t.range[1] = e : t.end = e
        },
        startsWithNoLookaheadToken: function t(e, s) {
            switch ((e = function t(e) {
                if (e.left)
                    return t(e.left);
                return e
            }(e)).type) {
                case "FunctionExpression":
                case "ClassExpression":
                case "DoExpression":
                    return s;
                case "ObjectExpression":
                    return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return t(e.object, s);
                case "TaggedTemplateExpression":
                    return "FunctionExpression" !== e.tag.type && t(e.tag, s);
                case "CallExpression":
                case "OptionalCallExpression":
                    return "FunctionExpression" !== e.callee.type && t(e.callee, s);
                case "ConditionalExpression":
                    return t(e.test, s);
                case "UpdateExpression":
                    return !e.prefix && t(e.argument, s);
                case "BindExpression":
                    return e.object && t(e.object, s);
                case "SequenceExpression":
                    return t(e.expressions[0], s);
                case "TSAsExpression":
                    return t(e.expression, s);
                default:
                    return !1
            }
        },
        getAlignmentSize: V,
        getIndentSize: function(t, e) {
            const s = t.lastIndexOf("\n");
            return -1 === s ? 0 : V(t.slice(s + 1).match(/^[ \t]*/)[0], e)
        },
        getPreferredQuote: z,
        printString: function(t, e, s) {
            const i = t.slice(1, -1),
                r = !i.includes('"') && !i.includes("'"),
                a = "json" === e.parser ? '"' : e.__isInHtmlAttribute ? "'" : z(t, e.singleQuote ? "'" : '"');
            return s ? r ? a + i + a : t : H(i, a, !("css" === e.parser || "less" === e.parser || "scss" === e.parser || e.embeddedInHtml))
        },
        printNumber: function(t) {
            return t.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "")
        },
        hasIgnoreComment: function(t) {
            return W(t.getValue())
        },
        hasNodeIgnoreComment: W,
        isNodeIgnoreComment: K,
        makeString: H,
        addLeadingComment: function(t, e) {
            e.leading = !0,
                e.trailing = !1,
                J(t, e)
        },
        addDanglingComment: function(t, e) {
            e.leading = !1,
                e.trailing = !1,
                J(t, e)
        },
        addTrailingComment: function(t, e) {
            e.leading = !1,
                e.trailing = !0,
                J(t, e)
        },
        isWithinParentArrayProperty: function(t, e) {
            const s = t.getValue(),
                i = t.getParentNode();
            if (null == i)
                return !1;
            if (!Array.isArray(i[e]))
                return !1;
            const r = t.getName();
            return i[e][r] === s
        }
    };
    const { getMaxContinuousCount: G, getStringWidth: Q, getAlignmentSize: Y, getIndentSize: $, skip: Z, skipWhitespace: tt, skipSpaces: et, skipNewline: st, skipToLineEnd: it, skipEverythingButNewLine: rt, skipInlineComment: at, skipTrailingComment: nt, hasNewline: ot, hasNewlineInRange: ht, hasSpaces: pt, isNextLineEmpty: ct, isNextLineEmptyAfterIndex: ut, isPreviousLineEmpty: lt, getNextNonSpaceNonCommentCharacterIndex: dt, makeString: mt, addLeadingComment: ft, addDanglingComment: Dt, addTrailingComment: yt } = X;
    var xt = {
        getMaxContinuousCount: G,
        getStringWidth: Q,
        getAlignmentSize: Y,
        getIndentSize: $,
        skip: Z,
        skipWhitespace: tt,
        skipSpaces: et,
        skipNewline: st,
        skipToLineEnd: it,
        skipEverythingButNewLine: rt,
        skipInlineComment: at,
        skipTrailingComment: nt,
        hasNewline: ot,
        hasNewlineInRange: ht,
        hasSpaces: pt,
        isNextLineEmpty: ct,
        isNextLineEmptyAfterIndex: ut,
        isPreviousLineEmpty: lt,
        getNextNonSpaceNonCommentCharacterIndex: dt,
        makeString: mt,
        addLeadingComment: ft,
        addDanglingComment: Dt,
        addTrailingComment: yt
    };
    const { addLeadingComment: gt, addTrailingComment: Pt, addDanglingComment: Et, getNextNonSpaceNonCommentCharacterIndex: Ct } = xt;

    function bt(t, e) {
        const s = t.body.filter(t => "EmptyStatement" !== t.type);
        0 === s.length ? Et(t, e) : gt(s[0], e)
    }

    function Tt(t, e) {
        "BlockStatement" === t.type ? bt(t, e) : gt(t, e)
    }

    function At(t, e, s, i, r, a) {
        if (!s || "IfStatement" !== s.type || !i)
            return !1;
        return ")" === X.getNextNonSpaceNonCommentCharacter(t, r, a.locEnd) ? (Pt(e, r), !0) : e === s.consequent && i === s.alternate ? ("BlockStatement" === e.type ? Pt(e, r) : Et(s, r), !0) : "BlockStatement" === i.type ? (bt(i, r), !0) : "IfStatement" === i.type ? (Tt(i.consequent, r), !0) : s.consequent === i && (gt(i, r), !0)
    }

    function wt(t, e, s, i, r, a) {
        if (!s || "WhileStatement" !== s.type || !i)
            return !1;
        return ")" === X.getNextNonSpaceNonCommentCharacter(t, r, a.locEnd) ? (Pt(e, r), !0) : "BlockStatement" === i.type && (bt(i, r), !0)
    }

    function St(t, e, s, i) {
        return !(!t || "TryStatement" !== t.type && "CatchClause" !== t.type || !s) && ("CatchClause" === t.type && e ? (Pt(e, i), !0) : "BlockStatement" === s.type ? (bt(s, i), !0) : "TryStatement" === s.type ? (Tt(s.finalizer, i), !0) : "CatchClause" === s.type && (Tt(s.body, i), !0))
    }

    function Nt(t, e, s, i) {
        return !(!(t && ("ClassDeclaration" === t.type || "ClassExpression" === t.type) && t.decorators && t.decorators.length > 0) || s && "Decorator" === s.type) && (t.decorators && 0 !== t.decorators.length ? Pt(t.decorators[t.decorators.length - 1], i) : gt(t, i), !0)
    }

    function Ft(t, e, s, i, r) {
        return e && s && ("Property" === e.type || "TSDeclareMethod" === e.type || "TSAbstractMethodDefinition" === e.type) && "Identifier" === s.type && e.key === s && ":" !== X.getNextNonSpaceNonCommentCharacter(t, s, r.locEnd) ? (Pt(s, i), !0) : !(!s || !e || "Decorator" !== s.type || "ClassMethod" !== e.type && "ClassProperty" !== e.type && "TSAbstractClassProperty" !== e.type && "TSAbstractMethodDefinition" !== e.type && "TSDeclareMethod" !== e.type && "MethodDefinition" !== e.type) && (Pt(s, i), !0)
    }

    function kt(t, e, s, i, r, a) {
        if (e && "FunctionTypeParam" === e.type && s && "FunctionTypeAnnotation" === s.type && i && "FunctionTypeParam" !== i.type)
            return Pt(e, r), !0;
        if (e && ("Identifier" === e.type || "AssignmentPattern" === e.type) && s && Mt(s) && ")" === X.getNextNonSpaceNonCommentCharacter(t, r, a.locEnd))
            return Pt(e, r), !0;
        if (s && "FunctionDeclaration" === s.type && i && "BlockStatement" === i.type) {
            const e = (() => {
                if (0 !== (s.params || s.parameters).length)
                    return X.getNextNonSpaceNonCommentCharacterIndexWithStartIndex(t, a.locEnd(X.getLast(s.params || s.parameters)));
                const e = X.getNextNonSpaceNonCommentCharacterIndexWithStartIndex(t, a.locEnd(s.id));
                return X.getNextNonSpaceNonCommentCharacterIndexWithStartIndex(t, e + 1)
            })();
            if (a.locStart(r) > e)
                return bt(i, r), !0
        }
        return !1
    }

    function It(t, e) {
        return !(!t || "ImportSpecifier" !== t.type) && (gt(t, e), !0)
    }

    function vt(t, e) {
        return !(!t || "LabeledStatement" !== t.type) && (gt(t, e), !0)
    }

    function Lt(t, e, s, i) {
        return e && e.body && 0 === e.body.length ? (i ? Et(e, s) : gt(e, s), !0) : !(!t || "Program" !== t.type || 0 !== t.body.length || !t.directives || 0 !== t.directives.length) && (i ? Et(t, s) : gt(t, s), !0)
    }

    function Bt(t) {
        return "Block" === t.type || "CommentBlock" === t.type
    }

    function Mt(t) {
        return "ArrowFunctionExpression" === t.type || "FunctionExpression" === t.type || "FunctionDeclaration" === t.type || "ObjectMethod" === t.type || "ClassMethod" === t.type || "TSDeclareFunction" === t.type || "TSCallSignatureDeclaration" === t.type || "TSConstructSignatureDeclaration" === t.type || "TSConstructSignatureDeclaration" === t.type || "TSMethodSignature" === t.type || "TSConstructorType" === t.type || "TSFunctionType" === t.type || "TSDeclareMethod" === t.type
    }

    function Ot(t) {
        return Bt(t) && "*" === t.value[0] && /@type\b/.test(t.value)
    }
    var Rt = {
        handleOwnLineComment: function(t, e, s, i, r) {
            const { precedingNode: a, enclosingNode: n, followingNode: o } = t;
            return kt(e, a, n, o, t, s) || function(t, e, s) {
                if (t && ("MemberExpression" === t.type || "OptionalMemberExpression" === t.type) && e && "Identifier" === e.type)
                    return gt(t, s), !0;
                return !1
            }(n, o, t) || At(e, a, n, o, t, s) || wt(e, a, n, o, t, s) || St(n, a, o, t) || Nt(n, a, o, t) || It(n, t) || function(t, e, s) {
                if (t && ("ForInStatement" === t.type || "ForOfStatement" === t.type))
                    return gt(t, s), !0;
                return !1
            }(n, 0, t) || function(t, e, s, i) {
                if (e && ("UnionTypeAnnotation" === e.type || "TSUnionType" === e.type))
                    return X.isNodeIgnoreComment(i) && (s.prettierIgnore = !0,
                        i.unignore = !0), !!t && (Pt(t, i), !0);
                s && ("UnionTypeAnnotation" === s.type || "TSUnionType" === s.type) && X.isNodeIgnoreComment(i) && (s.types[0].prettierIgnore = !0,
                    i.unignore = !0);
                return !1
            }(a, n, o, t) || Lt(n, i, t, r) || function(t, e, s, i, r) {
                if (s && "ImportSpecifier" === s.type && e && "ImportDeclaration" === e.type && X.hasNewline(t, r.locEnd(i)))
                    return Pt(s, i), !0;
                return !1
            }(e, n, a, t, s) || function(t, e) {
                if (t && "AssignmentPattern" === t.type)
                    return gt(t, e), !0;
                return !1
            }(n, t) || Ft(e, n, a, t, s) || vt(n, t)
        },
        handleEndOfLineComment: function(t, e, s, i, r) {
            const { precedingNode: a, enclosingNode: n, followingNode: o } = t;
            return function(t, e) {
                if (t && Ot(e))
                    return gt(t, e), !0;
                return !1
            }(o, t) || kt(e, a, n, o, t, s) || function(t, e, s, i, r, a) {
                const n = e && !X.hasNewlineInRange(r, a.locEnd(e), a.locStart(i));
                if ((!e || !n) && t && "ConditionalExpression" === t.type && s)
                    return gt(s, i), !0;
                return !1
            }(n, a, o, t, e, s) || It(n, t) || At(e, a, n, o, t, s) || wt(e, a, n, o, t, s) || St(n, a, o, t) || Nt(n, a, o, t) || vt(n, t) || function(t, e, s) {
                if (e && ("CallExpression" === e.type || "OptionalCallExpression" === e.type) && t && e.callee === t && e.arguments.length > 0)
                    return gt(e.arguments[0], s), !0;
                return !1
            }(a, n, t) || function(t, e) {
                if (t && ("Property" === t.type || "ObjectProperty" === t.type))
                    return gt(t, e), !0;
                return !1
            }(n, t) || Lt(n, i, t, r) || function(t, e, s) {
                if (t && "TypeAlias" === t.type)
                    return gt(t, s), !0;
                return !1
            }(n, 0, t) || function(t, e, s) {
                if (t && ("VariableDeclarator" === t.type || "AssignmentExpression" === t.type) && e && ("ObjectExpression" === e.type || "ArrayExpression" === e.type || "TemplateLiteral" === e.type || "TaggedTemplateExpression" === e.type || Bt(s)))
                    return gt(e, s), !0;
                return !1
            }(n, o, t)
        },
        handleRemainingComment: function(t, e, s, i, r) {
            const { precedingNode: a, enclosingNode: n, followingNode: o } = t;
            return !!(At(e, a, n, o, t, s) || wt(e, a, n, o, t, s) || function(t, e, s) {
                if (t && ("ObjectProperty" === t.type || "Property" === t.type) && t.shorthand && t.key === e && "AssignmentPattern" === t.value.type)
                    return Pt(t.value.left, s), !0;
                return !1
            }(n, a, t) || function(t, e, s, i) {
                if (")" !== X.getNextNonSpaceNonCommentCharacter(t, s, i.locEnd))
                    return !1;
                if (e && (Mt(e) && 0 === (e.params || e.parameters).length || ("CallExpression" === e.type || "OptionalCallExpression" === e.type || "NewExpression" === e.type) && 0 === e.arguments.length))
                    return Et(e, s), !0;
                if (e && "MethodDefinition" === e.type && 0 === e.value.params.length)
                    return Et(e.value, s), !0;
                return !1
            }(e, n, t, s) || Ft(e, n, a, t, s) || Lt(n, i, t, r) || function(t, e, s, i) {
                if (!e || "ArrowFunctionExpression" !== e.type)
                    return !1;
                const r = Ct(t, s, i.locEnd);
                if ("=>" === t.slice(r, r + 2))
                    return Et(e, s), !0;
                return !1
            }(e, n, t, s) || function(t, e, s, i, r) {
                if ("(" !== X.getNextNonSpaceNonCommentCharacter(t, i, r.locEnd))
                    return !1;
                if (s && e && ("FunctionDeclaration" === e.type || "FunctionExpression" === e.type || "ClassMethod" === e.type || "MethodDefinition" === e.type || "ObjectMethod" === e.type))
                    return Pt(s, i), !0;
                return !1
            }(e, n, a, t, s) || function(t, e, s, i, r) {
                if (!e || "TSMappedType" !== e.type)
                    return !1;
                if (i && "TSTypeParameter" === i.type && i.name)
                    return gt(i.name, r), !0;
                if (s && "TSTypeParameter" === s.type && s.constraint)
                    return Pt(s.constraint, r), !0;
                return !1
            }(0, n, a, o, t) || function(t, e) {
                if (t && ("ContinueStatement" === t.type || "BreakStatement" === t.type) && !t.label)
                    return Pt(t, e), !0;
                return !1
            }(n, t) || function(t, e, s, i, r) {
                if (!s && e && ("TSMethodSignature" === e.type || "TSDeclareFunction" === e.type || "TSAbstractMethodDefinition" === e.type) && ";" === X.getNextNonSpaceNonCommentCharacter(t, i, r.locEnd))
                    return Pt(e, i), !0;
                return !1
            }(e, n, o, t, s))
        },
        hasLeadingComment: function(t, e = (() => !0)) {
            return t.leadingComments ? t.leadingComments.some(e) : !!t.comments && t.comments.some(t => t.leading && e(t))
        },
        isBlockComment: Bt,
        isTypeCastComment: Ot,
        getGapRegex: function(t) {
            if (t && "BinaryExpression" !== t.type && "LogicalExpression" !== t.type)
                return /^[\s(&|]*$/
        },
        getCommentChildNodes: function(t, e) {
            if (("typescript" === e.parser || "flow" === e.parser) && "MethodDefinition" === t.type && t.value && "FunctionExpression" === t.value.type && 0 === t.value.params.length && !t.value.returnType && (!t.value.typeParameters || 0 === t.value.typeParameters.length) && t.value.body)
                return [...t.decorators || [], t.key, t.value.body]
        }
    };
    const { getLast: _t, getNextNonSpaceNonCommentCharacter: jt } = X, { composeLoc: Ut, locEnd: qt } = m, { isTypeCastComment: Vt } = Rt;

    function zt(t, e, s, i) {
        if (!t || "object" != typeof t)
            return;
        if (Array.isArray(t)) {
            for (let s = 0; s < t.length; s++)
                zt(t[s], e, t, s);
            return
        }
        if ("string" != typeof t.type)
            return;
        for (const s of Object.keys(t))
            zt(t[s], e, t, s);
        const r = e(t);
        r && (s[i] = r)
    }

    function Ht(t) {
        return "LogicalExpression" === t.type && "LogicalExpression" === t.right.type && t.operator === t.right.operator
    }
    var Wt = function(t, e) {
            if ("typescript" !== e.parser && "flow" !== e.parser) {
                const e = new Set;
                zt(t, t => {
                        t.leadingComments && t.leadingComments.some(Vt) && e.add(t.start)
                    }),
                    zt(t, t => {
                        if ("ParenthesizedExpression" === t.type && !e.has(t.start)) {
                            const { expression: e } = t;
                            return e.extra || (e.extra = {}),
                                e.extra.parenthesized = !0,
                                e.extra.parenStart = t.start,
                                e
                        }
                    })
            }
            return zt(t, t => {
                    switch (t.type) {
                        case "LogicalExpression":
                            if (Ht(t))
                                return function t(e) {
                                    if (!Ht(e))
                                        return e;
                                    return t(Object.assign({
                                        type: "LogicalExpression",
                                        operator: e.operator,
                                        left: t(Object.assign({
                                            type: "LogicalExpression",
                                            operator: e.operator,
                                            left: e.left,
                                            right: e.right.left
                                        }, Ut(e.left, e.right.left))),
                                        right: e.right.right
                                    }, Ut(e)))
                                }(t);
                            break;
                        case "VariableDeclaration":
                            {
                                const s = _t(t.declarations);
                                s && s.init && function(t, s) {
                                    if (";" === e.originalText[qt(s)])
                                        return;
                                    Array.isArray(t.range) ? t.range = [t.range[0], s.range[1]] : t.end = s.end;
                                    t.loc = Object.assign({}, t.loc, {
                                        end: t.loc.end
                                    })
                                }(t, s);
                                break
                            }
                        case "TSParenthesizedType":
                            return Object.assign({}, t.typeAnnotation, {}, Ut(t));
                        case "TSUnionType":
                        case "TSIntersectionType":
                            if (1 === t.types.length)
                                return Object.assign({}, t.types[0], {}, Ut(t));
                            break;
                        case "TSTypeParameter":
                            "string" == typeof t.name && (t.name = Object.assign({
                                type: "Identifier",
                                name: t.name
                            }, Ut(t, t.name.length)));
                            break;
                        case "SequenceExpression":
                            t.end && t.end > _t(t.expressions).end && (t.end = _t(t.expressions).end);
                            break;
                        case "ClassProperty":
                            t.key && "TSPrivateIdentifier" === t.key.type && "?" === jt(e.originalText, t.key, qt) && (t.optional = !0)
                    }
                }),
                t
        },
        Kt = i((function(t, e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            class s {
                constructor(t, e = {}) {
                    this.label = t,
                        this.keyword = e.keyword,
                        this.beforeExpr = !!e.beforeExpr,
                        this.startsExpr = !!e.startsExpr,
                        this.rightAssociative = !!e.rightAssociative,
                        this.isLoop = !!e.isLoop,
                        this.isAssign = !!e.isAssign,
                        this.prefix = !!e.prefix,
                        this.postfix = !!e.postfix,
                        this.binop = null != e.binop ? e.binop : null,
                        this.updateContext = null
                }
            }
            const i = new Map;

            function r(t, e = {}) {
                e.keyword = t;
                const r = new s(t, e);
                return i.set(t, r),
                    r
            }

            function a(t, e) {
                return new s(t, {
                    beforeExpr: !0,
                    binop: e
                })
            }
            const n = {
                    num: new s("num", {
                        startsExpr: !0
                    }),
                    bigint: new s("bigint", {
                        startsExpr: !0
                    }),
                    regexp: new s("regexp", {
                        startsExpr: !0
                    }),
                    string: new s("string", {
                        startsExpr: !0
                    }),
                    name: new s("name", {
                        startsExpr: !0
                    }),
                    eof: new s("eof"),
                    bracketL: new s("[", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    bracketHashL: new s("#[", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    bracketBarL: new s("[|", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    bracketR: new s("]"),
                    bracketBarR: new s("|]"),
                    braceL: new s("{", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    braceBarL: new s("{|", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    braceHashL: new s("#{", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    braceR: new s("}"),
                    braceBarR: new s("|}"),
                    parenL: new s("(", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    parenR: new s(")"),
                    comma: new s(",", {
                        beforeExpr: !0
                    }),
                    semi: new s(";", {
                        beforeExpr: !0
                    }),
                    colon: new s(":", {
                        beforeExpr: !0
                    }),
                    doubleColon: new s("::", {
                        beforeExpr: !0
                    }),
                    dot: new s("."),
                    question: new s("?", {
                        beforeExpr: !0
                    }),
                    questionDot: new s("?."),
                    arrow: new s("=>", {
                        beforeExpr: !0
                    }),
                    template: new s("template"),
                    ellipsis: new s("...", {
                        beforeExpr: !0
                    }),
                    backQuote: new s("`", {
                        startsExpr: !0
                    }),
                    dollarBraceL: new s("${", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    at: new s("@"),
                    hash: new s("#", {
                        startsExpr: !0
                    }),
                    interpreterDirective: new s("#!..."),
                    eq: new s("=", {
                        beforeExpr: !0,
                        isAssign: !0
                    }),
                    assign: new s("_=", {
                        beforeExpr: !0,
                        isAssign: !0
                    }),
                    incDec: new s("++/--", {
                        prefix: !0,
                        postfix: !0,
                        startsExpr: !0
                    }),
                    bang: new s("!", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    tilde: new s("~", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    pipeline: a("|>", 0),
                    nullishCoalescing: a("??", 1),
                    logicalOR: a("||", 1),
                    logicalAND: a("&&", 2),
                    bitwiseOR: a("|", 3),
                    bitwiseXOR: a("^", 4),
                    bitwiseAND: a("&", 5),
                    equality: a("==/!=/===/!==", 6),
                    relational: a("</>/<=/>=", 7),
                    bitShift: a("<</>>/>>>", 8),
                    plusMin: new s("+/-", {
                        beforeExpr: !0,
                        binop: 9,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    modulo: new s("%", {
                        beforeExpr: !0,
                        binop: 10,
                        startsExpr: !0
                    }),
                    star: a("*", 10),
                    slash: a("/", 10),
                    exponent: new s("**", {
                        beforeExpr: !0,
                        binop: 11,
                        rightAssociative: !0
                    }),
                    _break: r("break"),
                    _case: r("case", {
                        beforeExpr: !0
                    }),
                    _catch: r("catch"),
                    _continue: r("continue"),
                    _debugger: r("debugger"),
                    _default: r("default", {
                        beforeExpr: !0
                    }),
                    _do: r("do", {
                        isLoop: !0,
                        beforeExpr: !0
                    }),
                    _else: r("else", {
                        beforeExpr: !0
                    }),
                    _finally: r("finally"),
                    _for: r("for", {
                        isLoop: !0
                    }),
                    _function: r("function", {
                        startsExpr: !0
                    }),
                    _if: r("if"),
                    _return: r("return", {
                        beforeExpr: !0
                    }),
                    _switch: r("switch"),
                    _throw: r("throw", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    _try: r("try"),
                    _var: r("var"),
                    _const: r("const"),
                    _while: r("while", {
                        isLoop: !0
                    }),
                    _with: r("with"),
                    _new: r("new", {
                        beforeExpr: !0,
                        startsExpr: !0
                    }),
                    _this: r("this", {
                        startsExpr: !0
                    }),
                    _super: r("super", {
                        startsExpr: !0
                    }),
                    _class: r("class", {
                        startsExpr: !0
                    }),
                    _extends: r("extends", {
                        beforeExpr: !0
                    }),
                    _export: r("export"),
                    _import: r("import", {
                        startsExpr: !0
                    }),
                    _null: r("null", {
                        startsExpr: !0
                    }),
                    _true: r("true", {
                        startsExpr: !0
                    }),
                    _false: r("false", {
                        startsExpr: !0
                    }),
                    _in: r("in", {
                        beforeExpr: !0,
                        binop: 7
                    }),
                    _instanceof: r("instanceof", {
                        beforeExpr: !0,
                        binop: 7
                    }),
                    _typeof: r("typeof", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    _void: r("void", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    }),
                    _delete: r("delete", {
                        beforeExpr: !0,
                        prefix: !0,
                        startsExpr: !0
                    })
                },
                o = /\r\n?|[\n\u2028\u2029]/,
                h = new RegExp(o.source, "g");

            function p(t) {
                switch (t) {
                    case 10:
                    case 13:
                    case 8232:
                    case 8233:
                        return !0;
                    default:
                        return !1
                }
            }
            const c = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

            function u(t) {
                switch (t) {
                    case 9:
                    case 11:
                    case 12:
                    case 32:
                    case 160:
                    case 5760:
                    case 8192:
                    case 8193:
                    case 8194:
                    case 8195:
                    case 8196:
                    case 8197:
                    case 8198:
                    case 8199:
                    case 8200:
                    case 8201:
                    case 8202:
                    case 8239:
                    case 8287:
                    case 12288:
                    case 65279:
                        return !0;
                    default:
                        return !1
                }
            }
            class l {
                constructor(t, e) {
                    this.line = t,
                        this.column = e
                }
            }
            class d {
                constructor(t, e) {
                    this.start = t,
                        this.end = e
                }
            }

            function m(t) {
                return t[t.length - 1]
            }
            const f = Object.freeze({
                ArgumentsDisallowedInInitializer: "'arguments' is not allowed in class field initializer",
                AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block",
                AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function",
                AwaitExpressionFormalParameter: "await is not allowed in async function parameters",
                AwaitNotInAsyncFunction: "Can not use keyword 'await' outside an async function",
                BadGetterArity: "getter must not have any formal parameters",
                BadSetterArity: "setter must have exactly one formal parameter",
                BadSetterRestParameter: "setter function argument must not be a rest parameter",
                ConstructorClassField: "Classes may not have a field named 'constructor'",
                ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'",
                ConstructorIsAccessor: "Class constructor may not be an accessor",
                ConstructorIsAsync: "Constructor can't be an async function",
                ConstructorIsGenerator: "Constructor can't be a generator",
                DeclarationMissingInitializer: "%0 require an initialization value",
                DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax",
                DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
                DecoratorExportClass: "Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.",
                DecoratorSemicolon: "Decorators must not be followed by a semicolon",
                DeletePrivateField: "Deleting a private field is not allowed",
                DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
                DuplicateConstructor: "Duplicate constructor in the same class",
                DuplicateDefaultExport: "Only one default export allowed per module.",
                DuplicateExport: "`%0` has already been exported. Exported identifiers must be unique.",
                DuplicateProto: "Redefinition of __proto__ property",
                DuplicateRegExpFlags: "Duplicate regular expression flag",
                ElementAfterRest: "Rest element must be last element",
                EscapedCharNotAnIdentifier: "Invalid Unicode escape",
                ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
                GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block",
                IllegalBreakContinue: "Unsyntactic %0",
                IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
                IllegalReturn: "'return' outside of function",
                ImportCallArgumentTrailingComma: "Trailing comma is disallowed inside import(...) arguments",
                ImportCallArity: "import() requires exactly one argument",
                ImportCallArityLtOne: "Dynamic imports require a parameter: import('a.js')",
                ImportCallNotNewExpression: "Cannot use new with import(...)",
                ImportCallSpreadArgument: "... is not allowed in import()",
                ImportMetaOutsideModule: "import.meta may appear only with 'sourceType: \"module\"'",
                ImportOutsideModule: "'import' and 'export' may appear only with 'sourceType: \"module\"'",
                InvalidCodePoint: "Code point out of bounds",
                InvalidDigit: "Expected number in radix %0",
                InvalidEscapeSequence: "Bad character escape sequence",
                InvalidEscapeSequenceTemplate: "Invalid escape sequence in template",
                InvalidEscapedReservedWord: "Escape sequence in keyword %0",
                InvalidIdentifier: "Invalid identifier %0",
                InvalidLhs: "Invalid left-hand side in %0",
                InvalidLhsBinding: "Binding invalid left-hand side in %0",
                InvalidNumber: "Invalid number",
                InvalidOrUnexpectedToken: "Unexpected character '%0'",
                InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern",
                InvalidPrivateFieldResolution: "Private name #%0 is not defined",
                InvalidPropertyBindingPattern: "Binding member expression",
                InvalidRestAssignmentPattern: "Invalid rest operator's argument",
                LabelRedeclaration: "Label '%0' is already declared",
                LetInLexicalBinding: "'let' is not allowed to be used as a name in 'let' or 'const' declarations.",
                MalformedRegExpFlags: "Invalid regular expression flag",
                MissingClassName: "A class name is required",
                MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
                MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX",
                MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators",
                ModuleExportUndefined: "Export '%0' is not defined",
                MultipleDefaultsInSwitch: "Multiple default clauses",
                NewlineAfterThrow: "Illegal newline after throw",
                NoCatchOrFinally: "Missing catch or finally clause",
                NumberIdentifier: "Identifier directly after number",
                NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences",
                ObsoleteAwaitStar: "await* has been removed from the async functions proposal. Use Promise.all() instead.",
                OptionalChainingNoNew: "constructors in/after an Optional Chain are not allowed",
                OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain",
                ParamDupe: "Argument name clash",
                PatternHasAccessor: "Object pattern can't contain getter or setter",
                PatternHasMethod: "Object pattern can't contain methods",
                PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized',
                PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression",
                PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression",
                PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference",
                PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding",
                PrimaryTopicRequiresSmartPipeline: "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
                PrivateNameRedeclaration: "Duplicate private name #%0",
                RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
                RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
                RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
                RestTrailingComma: "Unexpected trailing comma after rest element",
                SloppyFunction: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement",
                StaticPrototype: "Classes may not have static property named prototype",
                StrictDelete: "Deleting local variable in strict mode",
                StrictEvalArguments: "Assigning to '%0' in strict mode",
                StrictEvalArgumentsBinding: "Binding '%0' in strict mode",
                StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
                StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode",
                StrictWith: "'with' in strict mode",
                SuperNotAllowed: "super() is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
                SuperPrivateField: "Private fields can't be accessed on super",
                TrailingDecorator: "Decorators must be attached to a class element",
                TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
                TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
                TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
                UnexpectedArgumentPlaceholder: "Unexpected argument placeholder",
                UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal',
                UnexpectedDigitAfterHash: "Unexpected digit after hash token",
                UnexpectedImportExport: "'import' and 'export' may only appear at the top level",
                UnexpectedKeyword: "Unexpected keyword '%0'",
                UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration",
                UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context",
                UnexpectedNewTarget: "new.target can only be used in functions",
                UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits",
                UnexpectedPrivateField: "Private names can only be used as the name of a class element (i.e. class C { #p = 42; #m() {} } )\n or a property of member expression (i.e. this.#p).",
                UnexpectedReservedWord: "Unexpected reserved word '%0'",
                UnexpectedSuper: "super is only allowed in object methods and classes",
                UnexpectedToken: "Unexpected token '%'",
                UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
                UnsupportedBind: "Binding should be performed on object property.",
                UnsupportedDecoratorExport: "A decorated export must export a class declaration",
                UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
                UnsupportedImport: "import can only be used in import() or import.meta",
                UnsupportedMetaProperty: "The only valid meta property for %0 is %0.%1",
                UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters",
                UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties",
                UnsupportedSuper: "super can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop])",
                UnterminatedComment: "Unterminated comment",
                UnterminatedRegExp: "Unterminated regular expression",
                UnterminatedString: "Unterminated string constant",
                UnterminatedTemplate: "Unterminated template",
                VarRedeclaration: "Identifier '%0' has already been declared",
                YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator",
                YieldInParameter: "yield is not allowed in generator parameters",
                ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0"
            });

            function D(t) {
                return null != t && "Property" === t.type && "init" === t.kind && !1 === t.method
            }
            class y {
                constructor(t, e, s, i) {
                    this.token = t,
                        this.isExpr = !!e,
                        this.preserveSpace = !!s,
                        this.override = i
                }
            }
            const x = {
                braceStatement: new y("{", !1),
                braceExpression: new y("{", !0),
                templateQuasi: new y("${", !1),
                parenStatement: new y("(", !1),
                parenExpression: new y("(", !0),
                template: new y("`", !0, !0, t => t.readTmplToken()),
                functionExpression: new y("function", !0),
                functionStatement: new y("function", !1)
            };
            n.parenR.updateContext = n.braceR.updateContext = function() {
                    if (1 === this.state.context.length)
                        return void(this.state.exprAllowed = !0);
                    let t = this.state.context.pop();
                    t === x.braceStatement && "function" === this.curContext().token && (t = this.state.context.pop()),
                        this.state.exprAllowed = !t.isExpr
                },
                n.name.updateContext = function(t) {
                    let e = !1;
                    t !== n.dot && ("of" === this.state.value && !this.state.exprAllowed || "yield" === this.state.value && this.prodParam.hasYield) && (e = !0),
                        this.state.exprAllowed = e,
                        this.state.isIterator && (this.state.isIterator = !1)
                },
                n.braceL.updateContext = function(t) {
                    this.state.context.push(this.braceIsBlock(t) ? x.braceStatement : x.braceExpression),
                        this.state.exprAllowed = !0
                },
                n.dollarBraceL.updateContext = function() {
                    this.state.context.push(x.templateQuasi),
                        this.state.exprAllowed = !0
                },
                n.parenL.updateContext = function(t) {
                    const e = t === n._if || t === n._for || t === n._with || t === n._while;
                    this.state.context.push(e ? x.parenStatement : x.parenExpression),
                        this.state.exprAllowed = !0
                },
                n.incDec.updateContext = function() {},
                n._function.updateContext = n._class.updateContext = function(t) {
                    !t.beforeExpr || t === n.semi || t === n._else || t === n._return && o.test(this.input.slice(this.state.lastTokEnd, this.state.start)) || (t === n.colon || t === n.braceL) && this.curContext() === x.b_stat ? this.state.context.push(x.functionStatement) : this.state.context.push(x.functionExpression),
                        this.state.exprAllowed = !1
                },
                n.backQuote.updateContext = function() {
                    this.curContext() === x.template ? this.state.context.pop() : this.state.context.push(x.template),
                        this.state.exprAllowed = !1
                };
            let g = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
                P = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
            const E = new RegExp("[" + g + "]"),
                C = new RegExp("[" + g + P + "]");
            g = P = null;
            const b = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938],
                T = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

            function A(t, e) {
                let s = 65536;
                for (let i = 0, r = e.length; i < r; i += 2) {
                    if (s += e[i],
                        s > t)
                        return !1;
                    if (s += e[i + 1],
                        s >= t)
                        return !0
                }
                return !1
            }

            function w(t) {
                return t < 65 ? 36 === t : t <= 90 || (t < 97 ? 95 === t : t <= 122 || (t <= 65535 ? t >= 170 && E.test(String.fromCharCode(t)) : A(t, b)))
            }

            function S(t) {
                return t < 48 ? 36 === t : t < 58 || !(t < 65) && (t <= 90 || (t < 97 ? 95 === t : t <= 122 || (t <= 65535 ? t >= 170 && C.test(String.fromCharCode(t)) : A(t, b) || A(t, T))))
            }
            const N = ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
                F = ["eval", "arguments"],
                k = new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"]),
                I = new Set(N),
                v = new Set(F);

            function L(t, e) {
                return e && "await" === t || "enum" === t
            }

            function B(t, e) {
                return L(t, e) || I.has(t)
            }

            function M(t) {
                return v.has(t)
            }

            function O(t, e) {
                return B(t, e) || M(t)
            }
            const R = /^in(stanceof)?$/;
            const _ = new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]),
                j = Object.freeze({
                    AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
                    AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module",
                    AssignReservedType: "Cannot overwrite reserved type %0",
                    DeclareClassElement: "The `declare` modifier can only appear on class fields.",
                    DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
                    DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement",
                    EnumBooleanMemberNotInitialized: "Boolean enum members need to be initialized. Use either `%0 = true,` or `%0 = false,` in enum `%1`.",
                    EnumDuplicateMemberName: "Enum member names need to be unique, but the name `%0` has already been used before in enum `%1`.",
                    EnumInconsistentMemberValues: "Enum `%0` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.",
                    EnumInvalidExplicitType: "Enum type `%1` is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
                    EnumInvalidExplicitTypeUnknownSupplied: "Supplied enum type is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
                    EnumInvalidMemberInitializerPrimaryType: "Enum `%0` has type `%2`, so the initializer of `%1` needs to be a %2 literal.",
                    EnumInvalidMemberInitializerSymbolType: "Symbol enum members cannot be initialized. Use `%1,` in enum `%0`.",
                    EnumInvalidMemberInitializerUnknownType: "The enum member initializer for `%1` needs to be a literal (either a boolean, number, or string) in enum `%0`.",
                    EnumInvalidMemberName: "Enum member names cannot start with lowercase 'a' through 'z'. Instead of using `%0`, consider using `%1`, in enum `%2`.",
                    EnumNumberMemberNotInitialized: "Number enum members need to be initialized, e.g. `%1 = 1` in enum `%0`.",
                    EnumStringMemberInconsistentlyInitailized: "String enum members need to consistently either all use initializers, or use no initializers, in enum `%0`.",
                    ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements",
                    InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type",
                    InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions",
                    InexactVariance: "Explicit inexact syntax cannot have variance",
                    InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`",
                    MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
                    NestedDeclareModule: "`declare module` cannot be used inside another `declare module`",
                    NestedFlowComment: "Cannot have a flow comment inside another flow comment",
                    OptionalBindingPattern: "A binding pattern parameter cannot be optional in an implementation signature.",
                    SpreadVariance: "Spread properties cannot have variance",
                    TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`",
                    TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis",
                    UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object",
                    UnexpectedReservedType: "Unexpected reserved type %0",
                    UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new",
                    UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
                    UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions",
                    UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint"',
                    UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration",
                    UnsupportedDeclareExportKind: "`declare export %0` is not supported. Use `%1` instead",
                    UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module",
                    UnterminatedFlowComment: "Unterminated flow-comment"
                });

            function U(t) {
                return "type" === t.importKind || "typeof" === t.importKind
            }

            function q(t) {
                return (t.type === n.name || !!t.type.keyword) && "from" !== t.value
            }
            const V = {
                const: "declare export var",
                let: "declare export var",
                type: "export type",
                interface: "export interface"
            };
            const z = /\*?\s*@((?:no)?flow)\b/;
            const H = {
                    quot: '"',
                    amp: "&",
                    apos: "'",
                    lt: "<",
                    gt: ">",
                    nbsp: " ",
                    iexcl: "¡",
                    cent: "¢",
                    pound: "£",
                    curren: "¤",
                    yen: "¥",
                    brvbar: "¦",
                    sect: "§",
                    uml: "¨",
                    copy: "©",
                    ordf: "ª",
                    laquo: "«",
                    not: "¬",
                    shy: "­",
                    reg: "®",
                    macr: "¯",
                    deg: "°",
                    plusmn: "±",
                    sup2: "²",
                    sup3: "³",
                    acute: "´",
                    micro: "µ",
                    para: "¶",
                    middot: "·",
                    cedil: "¸",
                    sup1: "¹",
                    ordm: "º",
                    raquo: "»",
                    frac14: "¼",
                    frac12: "½",
                    frac34: "¾",
                    iquest: "¿",
                    Agrave: "À",
                    Aacute: "Á",
                    Acirc: "Â",
                    Atilde: "Ã",
                    Auml: "Ä",
                    Aring: "Å",
                    AElig: "Æ",
                    Ccedil: "Ç",
                    Egrave: "È",
                    Eacute: "É",
                    Ecirc: "Ê",
                    Euml: "Ë",
                    Igrave: "Ì",
                    Iacute: "Í",
                    Icirc: "Î",
                    Iuml: "Ï",
                    ETH: "Ð",
                    Ntilde: "Ñ",
                    Ograve: "Ò",
                    Oacute: "Ó",
                    Ocirc: "Ô",
                    Otilde: "Õ",
                    Ouml: "Ö",
                    times: "×",
                    Oslash: "Ø",
                    Ugrave: "Ù",
                    Uacute: "Ú",
                    Ucirc: "Û",
                    Uuml: "Ü",
                    Yacute: "Ý",
                    THORN: "Þ",
                    szlig: "ß",
                    agrave: "à",
                    aacute: "á",
                    acirc: "â",
                    atilde: "ã",
                    auml: "ä",
                    aring: "å",
                    aelig: "æ",
                    ccedil: "ç",
                    egrave: "è",
                    eacute: "é",
                    ecirc: "ê",
                    euml: "ë",
                    igrave: "ì",
                    iacute: "í",
                    icirc: "î",
                    iuml: "ï",
                    eth: "ð",
                    ntilde: "ñ",
                    ograve: "ò",
                    oacute: "ó",
                    ocirc: "ô",
                    otilde: "õ",
                    ouml: "ö",
                    divide: "÷",
                    oslash: "ø",
                    ugrave: "ù",
                    uacute: "ú",
                    ucirc: "û",
                    uuml: "ü",
                    yacute: "ý",
                    thorn: "þ",
                    yuml: "ÿ",
                    OElig: "Œ",
                    oelig: "œ",
                    Scaron: "Š",
                    scaron: "š",
                    Yuml: "Ÿ",
                    fnof: "ƒ",
                    circ: "ˆ",
                    tilde: "˜",
                    Alpha: "Α",
                    Beta: "Β",
                    Gamma: "Γ",
                    Delta: "Δ",
                    Epsilon: "Ε",
                    Zeta: "Ζ",
                    Eta: "Η",
                    Theta: "Θ",
                    Iota: "Ι",
                    Kappa: "Κ",
                    Lambda: "Λ",
                    Mu: "Μ",
                    Nu: "Ν",
                    Xi: "Ξ",
                    Omicron: "Ο",
                    Pi: "Π",
                    Rho: "Ρ",
                    Sigma: "Σ",
                    Tau: "Τ",
                    Upsilon: "Υ",
                    Phi: "Φ",
                    Chi: "Χ",
                    Psi: "Ψ",
                    Omega: "Ω",
                    alpha: "α",
                    beta: "β",
                    gamma: "γ",
                    delta: "δ",
                    epsilon: "ε",
                    zeta: "ζ",
                    eta: "η",
                    theta: "θ",
                    iota: "ι",
                    kappa: "κ",
                    lambda: "λ",
                    mu: "μ",
                    nu: "ν",
                    xi: "ξ",
                    omicron: "ο",
                    pi: "π",
                    rho: "ρ",
                    sigmaf: "ς",
                    sigma: "σ",
                    tau: "τ",
                    upsilon: "υ",
                    phi: "φ",
                    chi: "χ",
                    psi: "ψ",
                    omega: "ω",
                    thetasym: "ϑ",
                    upsih: "ϒ",
                    piv: "ϖ",
                    ensp: " ",
                    emsp: " ",
                    thinsp: " ",
                    zwnj: "‌",
                    zwj: "‍",
                    lrm: "‎",
                    rlm: "‏",
                    ndash: "–",
                    mdash: "—",
                    lsquo: "‘",
                    rsquo: "’",
                    sbquo: "‚",
                    ldquo: "“",
                    rdquo: "”",
                    bdquo: "„",
                    dagger: "†",
                    Dagger: "‡",
                    bull: "•",
                    hellip: "…",
                    permil: "‰",
                    prime: "′",
                    Prime: "″",
                    lsaquo: "‹",
                    rsaquo: "›",
                    oline: "‾",
                    frasl: "⁄",
                    euro: "€",
                    image: "ℑ",
                    weierp: "℘",
                    real: "ℜ",
                    trade: "™",
                    alefsym: "ℵ",
                    larr: "←",
                    uarr: "↑",
                    rarr: "→",
                    darr: "↓",
                    harr: "↔",
                    crarr: "↵",
                    lArr: "⇐",
                    uArr: "⇑",
                    rArr: "⇒",
                    dArr: "⇓",
                    hArr: "⇔",
                    forall: "∀",
                    part: "∂",
                    exist: "∃",
                    empty: "∅",
                    nabla: "∇",
                    isin: "∈",
                    notin: "∉",
                    ni: "∋",
                    prod: "∏",
                    sum: "∑",
                    minus: "−",
                    lowast: "∗",
                    radic: "√",
                    prop: "∝",
                    infin: "∞",
                    ang: "∠",
                    and: "∧",
                    or: "∨",
                    cap: "∩",
                    cup: "∪",
                    int: "∫",
                    there4: "∴",
                    sim: "∼",
                    cong: "≅",
                    asymp: "≈",
                    ne: "≠",
                    equiv: "≡",
                    le: "≤",
                    ge: "≥",
                    sub: "⊂",
                    sup: "⊃",
                    nsub: "⊄",
                    sube: "⊆",
                    supe: "⊇",
                    oplus: "⊕",
                    otimes: "⊗",
                    perp: "⊥",
                    sdot: "⋅",
                    lceil: "⌈",
                    rceil: "⌉",
                    lfloor: "⌊",
                    rfloor: "⌋",
                    lang: "〈",
                    rang: "〉",
                    loz: "◊",
                    spades: "♠",
                    clubs: "♣",
                    hearts: "♥",
                    diams: "♦"
                },
                W = /^[\da-fA-F]+$/,
                K = /^\d+$/,
                J = Object.freeze({
                    AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression",
                    MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>",
                    MissingClosingTagElement: "Expected corresponding JSX closing tag for <%0>",
                    UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text",
                    UnterminatedJsxContent: "Unterminated JSX contents",
                    UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
                });

            function X(t) {
                return !!t && ("JSXOpeningFragment" === t.type || "JSXClosingFragment" === t.type)
            }

            function G(t) {
                if ("JSXIdentifier" === t.type)
                    return t.name;
                if ("JSXNamespacedName" === t.type)
                    return t.namespace.name + ":" + t.name.name;
                if ("JSXMemberExpression" === t.type)
                    return G(t.object) + "." + G(t.property);
                throw new Error("Node had unexpected type: " + t.type)
            }
            x.j_oTag = new y("<tag", !1),
                x.j_cTag = new y("</tag", !1),
                x.j_expr = new y("<tag>...</tag>", !0, !0),
                n.jsxName = new s("jsxName"),
                n.jsxText = new s("jsxText", {
                    beforeExpr: !0
                }),
                n.jsxTagStart = new s("jsxTagStart", {
                    startsExpr: !0
                }),
                n.jsxTagEnd = new s("jsxTagEnd"),
                n.jsxTagStart.updateContext = function() {
                    this.state.context.push(x.j_expr),
                        this.state.context.push(x.j_oTag),
                        this.state.exprAllowed = !1
                },
                n.jsxTagEnd.updateContext = function(t) {
                    const e = this.state.context.pop();
                    e === x.j_oTag && t === n.slash || e === x.j_cTag ? (this.state.context.pop(),
                        this.state.exprAllowed = this.curContext() === x.j_expr) : this.state.exprAllowed = !0
                };
            class Q {
                constructor(t) {
                    this.var = [],
                        this.lexical = [],
                        this.functions = [],
                        this.flags = t
                }
            }
            class Y {
                constructor(t, e) {
                    this.scopeStack = [],
                        this.undefinedExports = new Map,
                        this.undefinedPrivateNames = new Map,
                        this.raise = t,
                        this.inModule = e
                }
                get inFunction() {
                    return (2 & this.currentVarScope().flags) > 0
                }
                get allowSuper() {
                    return (16 & this.currentThisScope().flags) > 0
                }
                get allowDirectSuper() {
                    return (32 & this.currentThisScope().flags) > 0
                }
                get inClass() {
                    return (64 & this.currentThisScope().flags) > 0
                }
                get inNonArrowFunction() {
                    return (2 & this.currentThisScope().flags) > 0
                }
                get treatFunctionsAsVar() {
                    return this.treatFunctionsAsVarInScope(this.currentScope())
                }
                createScope(t) {
                    return new Q(t)
                }
                enter(t) {
                    this.scopeStack.push(this.createScope(t))
                }
                exit() {
                    this.scopeStack.pop()
                }
                treatFunctionsAsVarInScope(t) {
                    return !!(2 & t.flags || !this.inModule && 1 & t.flags)
                }
                declareName(t, e, s) {
                    let i = this.currentScope();
                    if (8 & e || 16 & e)
                        this.checkRedeclarationInScope(i, t, e, s),
                        16 & e ? i.functions.push(t) : i.lexical.push(t),
                        8 & e && this.maybeExportDefined(i, t);
                    else if (4 & e)
                        for (let r = this.scopeStack.length - 1; r >= 0 && (i = this.scopeStack[r],
                                this.checkRedeclarationInScope(i, t, e, s),
                                i.var.push(t),
                                this.maybeExportDefined(i, t), !(131 & i.flags)); --r)
                    ;
                    this.inModule && 1 & i.flags && this.undefinedExports.delete(t)
                }
                maybeExportDefined(t, e) {
                    this.inModule && 1 & t.flags && this.undefinedExports.delete(e)
                }
                checkRedeclarationInScope(t, e, s, i) {
                    this.isRedeclaredInScope(t, e, s) && this.raise(i, f.VarRedeclaration, e)
                }
                isRedeclaredInScope(t, e, s) {
                    return !!(1 & s) && (8 & s ? t.lexical.indexOf(e) > -1 || t.functions.indexOf(e) > -1 || t.var.indexOf(e) > -1 : 16 & s ? t.lexical.indexOf(e) > -1 || !this.treatFunctionsAsVarInScope(t) && t.var.indexOf(e) > -1 : t.lexical.indexOf(e) > -1 && !(8 & t.flags && t.lexical[0] === e) || !this.treatFunctionsAsVarInScope(t) && t.functions.indexOf(e) > -1)
                }
                checkLocalExport(t) {
                    -1 === this.scopeStack[0].lexical.indexOf(t.name) && -1 === this.scopeStack[0].var.indexOf(t.name) && -1 === this.scopeStack[0].functions.indexOf(t.name) && this.undefinedExports.set(t.name, t.start)
                }
                currentScope() {
                    return this.scopeStack[this.scopeStack.length - 1]
                }
                currentVarScope() {
                    for (let t = this.scopeStack.length - 1;; t--) {
                        const e = this.scopeStack[t];
                        if (131 & e.flags)
                            return e
                    }
                }
                currentThisScope() {
                    for (let t = this.scopeStack.length - 1;; t--) {
                        const e = this.scopeStack[t];
                        if ((131 & e.flags || 64 & e.flags) && !(4 & e.flags))
                            return e
                    }
                }
            }
            class $ extends Q {
                constructor(...t) {
                    super(...t),
                        this.types = [],
                        this.enums = [],
                        this.constEnums = [],
                        this.classes = [],
                        this.exportOnlyBindings = []
                }
            }
            class Z extends Y {
                createScope(t) {
                    return new $(t)
                }
                declareName(t, e, s) {
                    const i = this.currentScope();
                    if (1024 & e)
                        return this.maybeExportDefined(i, t),
                            void i.exportOnlyBindings.push(t);
                    super.declareName(...arguments),
                        2 & e && (1 & e || (this.checkRedeclarationInScope(i, t, e, s),
                                this.maybeExportDefined(i, t)),
                            i.types.push(t)),
                        256 & e && i.enums.push(t),
                        512 & e && i.constEnums.push(t),
                        128 & e && i.classes.push(t)
                }
                isRedeclaredInScope(t, e, s) {
                    if (t.enums.indexOf(e) > -1) {
                        if (256 & s) {
                            return !!(512 & s) !== t.constEnums.indexOf(e) > -1
                        }
                        return !0
                    }
                    return 128 & s && t.classes.indexOf(e) > -1 ? t.lexical.indexOf(e) > -1 && !!(1 & s) : !!(2 & s && t.types.indexOf(e) > -1) || super.isRedeclaredInScope(...arguments)
                }
                checkLocalExport(t) {
                    -1 === this.scopeStack[0].types.indexOf(t.name) && -1 === this.scopeStack[0].exportOnlyBindings.indexOf(t.name) && super.checkLocalExport(t)
                }
            }
            class tt {
                constructor() {
                    this.stacks = []
                }
                enter(t) {
                    this.stacks.push(t)
                }
                exit() {
                    this.stacks.pop()
                }
                currentFlags() {
                    return this.stacks[this.stacks.length - 1]
                }
                get hasAwait() {
                    return (2 & this.currentFlags()) > 0
                }
                get hasYield() {
                    return (1 & this.currentFlags()) > 0
                }
                get hasReturn() {
                    return (4 & this.currentFlags()) > 0
                }
            }

            function et(t, e) {
                return (t ? 2 : 0) | (e ? 1 : 0)
            }

            function st(t) {
                if (null == t)
                    throw new Error("Unexpected ".concat(t, " value."));
                return t
            }

            function it(t) {
                if (!t)
                    throw new Error("Assert fail")
            }
            const rt = Object.freeze({
                ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier",
                ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier",
                DeclareClassFieldHasInitializer: "'declare' class fields cannot have an initializer",
                DuplicateModifier: "Duplicate modifier: '%0'",
                EmptyHeritageClauseType: "'%0' list cannot be empty.",
                IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier",
                IndexSignatureHasAccessibility: "Index signatures cannot have an accessibility modifier ('%0')",
                IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier",
                OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
                PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
                PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
                PrivateElementHasAccessibility: "Private elements cannot have an accessibility modifier ('%0')",
                TemplateTypeHasSubstitution: "Template literal types cannot have any substitution",
                TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`",
                UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
                UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
                UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
                UnsupportedImportTypeArgument: "Argument in a type import must be a string literal",
                UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
                UnsupportedSignatureParameterKind: "Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got %0"
            });
            n.placeholder = new s("%%", {
                startsExpr: !0
            });

            function at(t, e) {
                return t.some(t => Array.isArray(t) ? t[0] === e : t === e)
            }

            function nt(t, e, s) {
                const i = t.find(t => Array.isArray(t) ? t[0] === e : t === e);
                return i && Array.isArray(i) ? i[1][s] : null
            }
            const ot = ["minimal", "smart", "fsharp"],
                ht = ["hash", "bar"];
            const pt = {
                    estree: t => class extends t {
                        estreeParseRegExpLiteral({ pattern: t, flags: e }) {
                            let s = null;
                            try {
                                s = new RegExp(t, e)
                            } catch (t) {}
                            const i = this.estreeParseLiteral(s);
                            return i.regex = {
                                    pattern: t,
                                    flags: e
                                },
                                i
                        }
                        estreeParseBigIntLiteral(t) {
                            const e = "undefined" != typeof BigInt ? BigInt(t) : null,
                                s = this.estreeParseLiteral(e);
                            return s.bigint = String(s.value || t),
                                s
                        }
                        estreeParseLiteral(t) {
                            return this.parseLiteral(t, "Literal")
                        }
                        directiveToStmt(t) {
                            const e = t.value,
                                s = this.startNodeAt(t.start, t.loc.start),
                                i = this.startNodeAt(e.start, e.loc.start);
                            return i.value = e.value,
                                i.raw = e.extra.raw,
                                s.expression = this.finishNodeAt(i, "Literal", e.end, e.loc.end),
                                s.directive = e.extra.raw.slice(1, -1),
                                this.finishNodeAt(s, "ExpressionStatement", t.end, t.loc.end)
                        }
                        initFunction(t, e) {
                            super.initFunction(t, e),
                                t.expression = !1
                        }
                        checkDeclaration(t) {
                            D(t) ? this.checkDeclaration(t.value) : super.checkDeclaration(t)
                        }
                        checkGetterSetterParams(t) {
                            const e = t,
                                s = "get" === e.kind ? 0 : 1,
                                i = e.start;
                            e.value.params.length !== s ? "get" === t.kind ? this.raise(i, f.BadGetterArity) : this.raise(i, f.BadSetterArity) : "set" === e.kind && "RestElement" === e.value.params[0].type && this.raise(i, f.BadSetterRestParameter)
                        }
                        checkLVal(t, e = 64, s, i, r) {
                            switch (t.type) {
                                case "ObjectPattern":
                                    t.properties.forEach(t => {
                                        this.checkLVal("Property" === t.type ? t.value : t, e, s, "object destructuring pattern", r)
                                    });
                                    break;
                                default:
                                    super.checkLVal(t, e, s, i, r)
                            }
                        }
                        checkDuplicatedProto(t, e, s) {
                            if ("SpreadElement" === t.type || t.computed || t.method || t.shorthand)
                                return;
                            const i = t.key;
                            "__proto__" === ("Identifier" === i.type ? i.name : String(i.value)) && "init" === t.kind && (e.used && (s && -1 === s.doubleProto ? s.doubleProto = i.start : this.raise(i.start, f.DuplicateProto)),
                                e.used = !0)
                        }
                        isValidDirective(t) {
                            return !("ExpressionStatement" !== t.type || "Literal" !== t.expression.type || "string" != typeof t.expression.value || t.expression.extra && t.expression.extra.parenthesized)
                        }
                        stmtToDirective(t) {
                            const e = super.stmtToDirective(t),
                                s = t.expression.value;
                            return e.value.value = s,
                                e
                        }
                        parseBlockBody(t, e, s, i) {
                            super.parseBlockBody(t, e, s, i);
                            const r = t.directives.map(t => this.directiveToStmt(t));
                            t.body = r.concat(t.body),
                                delete t.directives
                        }
                        pushClassMethod(t, e, s, i, r, a) {
                            this.parseMethod(e, s, i, r, a, "ClassMethod", !0),
                                e.typeParameters && (e.value.typeParameters = e.typeParameters,
                                    delete e.typeParameters),
                                t.body.push(e)
                        }
                        parseExprAtom(t) {
                            switch (this.state.type) {
                                case n.num:
                                case n.string:
                                    return this.estreeParseLiteral(this.state.value);
                                case n.regexp:
                                    return this.estreeParseRegExpLiteral(this.state.value);
                                case n.bigint:
                                    return this.estreeParseBigIntLiteral(this.state.value);
                                case n._null:
                                    return this.estreeParseLiteral(null);
                                case n._true:
                                    return this.estreeParseLiteral(!0);
                                case n._false:
                                    return this.estreeParseLiteral(!1);
                                default:
                                    return super.parseExprAtom(t)
                            }
                        }
                        parseLiteral(t, e, s, i) {
                            const r = super.parseLiteral(t, e, s, i);
                            return r.raw = r.extra.raw,
                                delete r.extra,
                                r
                        }
                        parseFunctionBody(t, e, s = !1) {
                            super.parseFunctionBody(t, e, s),
                                t.expression = "BlockStatement" !== t.body.type
                        }
                        parseMethod(t, e, s, i, r, a, n = !1) {
                            let o = this.startNode();
                            return o.kind = t.kind,
                                o = super.parseMethod(o, e, s, i, r, a, n),
                                o.type = "FunctionExpression",
                                delete o.kind,
                                t.value = o,
                                a = "ClassMethod" === a ? "MethodDefinition" : a,
                                this.finishNode(t, a)
                        }
                        parseObjectMethod(t, e, s, i, r) {
                            const a = super.parseObjectMethod(t, e, s, i, r);
                            return a && (a.type = "Property",
                                    "method" === a.kind && (a.kind = "init"),
                                    a.shorthand = !1),
                                a
                        }
                        parseObjectProperty(t, e, s, i, r) {
                            const a = super.parseObjectProperty(t, e, s, i, r);
                            return a && (a.kind = "init",
                                    a.type = "Property"),
                                a
                        }
                        toAssignable(t) {
                            return D(t) ? (this.toAssignable(t.value),
                                t) : super.toAssignable(t)
                        }
                        toAssignableObjectExpressionProp(t, e) {
                            if ("get" === t.kind || "set" === t.kind)
                                throw this.raise(t.key.start, f.PatternHasAccessor);
                            if (t.method)
                                throw this.raise(t.key.start, f.PatternHasMethod);
                            super.toAssignableObjectExpressionProp(t, e)
                        }
                        finishCallExpression(t, e) {
                            return super.finishCallExpression(t, e),
                                "Import" === t.callee.type && (t.type = "ImportExpression",
                                    t.source = t.arguments[0],
                                    delete t.arguments,
                                    delete t.callee),
                                t
                        }
                        toReferencedListDeep(t, e) {
                            t && super.toReferencedListDeep(t, e)
                        }
                        parseExport(t) {
                            switch (super.parseExport(t),
                                t.type) {
                                case "ExportAllDeclaration":
                                    t.exported = null;
                                    break;
                                case "ExportNamedDeclaration":
                                    1 === t.specifiers.length && "ExportNamespaceSpecifier" === t.specifiers[0].type && (t.type = "ExportAllDeclaration",
                                        t.exported = t.specifiers[0].exported,
                                        delete t.specifiers)
                            }
                            return t
                        }
                    },
                    jsx: t => class extends t {
                        jsxReadToken() {
                            let t = "",
                                e = this.state.pos;
                            for (;;) {
                                if (this.state.pos >= this.length)
                                    throw this.raise(this.state.start, J.UnterminatedJsxContent);
                                const s = this.input.charCodeAt(this.state.pos);
                                switch (s) {
                                    case 60:
                                    case 123:
                                        return this.state.pos === this.state.start ? 60 === s && this.state.exprAllowed ? (++this.state.pos,
                                            this.finishToken(n.jsxTagStart)) : super.getTokenFromCode(s) : (t += this.input.slice(e, this.state.pos),
                                            this.finishToken(n.jsxText, t));
                                    case 38:
                                        t += this.input.slice(e, this.state.pos),
                                            t += this.jsxReadEntity(),
                                            e = this.state.pos;
                                        break;
                                    default:
                                        p(s) ? (t += this.input.slice(e, this.state.pos),
                                            t += this.jsxReadNewLine(!0),
                                            e = this.state.pos) : ++this.state.pos
                                }
                            }
                        }
                        jsxReadNewLine(t) {
                            const e = this.input.charCodeAt(this.state.pos);
                            let s;
                            return ++this.state.pos,
                                13 === e && 10 === this.input.charCodeAt(this.state.pos) ? (++this.state.pos,
                                    s = t ? "\n" : "\r\n") : s = String.fromCharCode(e),
                                ++this.state.curLine,
                                this.state.lineStart = this.state.pos,
                                s
                        }
                        jsxReadString(t) {
                            let e = "",
                                s = ++this.state.pos;
                            for (;;) {
                                if (this.state.pos >= this.length)
                                    throw this.raise(this.state.start, f.UnterminatedString);
                                const i = this.input.charCodeAt(this.state.pos);
                                if (i === t)
                                    break;
                                38 === i ? (e += this.input.slice(s, this.state.pos),
                                    e += this.jsxReadEntity(),
                                    s = this.state.pos) : p(i) ? (e += this.input.slice(s, this.state.pos),
                                    e += this.jsxReadNewLine(!1),
                                    s = this.state.pos) : ++this.state.pos
                            }
                            return e += this.input.slice(s, this.state.pos++),
                                this.finishToken(n.string, e)
                        }
                        jsxReadEntity() {
                            let t, e = "",
                                s = 0,
                                i = this.input[this.state.pos];
                            const r = ++this.state.pos;
                            for (; this.state.pos < this.length && s++ < 10;) {
                                if (i = this.input[this.state.pos++],
                                    ";" === i) {
                                    "#" === e[0] ? "x" === e[1] ? (e = e.substr(2),
                                        W.test(e) && (t = String.fromCodePoint(parseInt(e, 16)))) : (e = e.substr(1),
                                        K.test(e) && (t = String.fromCodePoint(parseInt(e, 10)))) : t = H[e];
                                    break
                                }
                                e += i
                            }
                            return t || (this.state.pos = r,
                                "&")
                        }
                        jsxReadWord() {
                            let t;
                            const e = this.state.pos;
                            do {
                                t = this.input.charCodeAt(++this.state.pos)
                            } while (S(t) || 45 === t);
                            return this.finishToken(n.jsxName, this.input.slice(e, this.state.pos))
                        }
                        jsxParseIdentifier() {
                            const t = this.startNode();
                            return this.match(n.jsxName) ? t.name = this.state.value : this.state.type.keyword ? t.name = this.state.type.keyword : this.unexpected(),
                                this.next(),
                                this.finishNode(t, "JSXIdentifier")
                        }
                        jsxParseNamespacedName() {
                            const t = this.state.start,
                                e = this.state.startLoc,
                                s = this.jsxParseIdentifier();
                            if (!this.eat(n.colon))
                                return s;
                            const i = this.startNodeAt(t, e);
                            return i.namespace = s,
                                i.name = this.jsxParseIdentifier(),
                                this.finishNode(i, "JSXNamespacedName")
                        }
                        jsxParseElementName() {
                            const t = this.state.start,
                                e = this.state.startLoc;
                            let s = this.jsxParseNamespacedName();
                            if ("JSXNamespacedName" === s.type)
                                return s;
                            for (; this.eat(n.dot);) {
                                const i = this.startNodeAt(t, e);
                                i.object = s,
                                    i.property = this.jsxParseIdentifier(),
                                    s = this.finishNode(i, "JSXMemberExpression")
                            }
                            return s
                        }
                        jsxParseAttributeValue() {
                            let t;
                            switch (this.state.type) {
                                case n.braceL:
                                    return t = this.startNode(),
                                        this.next(),
                                        t = this.jsxParseExpressionContainer(t),
                                        "JSXEmptyExpression" === t.expression.type && this.raise(t.start, J.AttributeIsEmpty),
                                        t;
                                case n.jsxTagStart:
                                case n.string:
                                    return this.parseExprAtom();
                                default:
                                    throw this.raise(this.state.start, J.UnsupportedJsxValue)
                            }
                        }
                        jsxParseEmptyExpression() {
                            const t = this.startNodeAt(this.state.lastTokEnd, this.state.lastTokEndLoc);
                            return this.finishNodeAt(t, "JSXEmptyExpression", this.state.start, this.state.startLoc)
                        }
                        jsxParseSpreadChild(t) {
                            return this.next(),
                                t.expression = this.parseExpression(),
                                this.expect(n.braceR),
                                this.finishNode(t, "JSXSpreadChild")
                        }
                        jsxParseExpressionContainer(t) {
                            return this.match(n.braceR) ? t.expression = this.jsxParseEmptyExpression() : t.expression = this.parseExpression(),
                                this.expect(n.braceR),
                                this.finishNode(t, "JSXExpressionContainer")
                        }
                        jsxParseAttribute() {
                            const t = this.startNode();
                            return this.eat(n.braceL) ? (this.expect(n.ellipsis),
                                t.argument = this.parseMaybeAssign(),
                                this.expect(n.braceR),
                                this.finishNode(t, "JSXSpreadAttribute")) : (t.name = this.jsxParseNamespacedName(),
                                t.value = this.eat(n.eq) ? this.jsxParseAttributeValue() : null,
                                this.finishNode(t, "JSXAttribute"))
                        }
                        jsxParseOpeningElementAt(t, e) {
                            const s = this.startNodeAt(t, e);
                            return this.match(n.jsxTagEnd) ? (this.expect(n.jsxTagEnd),
                                this.finishNode(s, "JSXOpeningFragment")) : (s.name = this.jsxParseElementName(),
                                this.jsxParseOpeningElementAfterName(s))
                        }
                        jsxParseOpeningElementAfterName(t) {
                            const e = [];
                            for (; !this.match(n.slash) && !this.match(n.jsxTagEnd);)
                                e.push(this.jsxParseAttribute());
                            return t.attributes = e,
                                t.selfClosing = this.eat(n.slash),
                                this.expect(n.jsxTagEnd),
                                this.finishNode(t, "JSXOpeningElement")
                        }
                        jsxParseClosingElementAt(t, e) {
                            const s = this.startNodeAt(t, e);
                            return this.match(n.jsxTagEnd) ? (this.expect(n.jsxTagEnd),
                                this.finishNode(s, "JSXClosingFragment")) : (s.name = this.jsxParseElementName(),
                                this.expect(n.jsxTagEnd),
                                this.finishNode(s, "JSXClosingElement"))
                        }
                        jsxParseElementAt(t, e) {
                            const s = this.startNodeAt(t, e),
                                i = [],
                                r = this.jsxParseOpeningElementAt(t, e);
                            let a = null;
                            if (!r.selfClosing) {
                                t: for (;;)
                                    switch (this.state.type) {
                                        case n.jsxTagStart:
                                            if (t = this.state.start,
                                                e = this.state.startLoc,
                                                this.next(),
                                                this.eat(n.slash)) {
                                                a = this.jsxParseClosingElementAt(t, e);
                                                break t
                                            }
                                            i.push(this.jsxParseElementAt(t, e));
                                            break;
                                        case n.jsxText:
                                            i.push(this.parseExprAtom());
                                            break;
                                        case n.braceL:
                                            {
                                                const t = this.startNode();
                                                this.next(),
                                                this.match(n.ellipsis) ? i.push(this.jsxParseSpreadChild(t)) : i.push(this.jsxParseExpressionContainer(t));
                                                break
                                            }
                                        default:
                                            throw this.unexpected()
                                    }
                                X(r) && !X(a) ? this.raise(a.start, J.MissingClosingTagFragment) : !X(r) && X(a) ? this.raise(a.start, J.MissingClosingTagElement, G(r.name)) : X(r) || X(a) || G(a.name) !== G(r.name) && this.raise(a.start, J.MissingClosingTagElement, G(r.name))
                            }
                            if (X(r) ? (s.openingFragment = r,
                                    s.closingFragment = a) : (s.openingElement = r,
                                    s.closingElement = a),
                                s.children = i,
                                this.isRelational("<"))
                                throw this.raise(this.state.start, J.UnwrappedAdjacentJSXElements);
                            return X(r) ? this.finishNode(s, "JSXFragment") : this.finishNode(s, "JSXElement")
                        }
                        jsxParseElement() {
                            const t = this.state.start,
                                e = this.state.startLoc;
                            return this.next(),
                                this.jsxParseElementAt(t, e)
                        }
                        parseExprAtom(t) {
                            return this.match(n.jsxText) ? this.parseLiteral(this.state.value, "JSXText") : this.match(n.jsxTagStart) ? this.jsxParseElement() : this.isRelational("<") && 33 !== this.input.charCodeAt(this.state.pos) ? (this.finishToken(n.jsxTagStart),
                                this.jsxParseElement()) : super.parseExprAtom(t)
                        }
                        getTokenFromCode(t) {
                            if (this.state.inPropertyName)
                                return super.getTokenFromCode(t);
                            const e = this.curContext();
                            if (e === x.j_expr)
                                return this.jsxReadToken();
                            if (e === x.j_oTag || e === x.j_cTag) {
                                if (w(t))
                                    return this.jsxReadWord();
                                if (62 === t)
                                    return ++this.state.pos,
                                        this.finishToken(n.jsxTagEnd);
                                if ((34 === t || 39 === t) && e === x.j_oTag)
                                    return this.jsxReadString(t)
                            }
                            return 60 === t && this.state.exprAllowed && 33 !== this.input.charCodeAt(this.state.pos + 1) ? (++this.state.pos,
                                this.finishToken(n.jsxTagStart)) : super.getTokenFromCode(t)
                        }
                        updateContext(t) {
                            if (this.match(n.braceL)) {
                                const e = this.curContext();
                                e === x.j_oTag ? this.state.context.push(x.braceExpression) : e === x.j_expr ? this.state.context.push(x.templateQuasi) : super.updateContext(t),
                                    this.state.exprAllowed = !0
                            } else {
                                if (!this.match(n.slash) || t !== n.jsxTagStart)
                                    return super.updateContext(t);
                                this.state.context.length -= 2,
                                    this.state.context.push(x.j_cTag),
                                    this.state.exprAllowed = !1
                            }
                        }
                    },
                    flow: t => class extends t {
                        constructor(t, e) {
                            super(t, e),
                                this.flowPragma = void 0
                        }
                        shouldParseTypes() {
                            return this.getPluginOption("flow", "all") || "flow" === this.flowPragma
                        }
                        shouldParseEnums() {
                            return !!this.getPluginOption("flow", "enums")
                        }
                        finishToken(t, e) {
                            return t !== n.string && t !== n.semi && t !== n.interpreterDirective && void 0 === this.flowPragma && (this.flowPragma = null),
                                super.finishToken(t, e)
                        }
                        addComment(t) {
                            if (void 0 === this.flowPragma) {
                                const e = z.exec(t.value);
                                if (e)
                                    if ("flow" === e[1])
                                        this.flowPragma = "flow";
                                    else {
                                        if ("noflow" !== e[1])
                                            throw new Error("Unexpected flow pragma");
                                        this.flowPragma = "noflow"
                                    }
                                else
                                ;
                            }
                            return super.addComment(t)
                        }
                        flowParseTypeInitialiser(t) {
                            const e = this.state.inType;
                            this.state.inType = !0,
                                this.expect(t || n.colon);
                            const s = this.flowParseType();
                            return this.state.inType = e,
                                s
                        }
                        flowParsePredicate() {
                            const t = this.startNode(),
                                e = this.state.startLoc,
                                s = this.state.start;
                            this.expect(n.modulo);
                            const i = this.state.startLoc;
                            return this.expectContextual("checks"),
                                e.line === i.line && e.column === i.column - 1 || this.raise(s, j.UnexpectedSpaceBetweenModuloChecks),
                                this.eat(n.parenL) ? (t.value = this.parseExpression(),
                                    this.expect(n.parenR),
                                    this.finishNode(t, "DeclaredPredicate")) : this.finishNode(t, "InferredPredicate")
                        }
                        flowParseTypeAndPredicateInitialiser() {
                            const t = this.state.inType;
                            this.state.inType = !0,
                                this.expect(n.colon);
                            let e = null,
                                s = null;
                            return this.match(n.modulo) ? (this.state.inType = t,
                                s = this.flowParsePredicate()) : (e = this.flowParseType(),
                                this.state.inType = t,
                                this.match(n.modulo) && (s = this.flowParsePredicate())), [e, s]
                        }
                        flowParseDeclareClass(t) {
                            return this.next(),
                                this.flowParseInterfaceish(t, !0),
                                this.finishNode(t, "DeclareClass")
                        }
                        flowParseDeclareFunction(t) {
                            this.next();
                            const e = t.id = this.parseIdentifier(),
                                s = this.startNode(),
                                i = this.startNode();
                            this.isRelational("<") ? s.typeParameters = this.flowParseTypeParameterDeclaration() : s.typeParameters = null,
                                this.expect(n.parenL);
                            const r = this.flowParseFunctionTypeParams();
                            return s.params = r.params,
                                s.rest = r.rest,
                                this.expect(n.parenR), [s.returnType, t.predicate] = this.flowParseTypeAndPredicateInitialiser(),
                                i.typeAnnotation = this.finishNode(s, "FunctionTypeAnnotation"),
                                e.typeAnnotation = this.finishNode(i, "TypeAnnotation"),
                                this.resetEndLocation(e),
                                this.semicolon(),
                                this.finishNode(t, "DeclareFunction")
                        }
                        flowParseDeclare(t, e) {
                            if (this.match(n._class))
                                return this.flowParseDeclareClass(t);
                            if (this.match(n._function))
                                return this.flowParseDeclareFunction(t);
                            if (this.match(n._var))
                                return this.flowParseDeclareVariable(t);
                            if (this.eatContextual("module"))
                                return this.match(n.dot) ? this.flowParseDeclareModuleExports(t) : (e && this.raise(this.state.lastTokStart, j.NestedDeclareModule),
                                    this.flowParseDeclareModule(t));
                            if (this.isContextual("type"))
                                return this.flowParseDeclareTypeAlias(t);
                            if (this.isContextual("opaque"))
                                return this.flowParseDeclareOpaqueType(t);
                            if (this.isContextual("interface"))
                                return this.flowParseDeclareInterface(t);
                            if (this.match(n._export))
                                return this.flowParseDeclareExportDeclaration(t, e);
                            throw this.unexpected()
                        }
                        flowParseDeclareVariable(t) {
                            return this.next(),
                                t.id = this.flowParseTypeAnnotatableIdentifier(!0),
                                this.scope.declareName(t.id.name, 5, t.id.start),
                                this.semicolon(),
                                this.finishNode(t, "DeclareVariable")
                        }
                        flowParseDeclareModule(t) {
                            this.scope.enter(0),
                                this.match(n.string) ? t.id = this.parseExprAtom() : t.id = this.parseIdentifier();
                            const e = t.body = this.startNode(),
                                s = e.body = [];
                            for (this.expect(n.braceL); !this.match(n.braceR);) {
                                let t = this.startNode();
                                this.match(n._import) ? (this.next(),
                                        this.isContextual("type") || this.match(n._typeof) || this.raise(this.state.lastTokStart, j.InvalidNonTypeImportInDeclareModule),
                                        this.parseImport(t)) : (this.expectContextual("declare", j.UnsupportedStatementInDeclareModule),
                                        t = this.flowParseDeclare(t, !0)),
                                    s.push(t)
                            }
                            this.scope.exit(),
                                this.expect(n.braceR),
                                this.finishNode(e, "BlockStatement");
                            let i = null,
                                r = !1;
                            return s.forEach(t => {
                                    ! function(t) {
                                        return "DeclareExportAllDeclaration" === t.type || "DeclareExportDeclaration" === t.type && (!t.declaration || "TypeAlias" !== t.declaration.type && "InterfaceDeclaration" !== t.declaration.type)
                                    }(t) ? "DeclareModuleExports" === t.type && (r && this.raise(t.start, j.DuplicateDeclareModuleExports),
                                        "ES" === i && this.raise(t.start, j.AmbiguousDeclareModuleKind),
                                        i = "CommonJS",
                                        r = !0): ("CommonJS" === i && this.raise(t.start, j.AmbiguousDeclareModuleKind),
                                        i = "ES")
                                }),
                                t.kind = i || "CommonJS",
                                this.finishNode(t, "DeclareModule")
                        }
                        flowParseDeclareExportDeclaration(t, e) {
                            if (this.expect(n._export),
                                this.eat(n._default))
                                return this.match(n._function) || this.match(n._class) ? t.declaration = this.flowParseDeclare(this.startNode()) : (t.declaration = this.flowParseType(),
                                        this.semicolon()),
                                    t.default = !0,
                                    this.finishNode(t, "DeclareExportDeclaration");
                            if (this.match(n._const) || this.isLet() || (this.isContextual("type") || this.isContextual("interface")) && !e) {
                                const t = this.state.value,
                                    e = V[t];
                                throw this.raise(this.state.start, j.UnsupportedDeclareExportKind, t, e)
                            }
                            if (this.match(n._var) || this.match(n._function) || this.match(n._class) || this.isContextual("opaque"))
                                return t.declaration = this.flowParseDeclare(this.startNode()),
                                    t.default = !1,
                                    this.finishNode(t, "DeclareExportDeclaration");
                            if (this.match(n.star) || this.match(n.braceL) || this.isContextual("interface") || this.isContextual("type") || this.isContextual("opaque"))
                                return "ExportNamedDeclaration" === (t = this.parseExport(t)).type && (t.type = "ExportDeclaration",
                                        t.default = !1,
                                        delete t.exportKind),
                                    t.type = "Declare" + t.type,
                                    t;
                            throw this.unexpected()
                        }
                        flowParseDeclareModuleExports(t) {
                            return this.next(),
                                this.expectContextual("exports"),
                                t.typeAnnotation = this.flowParseTypeAnnotation(),
                                this.semicolon(),
                                this.finishNode(t, "DeclareModuleExports")
                        }
                        flowParseDeclareTypeAlias(t) {
                            return this.next(),
                                this.flowParseTypeAlias(t),
                                t.type = "DeclareTypeAlias",
                                t
                        }
                        flowParseDeclareOpaqueType(t) {
                            return this.next(),
                                this.flowParseOpaqueType(t, !0),
                                t.type = "DeclareOpaqueType",
                                t
                        }
                        flowParseDeclareInterface(t) {
                            return this.next(),
                                this.flowParseInterfaceish(t),
                                this.finishNode(t, "DeclareInterface")
                        }
                        flowParseInterfaceish(t, e = !1) {
                            if (t.id = this.flowParseRestrictedIdentifier(!e, !0),
                                this.scope.declareName(t.id.name, e ? 17 : 9, t.id.start),
                                this.isRelational("<") ? t.typeParameters = this.flowParseTypeParameterDeclaration() : t.typeParameters = null,
                                t.extends = [],
                                t.implements = [],
                                t.mixins = [],
                                this.eat(n._extends))
                                do {
                                    t.extends.push(this.flowParseInterfaceExtends())
                                } while (!e && this.eat(n.comma));
                            if (this.isContextual("mixins")) {
                                this.next();
                                do {
                                    t.mixins.push(this.flowParseInterfaceExtends())
                                } while (this.eat(n.comma))
                            }
                            if (this.isContextual("implements")) {
                                this.next();
                                do {
                                    t.implements.push(this.flowParseInterfaceExtends())
                                } while (this.eat(n.comma))
                            }
                            t.body = this.flowParseObjectType({
                                allowStatic: e,
                                allowExact: !1,
                                allowSpread: !1,
                                allowProto: e,
                                allowInexact: !1
                            })
                        }
                        flowParseInterfaceExtends() {
                            const t = this.startNode();
                            return t.id = this.flowParseQualifiedTypeIdentifier(),
                                this.isRelational("<") ? t.typeParameters = this.flowParseTypeParameterInstantiation() : t.typeParameters = null,
                                this.finishNode(t, "InterfaceExtends")
                        }
                        flowParseInterface(t) {
                            return this.flowParseInterfaceish(t),
                                this.finishNode(t, "InterfaceDeclaration")
                        }
                        checkNotUnderscore(t) {
                            "_" === t && this.raise(this.state.start, j.UnexpectedReservedUnderscore)
                        }
                        checkReservedType(t, e, s) {
                            _.has(t) && this.raise(e, s ? j.AssignReservedType : j.UnexpectedReservedType, t)
                        }
                        flowParseRestrictedIdentifier(t, e) {
                            return this.checkReservedType(this.state.value, this.state.start, e),
                                this.parseIdentifier(t)
                        }
                        flowParseTypeAlias(t) {
                            return t.id = this.flowParseRestrictedIdentifier(!1, !0),
                                this.scope.declareName(t.id.name, 9, t.id.start),
                                this.isRelational("<") ? t.typeParameters = this.flowParseTypeParameterDeclaration() : t.typeParameters = null,
                                t.right = this.flowParseTypeInitialiser(n.eq),
                                this.semicolon(),
                                this.finishNode(t, "TypeAlias")
                        }
                        flowParseOpaqueType(t, e) {
                            return this.expectContextual("type"),
                                t.id = this.flowParseRestrictedIdentifier(!0, !0),
                                this.scope.declareName(t.id.name, 9, t.id.start),
                                this.isRelational("<") ? t.typeParameters = this.flowParseTypeParameterDeclaration() : t.typeParameters = null,
                                t.supertype = null,
                                this.match(n.colon) && (t.supertype = this.flowParseTypeInitialiser(n.colon)),
                                t.impltype = null,
                                e || (t.impltype = this.flowParseTypeInitialiser(n.eq)),
                                this.semicolon(),
                                this.finishNode(t, "OpaqueType")
                        }
                        flowParseTypeParameter(t = !1) {
                            const e = this.state.start,
                                s = this.startNode(),
                                i = this.flowParseVariance(),
                                r = this.flowParseTypeAnnotatableIdentifier();
                            return s.name = r.name,
                                s.variance = i,
                                s.bound = r.typeAnnotation,
                                this.match(n.eq) ? (this.eat(n.eq),
                                    s.default = this.flowParseType()) : t && this.raise(e, j.MissingTypeParamDefault),
                                this.finishNode(s, "TypeParameter")
                        }
                        flowParseTypeParameterDeclaration() {
                            const t = this.state.inType,
                                e = this.startNode();
                            e.params = [],
                                this.state.inType = !0,
                                this.isRelational("<") || this.match(n.jsxTagStart) ? this.next() : this.unexpected();
                            let s = !1;
                            do {
                                const t = this.flowParseTypeParameter(s);
                                e.params.push(t),
                                    t.default && (s = !0),
                                    this.isRelational(">") || this.expect(n.comma)
                            } while (!this.isRelational(">"));
                            return this.expectRelational(">"),
                                this.state.inType = t,
                                this.finishNode(e, "TypeParameterDeclaration")
                        }
                        flowParseTypeParameterInstantiation() {
                            const t = this.startNode(),
                                e = this.state.inType;
                            t.params = [],
                                this.state.inType = !0,
                                this.expectRelational("<");
                            const s = this.state.noAnonFunctionType;
                            for (this.state.noAnonFunctionType = !1; !this.isRelational(">");)
                                t.params.push(this.flowParseType()),
                                this.isRelational(">") || this.expect(n.comma);
                            return this.state.noAnonFunctionType = s,
                                this.expectRelational(">"),
                                this.state.inType = e,
                                this.finishNode(t, "TypeParameterInstantiation")
                        }
                        flowParseTypeParameterInstantiationCallOrNew() {
                            const t = this.startNode(),
                                e = this.state.inType;
                            for (t.params = [],
                                this.state.inType = !0,
                                this.expectRelational("<"); !this.isRelational(">");)
                                t.params.push(this.flowParseTypeOrImplicitInstantiation()),
                                this.isRelational(">") || this.expect(n.comma);
                            return this.expectRelational(">"),
                                this.state.inType = e,
                                this.finishNode(t, "TypeParameterInstantiation")
                        }
                        flowParseInterfaceType() {
                            const t = this.startNode();
                            if (this.expectContextual("interface"),
                                t.extends = [],
                                this.eat(n._extends))
                                do {
                                    t.extends.push(this.flowParseInterfaceExtends())
                                } while (this.eat(n.comma));
                            return t.body = this.flowParseObjectType({
                                    allowStatic: !1,
                                    allowExact: !1,
                                    allowSpread: !1,
                                    allowProto: !1,
                                    allowInexact: !1
                                }),
                                this.finishNode(t, "InterfaceTypeAnnotation")
                        }
                        flowParseObjectPropertyKey() {
                            return this.match(n.num) || this.match(n.string) ? this.parseExprAtom() : this.parseIdentifier(!0)
                        }
                        flowParseObjectTypeIndexer(t, e, s) {
                            return t.static = e,
                                this.lookahead().type === n.colon ? (t.id = this.flowParseObjectPropertyKey(),
                                    t.key = this.flowParseTypeInitialiser()) : (t.id = null,
                                    t.key = this.flowParseType()),
                                this.expect(n.bracketR),
                                t.value = this.flowParseTypeInitialiser(),
                                t.variance = s,
                                this.finishNode(t, "ObjectTypeIndexer")
                        }
                        flowParseObjectTypeInternalSlot(t, e) {
                            return t.static = e,
                                t.id = this.flowParseObjectPropertyKey(),
                                this.expect(n.bracketR),
                                this.expect(n.bracketR),
                                this.isRelational("<") || this.match(n.parenL) ? (t.method = !0,
                                    t.optional = !1,
                                    t.value = this.flowParseObjectTypeMethodish(this.startNodeAt(t.start, t.loc.start))) : (t.method = !1,
                                    this.eat(n.question) && (t.optional = !0),
                                    t.value = this.flowParseTypeInitialiser()),
                                this.finishNode(t, "ObjectTypeInternalSlot")
                        }
                        flowParseObjectTypeMethodish(t) {
                            for (t.params = [],
                                t.rest = null,
                                t.typeParameters = null,
                                this.isRelational("<") && (t.typeParameters = this.flowParseTypeParameterDeclaration()),
                                this.expect(n.parenL); !this.match(n.parenR) && !this.match(n.ellipsis);)
                                t.params.push(this.flowParseFunctionTypeParam()),
                                this.match(n.parenR) || this.expect(n.comma);
                            return this.eat(n.ellipsis) && (t.rest = this.flowParseFunctionTypeParam()),
                                this.expect(n.parenR),
                                t.returnType = this.flowParseTypeInitialiser(),
                                this.finishNode(t, "FunctionTypeAnnotation")
                        }
                        flowParseObjectTypeCallProperty(t, e) {
                            const s = this.startNode();
                            return t.static = e,
                                t.value = this.flowParseObjectTypeMethodish(s),
                                this.finishNode(t, "ObjectTypeCallProperty")
                        }
                        flowParseObjectType({ allowStatic: t, allowExact: e, allowSpread: s, allowProto: i, allowInexact: r }) {
                            const a = this.state.inType;
                            this.state.inType = !0;
                            const o = this.startNode();
                            let h, p;
                            o.callProperties = [],
                                o.properties = [],
                                o.indexers = [],
                                o.internalSlots = [];
                            let c = !1;
                            for (e && this.match(n.braceBarL) ? (this.expect(n.braceBarL),
                                    h = n.braceBarR,
                                    p = !0) : (this.expect(n.braceL),
                                    h = n.braceR,
                                    p = !1),
                                o.exact = p; !this.match(h);) {
                                let e = !1,
                                    a = null,
                                    h = null;
                                const u = this.startNode();
                                if (i && this.isContextual("proto")) {
                                    const e = this.lookahead();
                                    e.type !== n.colon && e.type !== n.question && (this.next(),
                                        a = this.state.start,
                                        t = !1)
                                }
                                if (t && this.isContextual("static")) {
                                    const t = this.lookahead();
                                    t.type !== n.colon && t.type !== n.question && (this.next(),
                                        e = !0)
                                }
                                const l = this.flowParseVariance();
                                if (this.eat(n.bracketL))
                                    null != a && this.unexpected(a),
                                    this.eat(n.bracketL) ? (l && this.unexpected(l.start),
                                        o.internalSlots.push(this.flowParseObjectTypeInternalSlot(u, e))) : o.indexers.push(this.flowParseObjectTypeIndexer(u, e, l));
                                else if (this.match(n.parenL) || this.isRelational("<"))
                                    null != a && this.unexpected(a),
                                    l && this.unexpected(l.start),
                                    o.callProperties.push(this.flowParseObjectTypeCallProperty(u, e));
                                else {
                                    let t = "init";
                                    if (this.isContextual("get") || this.isContextual("set")) {
                                        const e = this.lookahead();
                                        e.type !== n.name && e.type !== n.string && e.type !== n.num || (t = this.state.value,
                                            this.next())
                                    }
                                    const i = this.flowParseObjectTypeProperty(u, e, a, l, t, s, null != r ? r : !p);
                                    null === i ? (c = !0,
                                        h = this.state.lastTokStart) : o.properties.push(i)
                                }
                                this.flowObjectTypeSemicolon(), !h || this.match(n.braceR) || this.match(n.braceBarR) || this.raise(h, j.UnexpectedExplicitInexactInObject)
                            }
                            this.expect(h),
                                s && (o.inexact = c);
                            const u = this.finishNode(o, "ObjectTypeAnnotation");
                            return this.state.inType = a,
                                u
                        }
                        flowParseObjectTypeProperty(t, e, s, i, r, a, o) {
                            if (this.eat(n.ellipsis)) {
                                return this.match(n.comma) || this.match(n.semi) || this.match(n.braceR) || this.match(n.braceBarR) ? (a ? o || this.raise(this.state.lastTokStart, j.InexactInsideExact) : this.raise(this.state.lastTokStart, j.InexactInsideNonObject),
                                    i && this.raise(i.start, j.InexactVariance),
                                    null) : (a || this.raise(this.state.lastTokStart, j.UnexpectedSpreadType),
                                    null != s && this.unexpected(s),
                                    i && this.raise(i.start, j.SpreadVariance),
                                    t.argument = this.flowParseType(),
                                    this.finishNode(t, "ObjectTypeSpreadProperty"))
                            } {
                                t.key = this.flowParseObjectPropertyKey(),
                                    t.static = e,
                                    t.proto = null != s,
                                    t.kind = r;
                                let a = !1;
                                return this.isRelational("<") || this.match(n.parenL) ? (t.method = !0,
                                        null != s && this.unexpected(s),
                                        i && this.unexpected(i.start),
                                        t.value = this.flowParseObjectTypeMethodish(this.startNodeAt(t.start, t.loc.start)),
                                        "get" !== r && "set" !== r || this.flowCheckGetterSetterParams(t)) : ("init" !== r && this.unexpected(),
                                        t.method = !1,
                                        this.eat(n.question) && (a = !0),
                                        t.value = this.flowParseTypeInitialiser(),
                                        t.variance = i),
                                    t.optional = a,
                                    this.finishNode(t, "ObjectTypeProperty")
                            }
                        }
                        flowCheckGetterSetterParams(t) {
                            const e = "get" === t.kind ? 0 : 1,
                                s = t.start;
                            t.value.params.length + (t.value.rest ? 1 : 0) !== e && ("get" === t.kind ? this.raise(s, f.BadGetterArity) : this.raise(s, f.BadSetterArity)),
                                "set" === t.kind && t.value.rest && this.raise(s, f.BadSetterRestParameter)
                        }
                        flowObjectTypeSemicolon() {
                            this.eat(n.semi) || this.eat(n.comma) || this.match(n.braceR) || this.match(n.braceBarR) || this.unexpected()
                        }
                        flowParseQualifiedTypeIdentifier(t, e, s) {
                            t = t || this.state.start,
                                e = e || this.state.startLoc;
                            let i = s || this.flowParseRestrictedIdentifier(!0);
                            for (; this.eat(n.dot);) {
                                const s = this.startNodeAt(t, e);
                                s.qualification = i,
                                    s.id = this.flowParseRestrictedIdentifier(!0),
                                    i = this.finishNode(s, "QualifiedTypeIdentifier")
                            }
                            return i
                        }
                        flowParseGenericType(t, e, s) {
                            const i = this.startNodeAt(t, e);
                            return i.typeParameters = null,
                                i.id = this.flowParseQualifiedTypeIdentifier(t, e, s),
                                this.isRelational("<") && (i.typeParameters = this.flowParseTypeParameterInstantiation()),
                                this.finishNode(i, "GenericTypeAnnotation")
                        }
                        flowParseTypeofType() {
                            const t = this.startNode();
                            return this.expect(n._typeof),
                                t.argument = this.flowParsePrimaryType(),
                                this.finishNode(t, "TypeofTypeAnnotation")
                        }
                        flowParseTupleType() {
                            const t = this.startNode();
                            for (t.types = [],
                                this.expect(n.bracketL); this.state.pos < this.length && !this.match(n.bracketR) && (t.types.push(this.flowParseType()), !this.match(n.bracketR));)
                                this.expect(n.comma);
                            return this.expect(n.bracketR),
                                this.finishNode(t, "TupleTypeAnnotation")
                        }
                        flowParseFunctionTypeParam() {
                            let t = null,
                                e = !1,
                                s = null;
                            const i = this.startNode(),
                                r = this.lookahead();
                            return r.type === n.colon || r.type === n.question ? (t = this.parseIdentifier(),
                                    this.eat(n.question) && (e = !0),
                                    s = this.flowParseTypeInitialiser()) : s = this.flowParseType(),
                                i.name = t,
                                i.optional = e,
                                i.typeAnnotation = s,
                                this.finishNode(i, "FunctionTypeParam")
                        }
                        reinterpretTypeAsFunctionTypeParam(t) {
                            const e = this.startNodeAt(t.start, t.loc.start);
                            return e.name = null,
                                e.optional = !1,
                                e.typeAnnotation = t,
                                this.finishNode(e, "FunctionTypeParam")
                        }
                        flowParseFunctionTypeParams(t = []) {
                            let e = null;
                            for (; !this.match(n.parenR) && !this.match(n.ellipsis);)
                                t.push(this.flowParseFunctionTypeParam()),
                                this.match(n.parenR) || this.expect(n.comma);
                            return this.eat(n.ellipsis) && (e = this.flowParseFunctionTypeParam()), {
                                params: t,
                                rest: e
                            }
                        }
                        flowIdentToTypeAnnotation(t, e, s, i) {
                            switch (i.name) {
                                case "any":
                                    return this.finishNode(s, "AnyTypeAnnotation");
                                case "bool":
                                case "boolean":
                                    return this.finishNode(s, "BooleanTypeAnnotation");
                                case "mixed":
                                    return this.finishNode(s, "MixedTypeAnnotation");
                                case "empty":
                                    return this.finishNode(s, "EmptyTypeAnnotation");
                                case "number":
                                    return this.finishNode(s, "NumberTypeAnnotation");
                                case "string":
                                    return this.finishNode(s, "StringTypeAnnotation");
                                case "symbol":
                                    return this.finishNode(s, "SymbolTypeAnnotation");
                                default:
                                    return this.checkNotUnderscore(i.name),
                                        this.flowParseGenericType(t, e, i)
                            }
                        }
                        flowParsePrimaryType() {
                            const t = this.state.start,
                                e = this.state.startLoc,
                                s = this.startNode();
                            let i, r, a = !1;
                            const o = this.state.noAnonFunctionType;
                            switch (this.state.type) {
                                case n.name:
                                    return this.isContextual("interface") ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(t, e, s, this.parseIdentifier());
                                case n.braceL:
                                    return this.flowParseObjectType({
                                        allowStatic: !1,
                                        allowExact: !1,
                                        allowSpread: !0,
                                        allowProto: !1,
                                        allowInexact: !0
                                    });
                                case n.braceBarL:
                                    return this.flowParseObjectType({
                                        allowStatic: !1,
                                        allowExact: !0,
                                        allowSpread: !0,
                                        allowProto: !1,
                                        allowInexact: !1
                                    });
                                case n.bracketL:
                                    return this.state.noAnonFunctionType = !1,
                                        r = this.flowParseTupleType(),
                                        this.state.noAnonFunctionType = o,
                                        r;
                                case n.relational:
                                    if ("<" === this.state.value)
                                        return s.typeParameters = this.flowParseTypeParameterDeclaration(),
                                            this.expect(n.parenL),
                                            i = this.flowParseFunctionTypeParams(),
                                            s.params = i.params,
                                            s.rest = i.rest,
                                            this.expect(n.parenR),
                                            this.expect(n.arrow),
                                            s.returnType = this.flowParseType(),
                                            this.finishNode(s, "FunctionTypeAnnotation");
                                    break;
                                case n.parenL:
                                    if (this.next(), !this.match(n.parenR) && !this.match(n.ellipsis))
                                        if (this.match(n.name)) {
                                            const t = this.lookahead().type;
                                            a = t !== n.question && t !== n.colon
                                        } else
                                            a = !0;
                                    if (a) {
                                        if (this.state.noAnonFunctionType = !1,
                                            r = this.flowParseType(),
                                            this.state.noAnonFunctionType = o,
                                            this.state.noAnonFunctionType || !(this.match(n.comma) || this.match(n.parenR) && this.lookahead().type === n.arrow))
                                            return this.expect(n.parenR),
                                                r;
                                        this.eat(n.comma)
                                    }
                                    return i = r ? this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(r)]) : this.flowParseFunctionTypeParams(),
                                        s.params = i.params,
                                        s.rest = i.rest,
                                        this.expect(n.parenR),
                                        this.expect(n.arrow),
                                        s.returnType = this.flowParseType(),
                                        s.typeParameters = null,
                                        this.finishNode(s, "FunctionTypeAnnotation");
                                case n.string:
                                    return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
                                case n._true:
                                case n._false:
                                    return s.value = this.match(n._true),
                                        this.next(),
                                        this.finishNode(s, "BooleanLiteralTypeAnnotation");
                                case n.plusMin:
                                    if ("-" === this.state.value) {
                                        if (this.next(),
                                            this.match(n.num))
                                            return this.parseLiteral(-this.state.value, "NumberLiteralTypeAnnotation", s.start, s.loc.start);
                                        if (this.match(n.bigint))
                                            return this.parseLiteral(-this.state.value, "BigIntLiteralTypeAnnotation", s.start, s.loc.start);
                                        throw this.raise(this.state.start, j.UnexpectedSubtractionOperand)
                                    }
                                    throw this.unexpected();
                                case n.num:
                                    return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");
                                case n.bigint:
                                    return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");
                                case n._void:
                                    return this.next(),
                                        this.finishNode(s, "VoidTypeAnnotation");
                                case n._null:
                                    return this.next(),
                                        this.finishNode(s, "NullLiteralTypeAnnotation");
                                case n._this:
                                    return this.next(),
                                        this.finishNode(s, "ThisTypeAnnotation");
                                case n.star:
                                    return this.next(),
                                        this.finishNode(s, "ExistsTypeAnnotation");
                                default:
                                    if ("typeof" === this.state.type.keyword)
                                        return this.flowParseTypeofType();
                                    if (this.state.type.keyword) {
                                        const t = this.state.type.label;
                                        return this.next(),
                                            super.createIdentifier(s, t)
                                    }
                            }
                            throw this.unexpected()
                        }
                        flowParsePostfixType() {
                            const t = this.state.start,
                                e = this.state.startLoc;
                            let s = this.flowParsePrimaryType();
                            for (; this.match(n.bracketL) && !this.canInsertSemicolon();) {
                                const i = this.startNodeAt(t, e);
                                i.elementType = s,
                                    this.expect(n.bracketL),
                                    this.expect(n.bracketR),
                                    s = this.finishNode(i, "ArrayTypeAnnotation")
                            }
                            return s
                        }
                        flowParsePrefixType() {
                            const t = this.startNode();
                            return this.eat(n.question) ? (t.typeAnnotation = this.flowParsePrefixType(),
                                this.finishNode(t, "NullableTypeAnnotation")) : this.flowParsePostfixType()
                        }
                        flowParseAnonFunctionWithoutParens() {
                            const t = this.flowParsePrefixType();
                            if (!this.state.noAnonFunctionType && this.eat(n.arrow)) {
                                const e = this.startNodeAt(t.start, t.loc.start);
                                return e.params = [this.reinterpretTypeAsFunctionTypeParam(t)],
                                    e.rest = null,
                                    e.returnType = this.flowParseType(),
                                    e.typeParameters = null,
                                    this.finishNode(e, "FunctionTypeAnnotation")
                            }
                            return t
                        }
                        flowParseIntersectionType() {
                            const t = this.startNode();
                            this.eat(n.bitwiseAND);
                            const e = this.flowParseAnonFunctionWithoutParens();
                            for (t.types = [e]; this.eat(n.bitwiseAND);)
                                t.types.push(this.flowParseAnonFunctionWithoutParens());
                            return 1 === t.types.length ? e : this.finishNode(t, "IntersectionTypeAnnotation")
                        }
                        flowParseUnionType() {
                            const t = this.startNode();
                            this.eat(n.bitwiseOR);
                            const e = this.flowParseIntersectionType();
                            for (t.types = [e]; this.eat(n.bitwiseOR);)
                                t.types.push(this.flowParseIntersectionType());
                            return 1 === t.types.length ? e : this.finishNode(t, "UnionTypeAnnotation")
                        }
                        flowParseType() {
                            const t = this.state.inType;
                            this.state.inType = !0;
                            const e = this.flowParseUnionType();
                            return this.state.inType = t,
                                this.state.exprAllowed = this.state.exprAllowed || this.state.noAnonFunctionType,
                                e
                        }
                        flowParseTypeOrImplicitInstantiation() {
                            if (this.state.type === n.name && "_" === this.state.value) {
                                const t = this.state.start,
                                    e = this.state.startLoc,
                                    s = this.parseIdentifier();
                                return this.flowParseGenericType(t, e, s)
                            }
                            return this.flowParseType()
                        }
                        flowParseTypeAnnotation() {
                            const t = this.startNode();
                            return t.typeAnnotation = this.flowParseTypeInitialiser(),
                                this.finishNode(t, "TypeAnnotation")
                        }
                        flowParseTypeAnnotatableIdentifier(t) {
                            const e = t ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
                            return this.match(n.colon) && (e.typeAnnotation = this.flowParseTypeAnnotation(),
                                    this.resetEndLocation(e)),
                                e
                        }
                        typeCastToParameter(t) {
                            return t.expression.typeAnnotation = t.typeAnnotation,
                                this.resetEndLocation(t.expression, t.typeAnnotation.end, t.typeAnnotation.loc.end),
                                t.expression
                        }
                        flowParseVariance() {
                            let t = null;
                            return this.match(n.plusMin) && (t = this.startNode(),
                                    "+" === this.state.value ? t.kind = "plus" : t.kind = "minus",
                                    this.next(),
                                    this.finishNode(t, "Variance")),
                                t
                        }
                        parseFunctionBody(t, e, s = !1) {
                            return e ? this.forwardNoArrowParamsConversionAt(t, () => super.parseFunctionBody(t, !0, s)) : super.parseFunctionBody(t, !1, s)
                        }
                        parseFunctionBodyAndFinish(t, e, s = !1) {
                            if (this.match(n.colon)) {
                                const e = this.startNode();
                                [e.typeAnnotation, t.predicate] = this.flowParseTypeAndPredicateInitialiser(),
                                    t.returnType = e.typeAnnotation ? this.finishNode(e, "TypeAnnotation") : null
                            }
                            super.parseFunctionBodyAndFinish(t, e, s)
                        }
                        parseStatement(t, e) {
                            if (this.state.strict && this.match(n.name) && "interface" === this.state.value) {
                                const t = this.startNode();
                                return this.next(),
                                    this.flowParseInterface(t)
                            }
                            if (this.shouldParseEnums() && this.isContextual("enum")) {
                                const t = this.startNode();
                                return this.next(),
                                    this.flowParseEnumDeclaration(t)
                            } {
                                const s = super.parseStatement(t, e);
                                return void 0 !== this.flowPragma || this.isValidDirective(s) || (this.flowPragma = null),
                                    s
                            }
                        }
                        parseExpressionStatement(t, e) {
                            if ("Identifier" === e.type)
                                if ("declare" === e.name) {
                                    if (this.match(n._class) || this.match(n.name) || this.match(n._function) || this.match(n._var) || this.match(n._export))
                                        return this.flowParseDeclare(t)
                                } else if (this.match(n.name)) {
                                if ("interface" === e.name)
                                    return this.flowParseInterface(t);
                                if ("type" === e.name)
                                    return this.flowParseTypeAlias(t);
                                if ("opaque" === e.name)
                                    return this.flowParseOpaqueType(t, !1)
                            }
                            return super.parseExpressionStatement(t, e)
                        }
                        shouldParseExportDeclaration() {
                            return this.isContextual("type") || this.isContextual("interface") || this.isContextual("opaque") || this.shouldParseEnums() && this.isContextual("enum") || super.shouldParseExportDeclaration()
                        }
                        isExportDefaultSpecifier() {
                            return (!this.match(n.name) || !("type" === this.state.value || "interface" === this.state.value || "opaque" === this.state.value || this.shouldParseEnums() && "enum" === this.state.value)) && super.isExportDefaultSpecifier()
                        }
                        parseExportDefaultExpression() {
                            if (this.shouldParseEnums() && this.isContextual("enum")) {
                                const t = this.startNode();
                                return this.next(),
                                    this.flowParseEnumDeclaration(t)
                            }
                            return super.parseExportDefaultExpression()
                        }
                        parseConditional(t, e, s, i, r) {
                            if (!this.match(n.question))
                                return t;
                            if (r) {
                                const a = this.tryParse(() => super.parseConditional(t, e, s, i));
                                return a.node ? (a.error && (this.state = a.failState),
                                    a.node) : (r.start = a.error.pos || this.state.start,
                                    t)
                            }
                            this.expect(n.question);
                            const a = this.state.clone(),
                                o = this.state.noArrowAt,
                                h = this.startNodeAt(s, i);
                            let { consequent: p, failed: c } = this.tryParseConditionalConsequent(), [u, l] = this.getArrowLikeExpressions(p);
                            if (c || l.length > 0) {
                                const t = [...o];
                                if (l.length > 0) {
                                    this.state = a,
                                        this.state.noArrowAt = t;
                                    for (let e = 0; e < l.length; e++)
                                        t.push(l[e].start);
                                    ({ consequent: p, failed: c } = this.tryParseConditionalConsequent()), [u, l] = this.getArrowLikeExpressions(p)
                                }
                                c && u.length > 1 && this.raise(a.start, j.AmbiguousConditionalArrow),
                                    c && 1 === u.length && (this.state = a,
                                        this.state.noArrowAt = t.concat(u[0].start),
                                        ({ consequent: p, failed: c } = this.tryParseConditionalConsequent()))
                            }
                            return this.getArrowLikeExpressions(p, !0),
                                this.state.noArrowAt = o,
                                this.expect(n.colon),
                                h.test = t,
                                h.consequent = p,
                                h.alternate = this.forwardNoArrowParamsConversionAt(h, () => this.parseMaybeAssign(e, void 0, void 0, void 0)),
                                this.finishNode(h, "ConditionalExpression")
                        }
                        tryParseConditionalConsequent() {
                            this.state.noArrowParamsConversionAt.push(this.state.start);
                            const t = this.parseMaybeAssign(),
                                e = !this.match(n.colon);
                            return this.state.noArrowParamsConversionAt.pop(), {
                                consequent: t,
                                failed: e
                            }
                        }
                        getArrowLikeExpressions(t, e) {
                            const s = [t],
                                i = [];
                            for (; 0 !== s.length;) {
                                const t = s.pop();
                                "ArrowFunctionExpression" === t.type ? (t.typeParameters || !t.returnType ? this.finishArrowValidation(t) : i.push(t),
                                    s.push(t.body)) : "ConditionalExpression" === t.type && (s.push(t.consequent),
                                    s.push(t.alternate))
                            }
                            return e ? (i.forEach(t => this.finishArrowValidation(t)), [i, []]) : function(t, e) {
                                const s = [],
                                    i = [];
                                for (let r = 0; r < t.length; r++)
                                    (e(t[r], r, t) ? s : i).push(t[r]);
                                return [s, i]
                            }(i, t => t.params.every(t => this.isAssignable(t, !0)))
                        }
                        finishArrowValidation(t) {
                            var e;
                            this.toAssignableList(t.params, null == (e = t.extra) ? void 0 : e.trailingComma),
                                this.scope.enter(6),
                                super.checkParams(t, !1, !0),
                                this.scope.exit()
                        }
                        forwardNoArrowParamsConversionAt(t, e) {
                            let s;
                            return -1 !== this.state.noArrowParamsConversionAt.indexOf(t.start) ? (this.state.noArrowParamsConversionAt.push(this.state.start),
                                    s = e(),
                                    this.state.noArrowParamsConversionAt.pop()) : s = e(),
                                s
                        }
                        parseParenItem(t, e, s) {
                            if (t = super.parseParenItem(t, e, s),
                                this.eat(n.question) && (t.optional = !0,
                                    this.resetEndLocation(t)),
                                this.match(n.colon)) {
                                const i = this.startNodeAt(e, s);
                                return i.expression = t,
                                    i.typeAnnotation = this.flowParseTypeAnnotation(),
                                    this.finishNode(i, "TypeCastExpression")
                            }
                            return t
                        }
                        assertModuleNodeAllowed(t) {
                            "ImportDeclaration" === t.type && ("type" === t.importKind || "typeof" === t.importKind) || "ExportNamedDeclaration" === t.type && "type" === t.exportKind || "ExportAllDeclaration" === t.type && "type" === t.exportKind || super.assertModuleNodeAllowed(t)
                        }
                        parseExport(t) {
                            const e = super.parseExport(t);
                            return "ExportNamedDeclaration" !== e.type && "ExportAllDeclaration" !== e.type || (e.exportKind = e.exportKind || "value"),
                                e
                        }
                        parseExportDeclaration(t) {
                            if (this.isContextual("type")) {
                                t.exportKind = "type";
                                const e = this.startNode();
                                return this.next(),
                                    this.match(n.braceL) ? (t.specifiers = this.parseExportSpecifiers(),
                                        this.parseExportFrom(t),
                                        null) : this.flowParseTypeAlias(e)
                            }
                            if (this.isContextual("opaque")) {
                                t.exportKind = "type";
                                const e = this.startNode();
                                return this.next(),
                                    this.flowParseOpaqueType(e, !1)
                            }
                            if (this.isContextual("interface")) {
                                t.exportKind = "type";
                                const e = this.startNode();
                                return this.next(),
                                    this.flowParseInterface(e)
                            }
                            if (this.shouldParseEnums() && this.isContextual("enum")) {
                                t.exportKind = "value";
                                const e = this.startNode();
                                return this.next(),
                                    this.flowParseEnumDeclaration(e)
                            }
                            return super.parseExportDeclaration(t)
                        }
                        eatExportStar(t) {
                            return !!super.eatExportStar(...arguments) || !(!this.isContextual("type") || this.lookahead().type !== n.star) && (t.exportKind = "type",
                                this.next(),
                                this.next(), !0)
                        }
                        maybeParseExportNamespaceSpecifier(t) {
                            const e = this.state.start,
                                s = super.maybeParseExportNamespaceSpecifier(t);
                            return s && "type" === t.exportKind && this.unexpected(e),
                                s
                        }
                        parseClassId(t, e, s) {
                            super.parseClassId(t, e, s),
                                this.isRelational("<") && (t.typeParameters = this.flowParseTypeParameterDeclaration())
                        }
                        parseClassMember(t, e, s, i) {
                            const r = this.state.start;
                            if (this.isContextual("declare")) {
                                if (this.parseClassMemberFromModifier(t, e))
                                    return;
                                e.declare = !0
                            }
                            super.parseClassMember(t, e, s, i),
                                e.declare && ("ClassProperty" !== e.type && "ClassPrivateProperty" !== e.type ? this.raise(r, j.DeclareClassElement) : e.value && this.raise(e.value.start, j.DeclareClassFieldInitializer))
                        }
                        getTokenFromCode(t) {
                            const e = this.input.charCodeAt(this.state.pos + 1);
                            return 123 === t && 124 === e ? this.finishOp(n.braceBarL, 2) : !this.state.inType || 62 !== t && 60 !== t ? function(t, e) {
                                return 64 === t && 64 === e
                            }(t, e) ? (this.state.isIterator = !0,
                                super.readWord()) : super.getTokenFromCode(t) : this.finishOp(n.relational, 1)
                        }
                        isAssignable(t, e) {
                            switch (t.type) {
                                case "Identifier":
                                case "ObjectPattern":
                                case "ArrayPattern":
                                case "AssignmentPattern":
                                    return !0;
                                case "ObjectExpression":
                                    {
                                        const e = t.properties.length - 1;
                                        return t.properties.every((t, s) => "ObjectMethod" !== t.type && (s === e || "SpreadElement" === t.type) && this.isAssignable(t))
                                    }
                                case "ObjectProperty":
                                    return this.isAssignable(t.value);
                                case "SpreadElement":
                                    return this.isAssignable(t.argument);
                                case "ArrayExpression":
                                    return t.elements.every(t => this.isAssignable(t));
                                case "AssignmentExpression":
                                    return "=" === t.operator;
                                case "ParenthesizedExpression":
                                case "TypeCastExpression":
                                    return this.isAssignable(t.expression);
                                case "MemberExpression":
                                case "OptionalMemberExpression":
                                    return !e;
                                default:
                                    return !1
                            }
                        }
                        toAssignable(t) {
                            return "TypeCastExpression" === t.type ? super.toAssignable(this.typeCastToParameter(t)) : super.toAssignable(t)
                        }
                        toAssignableList(t, e) {
                            for (let e = 0; e < t.length; e++) {
                                const s = t[e];
                                s && "TypeCastExpression" === s.type && (t[e] = this.typeCastToParameter(s))
                            }
                            return super.toAssignableList(t, e)
                        }
                        toReferencedList(t, e) {
                            for (let s = 0; s < t.length; s++) {
                                const i = t[s];
                                !i || "TypeCastExpression" !== i.type || i.extra && i.extra.parenthesized || !(t.length > 1) && e || this.raise(i.typeAnnotation.start, j.TypeCastInPattern)
                            }
                            return t
                        }
                        checkLVal(t, e = 64, s, i) {
                            if ("TypeCastExpression" !== t.type)
                                return super.checkLVal(t, e, s, i)
                        }
                        parseClassProperty(t) {
                            return this.match(n.colon) && (t.typeAnnotation = this.flowParseTypeAnnotation()),
                                super.parseClassProperty(t)
                        }
                        parseClassPrivateProperty(t) {
                            return this.match(n.colon) && (t.typeAnnotation = this.flowParseTypeAnnotation()),
                                super.parseClassPrivateProperty(t)
                        }
                        isClassMethod() {
                            return this.isRelational("<") || super.isClassMethod()
                        }
                        isClassProperty() {
                            return this.match(n.colon) || super.isClassProperty()
                        }
                        isNonstaticConstructor(t) {
                            return !this.match(n.colon) && super.isNonstaticConstructor(t)
                        }
                        pushClassMethod(t, e, s, i, r, a) {
                            e.variance && this.unexpected(e.variance.start),
                                delete e.variance,
                                this.isRelational("<") && (e.typeParameters = this.flowParseTypeParameterDeclaration()),
                                super.pushClassMethod(t, e, s, i, r, a)
                        }
                        pushClassPrivateMethod(t, e, s, i) {
                            e.variance && this.unexpected(e.variance.start),
                                delete e.variance,
                                this.isRelational("<") && (e.typeParameters = this.flowParseTypeParameterDeclaration()),
                                super.pushClassPrivateMethod(t, e, s, i)
                        }
                        parseClassSuper(t) {
                            if (super.parseClassSuper(t),
                                t.superClass && this.isRelational("<") && (t.superTypeParameters = this.flowParseTypeParameterInstantiation()),
                                this.isContextual("implements")) {
                                this.next();
                                const e = t.implements = [];
                                do {
                                    const t = this.startNode();
                                    t.id = this.flowParseRestrictedIdentifier(!0),
                                        this.isRelational("<") ? t.typeParameters = this.flowParseTypeParameterInstantiation() : t.typeParameters = null,
                                        e.push(this.finishNode(t, "ClassImplements"))
                                } while (this.eat(n.comma))
                            }
                        }
                        parsePropertyName(t, e) {
                            const s = this.flowParseVariance(),
                                i = super.parsePropertyName(t, e);
                            return t.variance = s,
                                i
                        }
                        parseObjPropValue(t, e, s, i, r, a, o, h) {
                            let p;
                            t.variance && this.unexpected(t.variance.start),
                                delete t.variance,
                                this.isRelational("<") && (p = this.flowParseTypeParameterDeclaration(),
                                    this.match(n.parenL) || this.unexpected()),
                                super.parseObjPropValue(t, e, s, i, r, a, o, h),
                                p && ((t.value || t).typeParameters = p)
                        }
                        parseAssignableListItemTypes(t) {
                            return this.eat(n.question) && ("Identifier" !== t.type && this.raise(t.start, j.OptionalBindingPattern),
                                    t.optional = !0),
                                this.match(n.colon) && (t.typeAnnotation = this.flowParseTypeAnnotation()),
                                this.resetEndLocation(t),
                                t
                        }
                        parseMaybeDefault(t, e, s) {
                            const i = super.parseMaybeDefault(t, e, s);
                            return "AssignmentPattern" === i.type && i.typeAnnotation && i.right.start < i.typeAnnotation.start && this.raise(i.typeAnnotation.start, j.TypeBeforeInitializer),
                                i
                        }
                        shouldParseDefaultImport(t) {
                            return U(t) ? q(this.state) : super.shouldParseDefaultImport(t)
                        }
                        parseImportSpecifierLocal(t, e, s, i) {
                            e.local = U(t) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier(),
                                this.checkLVal(e.local, 9, void 0, i),
                                t.specifiers.push(this.finishNode(e, s))
                        }
                        maybeParseDefaultImportSpecifier(t) {
                            t.importKind = "value";
                            let e = null;
                            if (this.match(n._typeof) ? e = "typeof" : this.isContextual("type") && (e = "type"),
                                e) {
                                const s = this.lookahead();
                                "type" === e && s.type === n.star && this.unexpected(s.start),
                                    (q(s) || s.type === n.braceL || s.type === n.star) && (this.next(),
                                        t.importKind = e)
                            }
                            return super.maybeParseDefaultImportSpecifier(t)
                        }
                        parseImportSpecifier(t) {
                            const e = this.startNode(),
                                s = this.state.start,
                                i = this.parseIdentifier(!0);
                            let r = null;
                            "type" === i.name ? r = "type" : "typeof" === i.name && (r = "typeof");
                            let a = !1;
                            if (this.isContextual("as") && !this.isLookaheadContextual("as")) {
                                const t = this.parseIdentifier(!0);
                                null === r || this.match(n.name) || this.state.type.keyword ? (e.imported = i,
                                    e.importKind = null,
                                    e.local = this.parseIdentifier()) : (e.imported = t,
                                    e.importKind = r,
                                    e.local = t.__clone())
                            } else
                                null !== r && (this.match(n.name) || this.state.type.keyword) ? (e.imported = this.parseIdentifier(!0),
                                    e.importKind = r,
                                    this.eatContextual("as") ? e.local = this.parseIdentifier() : (a = !0,
                                        e.local = e.imported.__clone())) : (a = !0,
                                    e.imported = i,
                                    e.importKind = null,
                                    e.local = e.imported.__clone());
                            const o = U(t),
                                h = U(e);
                            o && h && this.raise(s, j.ImportTypeShorthandOnlyInPureImport),
                                (o || h) && this.checkReservedType(e.local.name, e.local.start, !0), !a || o || h || this.checkReservedWord(e.local.name, e.start, !0, !0),
                                this.checkLVal(e.local, 9, void 0, "import specifier"),
                                t.specifiers.push(this.finishNode(e, "ImportSpecifier"))
                        }
                        parseFunctionParams(t, e) {
                            const s = t.kind;
                            "get" !== s && "set" !== s && this.isRelational("<") && (t.typeParameters = this.flowParseTypeParameterDeclaration()),
                                super.parseFunctionParams(t, e)
                        }
                        parseVarId(t, e) {
                            super.parseVarId(t, e),
                                this.match(n.colon) && (t.id.typeAnnotation = this.flowParseTypeAnnotation(),
                                    this.resetEndLocation(t.id))
                        }
                        parseAsyncArrowFromCallExpression(t, e) {
                            if (this.match(n.colon)) {
                                const e = this.state.noAnonFunctionType;
                                this.state.noAnonFunctionType = !0,
                                    t.returnType = this.flowParseTypeAnnotation(),
                                    this.state.noAnonFunctionType = e
                            }
                            return super.parseAsyncArrowFromCallExpression(t, e)
                        }
                        shouldParseAsyncArrow() {
                            return this.match(n.colon) || super.shouldParseAsyncArrow()
                        }
                        parseMaybeAssign(t, e, s, i) {
                            let r, a = null;
                            if (this.hasPlugin("jsx") && (this.match(n.jsxTagStart) || this.isRelational("<"))) {
                                if (a = this.state.clone(),
                                    r = this.tryParse(() => super.parseMaybeAssign(t, e, s, i), a), !r.error)
                                    return r.node;
                                const { context: n } = this.state;
                                n[n.length - 1] === x.j_oTag ? n.length -= 2 : n[n.length - 1] === x.j_expr && (n.length -= 1)
                            }
                            if (r && r.error || this.isRelational("<")) {
                                let n;
                                a = a || this.state.clone();
                                const o = this.tryParse(() => {
                                        n = this.flowParseTypeParameterDeclaration();
                                        const r = this.forwardNoArrowParamsConversionAt(n, () => super.parseMaybeAssign(t, e, s, i));
                                        return r.typeParameters = n,
                                            this.resetStartLocationFromNode(r, n),
                                            r
                                    }, a),
                                    h = o.node && "ArrowFunctionExpression" === o.node.type ? o.node : null;
                                if (!o.error && h)
                                    return h;
                                if (r && r.node)
                                    return this.state = r.failState,
                                        r.node;
                                if (h)
                                    return this.state = o.failState,
                                        h;
                                if (r && r.thrown)
                                    throw r.error;
                                if (o.thrown)
                                    throw o.error;
                                throw this.raise(n.start, j.UnexpectedTokenAfterTypeParameter)
                            }
                            return super.parseMaybeAssign(t, e, s, i)
                        }
                        parseArrow(t) {
                            if (this.match(n.colon)) {
                                const e = this.tryParse(() => {
                                    const e = this.state.noAnonFunctionType;
                                    this.state.noAnonFunctionType = !0;
                                    const s = this.startNode();
                                    return [s.typeAnnotation, t.predicate] = this.flowParseTypeAndPredicateInitialiser(),
                                        this.state.noAnonFunctionType = e,
                                        this.canInsertSemicolon() && this.unexpected(),
                                        this.match(n.arrow) || this.unexpected(),
                                        s
                                });
                                if (e.thrown)
                                    return null;
                                e.error && (this.state = e.failState),
                                    t.returnType = e.node.typeAnnotation ? this.finishNode(e.node, "TypeAnnotation") : null
                            }
                            return super.parseArrow(t)
                        }
                        shouldParseArrow() {
                            return this.match(n.colon) || super.shouldParseArrow()
                        }
                        setArrowFunctionParameters(t, e) {
                            -1 !== this.state.noArrowParamsConversionAt.indexOf(t.start) ? t.params = e : super.setArrowFunctionParameters(t, e)
                        }
                        checkParams(t, e, s) {
                            if (!s || -1 === this.state.noArrowParamsConversionAt.indexOf(t.start))
                                return super.checkParams(...arguments)
                        }
                        parseParenAndDistinguishExpression(t) {
                            return super.parseParenAndDistinguishExpression(t && -1 === this.state.noArrowAt.indexOf(this.state.start))
                        }
                        parseSubscripts(t, e, s, i) {
                            if ("Identifier" === t.type && "async" === t.name && -1 !== this.state.noArrowAt.indexOf(e)) {
                                this.next();
                                const i = this.startNodeAt(e, s);
                                i.callee = t,
                                    i.arguments = this.parseCallExpressionArguments(n.parenR, !1),
                                    t = this.finishNode(i, "CallExpression")
                            } else if ("Identifier" === t.type && "async" === t.name && this.isRelational("<")) {
                                const r = this.state.clone(),
                                    a = this.tryParse(t => this.parseAsyncArrowWithTypeParameters(e, s) || t(), r);
                                if (!a.error && !a.aborted)
                                    return a.node;
                                const n = this.tryParse(() => super.parseSubscripts(t, e, s, i), r);
                                if (n.node && !n.error)
                                    return n.node;
                                if (a.node)
                                    return this.state = a.failState,
                                        a.node;
                                if (n.node)
                                    return this.state = n.failState,
                                        n.node;
                                throw a.error || n.error
                            }
                            return super.parseSubscripts(t, e, s, i)
                        }
                        parseSubscript(t, e, s, i, r) {
                            if (this.match(n.questionDot) && this.isLookaheadRelational("<")) {
                                if (r.optionalChainMember = !0,
                                    i)
                                    return r.stop = !0,
                                        t;
                                this.next();
                                const a = this.startNodeAt(e, s);
                                return a.callee = t,
                                    a.typeArguments = this.flowParseTypeParameterInstantiation(),
                                    this.expect(n.parenL),
                                    a.arguments = this.parseCallExpressionArguments(n.parenR, !1),
                                    a.optional = !0,
                                    this.finishCallExpression(a, !0)
                            }
                            if (!i && this.shouldParseTypes() && this.isRelational("<")) {
                                const i = this.startNodeAt(e, s);
                                i.callee = t;
                                const a = this.tryParse(() => (i.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(),
                                    this.expect(n.parenL),
                                    i.arguments = this.parseCallExpressionArguments(n.parenR, !1),
                                    r.optionalChainMember && (i.optional = !1),
                                    this.finishCallExpression(i, r.optionalChainMember)));
                                if (a.node)
                                    return a.error && (this.state = a.failState),
                                        a.node
                            }
                            return super.parseSubscript(t, e, s, i, r)
                        }
                        parseNewArguments(t) {
                            let e = null;
                            this.shouldParseTypes() && this.isRelational("<") && (e = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node),
                                t.typeArguments = e,
                                super.parseNewArguments(t)
                        }
                        parseAsyncArrowWithTypeParameters(t, e) {
                            const s = this.startNodeAt(t, e);
                            if (this.parseFunctionParams(s),
                                this.parseArrow(s))
                                return this.parseArrowExpression(s, void 0, !0)
                        }
                        readToken_mult_modulo(t) {
                            const e = this.input.charCodeAt(this.state.pos + 1);
                            if (42 === t && 47 === e && this.state.hasFlowComment)
                                return this.state.hasFlowComment = !1,
                                    this.state.pos += 2,
                                    void this.nextToken();
                            super.readToken_mult_modulo(t)
                        }
                        readToken_pipe_amp(t) {
                            const e = this.input.charCodeAt(this.state.pos + 1);
                            124 !== t || 125 !== e ? super.readToken_pipe_amp(t) : this.finishOp(n.braceBarR, 2)
                        }
                        parseTopLevel(t, e) {
                            const s = super.parseTopLevel(t, e);
                            return this.state.hasFlowComment && this.raise(this.state.pos, j.UnterminatedFlowComment),
                                s
                        }
                        skipBlockComment() {
                            if (this.hasPlugin("flowComments") && this.skipFlowComment())
                                return this.state.hasFlowComment && this.unexpected(null, j.NestedFlowComment),
                                    this.hasFlowCommentCompletion(),
                                    this.state.pos += this.skipFlowComment(),
                                    void(this.state.hasFlowComment = !0);
                            if (this.state.hasFlowComment) {
                                const t = this.input.indexOf("*-/", this.state.pos += 2);
                                if (-1 === t)
                                    throw this.raise(this.state.pos - 2, f.UnterminatedComment);
                                this.state.pos = t + 3
                            } else
                                super.skipBlockComment()
                        }
                        skipFlowComment() {
                            const { pos: t } = this.state;
                            let e = 2;
                            for (;
                                [32, 9].includes(this.input.charCodeAt(t + e));)
                                e++;
                            const s = this.input.charCodeAt(e + t),
                                i = this.input.charCodeAt(e + t + 1);
                            return 58 === s && 58 === i ? e + 2 : "flow-include" === this.input.slice(e + t, e + t + 12) ? e + 12 : 58 === s && 58 !== i && e
                        }
                        hasFlowCommentCompletion() {
                            if (-1 === this.input.indexOf("*/", this.state.pos))
                                throw this.raise(this.state.pos, f.UnterminatedComment)
                        }
                        flowEnumErrorBooleanMemberNotInitialized(t, { enumName: e, memberName: s }) {
                            this.raise(t, j.EnumBooleanMemberNotInitialized, s, e)
                        }
                        flowEnumErrorInvalidMemberName(t, { enumName: e, memberName: s }) {
                            const i = s[0].toUpperCase() + s.slice(1);
                            this.raise(t, j.EnumInvalidMemberName, s, i, e)
                        }
                        flowEnumErrorDuplicateMemberName(t, { enumName: e, memberName: s }) {
                            this.raise(t, j.EnumDuplicateMemberName, s, e)
                        }
                        flowEnumErrorInconsistentMemberValues(t, { enumName: e }) {
                            this.raise(t, j.EnumInconsistentMemberValues, e)
                        }
                        flowEnumErrorInvalidExplicitType(t, { enumName: e, suppliedType: s }) {
                            return this.raise(t, null === s ? j.EnumInvalidExplicitTypeUnknownSupplied : j.EnumInvalidExplicitType, e, s)
                        }
                        flowEnumErrorInvalidMemberInitializer(t, { enumName: e, explicitType: s, memberName: i }) {
                            let r = null;
                            switch (s) {
                                case "boolean":
                                case "number":
                                case "string":
                                    r = j.EnumInvalidMemberInitializerPrimaryType;
                                    break;
                                case "symbol":
                                    r = j.EnumInvalidMemberInitializerSymbolType;
                                    break;
                                default:
                                    r = j.EnumInvalidMemberInitializerUnknownType
                            }
                            return this.raise(t, r, e, i, s)
                        }
                        flowEnumErrorNumberMemberNotInitialized(t, { enumName: e, memberName: s }) {
                            this.raise(t, j.EnumNumberMemberNotInitialized, e, s)
                        }
                        flowEnumErrorStringMemberInconsistentlyInitailized(t, { enumName: e }) {
                            this.raise(t, j.EnumStringMemberInconsistentlyInitailized, e)
                        }
                        flowEnumMemberInit() {
                            const t = this.state.start,
                                e = () => this.match(n.comma) || this.match(n.braceR);
                            switch (this.state.type) {
                                case n.num:
                                    {
                                        const s = this.parseLiteral(this.state.value, "NumericLiteral");
                                        return e() ? {
                                            type: "number",
                                            pos: s.start,
                                            value: s
                                        } : {
                                            type: "invalid",
                                            pos: t
                                        }
                                    }
                                case n.string:
                                    {
                                        const s = this.parseLiteral(this.state.value, "StringLiteral");
                                        return e() ? {
                                            type: "string",
                                            pos: s.start,
                                            value: s
                                        } : {
                                            type: "invalid",
                                            pos: t
                                        }
                                    }
                                case n._true:
                                case n._false:
                                    {
                                        const s = this.parseBooleanLiteral();
                                        return e() ? {
                                            type: "boolean",
                                            pos: s.start,
                                            value: s
                                        } : {
                                            type: "invalid",
                                            pos: t
                                        }
                                    }
                                default:
                                    return {
                                        type: "invalid",
                                        pos: t
                                    }
                            }
                        }
                        flowEnumMemberRaw() {
                            const t = this.state.start;
                            return {
                                id: this.parseIdentifier(!0),
                                init: this.eat(n.eq) ? this.flowEnumMemberInit() : {
                                    type: "none",
                                    pos: t
                                }
                            }
                        }
                        flowEnumCheckExplicitTypeMismatch(t, e, s) {
                            const { explicitType: i } = e;
                            null !== i && i !== s && this.flowEnumErrorInvalidMemberInitializer(t, e)
                        }
                        flowEnumMembers({ enumName: t, explicitType: e }) {
                            const s = new Set,
                                i = {
                                    booleanMembers: [],
                                    numberMembers: [],
                                    stringMembers: [],
                                    defaultedMembers: []
                                };
                            for (; !this.match(n.braceR);) {
                                const r = this.startNode(),
                                    { id: a, init: o } = this.flowEnumMemberRaw(),
                                    h = a.name;
                                if ("" === h)
                                    continue;
                                /^[a-z]/.test(h) && this.flowEnumErrorInvalidMemberName(a.start, {
                                        enumName: t,
                                        memberName: h
                                    }),
                                    s.has(h) && this.flowEnumErrorDuplicateMemberName(a.start, {
                                        enumName: t,
                                        memberName: h
                                    }),
                                    s.add(h);
                                const p = {
                                    enumName: t,
                                    explicitType: e,
                                    memberName: h
                                };
                                switch (r.id = a,
                                    o.type) {
                                    case "boolean":
                                        this.flowEnumCheckExplicitTypeMismatch(o.pos, p, "boolean"),
                                            r.init = o.value,
                                            i.booleanMembers.push(this.finishNode(r, "EnumBooleanMember"));
                                        break;
                                    case "number":
                                        this.flowEnumCheckExplicitTypeMismatch(o.pos, p, "number"),
                                            r.init = o.value,
                                            i.numberMembers.push(this.finishNode(r, "EnumNumberMember"));
                                        break;
                                    case "string":
                                        this.flowEnumCheckExplicitTypeMismatch(o.pos, p, "string"),
                                            r.init = o.value,
                                            i.stringMembers.push(this.finishNode(r, "EnumStringMember"));
                                        break;
                                    case "invalid":
                                        throw this.flowEnumErrorInvalidMemberInitializer(o.pos, p);
                                    case "none":
                                        switch (e) {
                                            case "boolean":
                                                this.flowEnumErrorBooleanMemberNotInitialized(o.pos, p);
                                                break;
                                            case "number":
                                                this.flowEnumErrorNumberMemberNotInitialized(o.pos, p);
                                                break;
                                            default:
                                                i.defaultedMembers.push(this.finishNode(r, "EnumDefaultedMember"))
                                        }
                                }
                                this.match(n.braceR) || this.expect(n.comma)
                            }
                            return i
                        }
                        flowEnumStringMembers(t, e, { enumName: s }) {
                            if (0 === t.length)
                                return e;
                            if (0 === e.length)
                                return t;
                            if (e.length > t.length) {
                                for (let e = 0; e < t.length; e++) {
                                    const i = t[e];
                                    this.flowEnumErrorStringMemberInconsistentlyInitailized(i.start, {
                                        enumName: s
                                    })
                                }
                                return e
                            }
                            for (let t = 0; t < e.length; t++) {
                                const i = e[t];
                                this.flowEnumErrorStringMemberInconsistentlyInitailized(i.start, {
                                    enumName: s
                                })
                            }
                            return t
                        }
                        flowEnumParseExplicitType({ enumName: t }) {
                            if (this.eatContextual("of")) {
                                if (!this.match(n.name))
                                    throw this.flowEnumErrorInvalidExplicitType(this.state.start, {
                                        enumName: t,
                                        suppliedType: null
                                    });
                                const { value: e } = this.state;
                                return this.next(),
                                    "boolean" !== e && "number" !== e && "string" !== e && "symbol" !== e && this.flowEnumErrorInvalidExplicitType(this.state.start, {
                                        enumName: t,
                                        suppliedType: e
                                    }),
                                    e
                            }
                            return null
                        }
                        flowEnumBody(t, { enumName: e, nameLoc: s }) {
                            const i = this.flowEnumParseExplicitType({
                                enumName: e
                            });
                            this.expect(n.braceL);
                            const r = this.flowEnumMembers({
                                enumName: e,
                                explicitType: i
                            });
                            switch (i) {
                                case "boolean":
                                    return t.explicitType = !0,
                                        t.members = r.booleanMembers,
                                        this.expect(n.braceR),
                                        this.finishNode(t, "EnumBooleanBody");
                                case "number":
                                    return t.explicitType = !0,
                                        t.members = r.numberMembers,
                                        this.expect(n.braceR),
                                        this.finishNode(t, "EnumNumberBody");
                                case "string":
                                    return t.explicitType = !0,
                                        t.members = this.flowEnumStringMembers(r.stringMembers, r.defaultedMembers, {
                                            enumName: e
                                        }),
                                        this.expect(n.braceR),
                                        this.finishNode(t, "EnumStringBody");
                                case "symbol":
                                    return t.members = r.defaultedMembers,
                                        this.expect(n.braceR),
                                        this.finishNode(t, "EnumSymbolBody");
                                default:
                                    {
                                        const i = () => (t.members = [],
                                            this.expect(n.braceR),
                                            this.finishNode(t, "EnumStringBody"));
                                        t.explicitType = !1;
                                        const a = r.booleanMembers.length,
                                            o = r.numberMembers.length,
                                            h = r.stringMembers.length,
                                            p = r.defaultedMembers.length;
                                        if (a || o || h || p) {
                                            if (a || o) {
                                                if (!o && !h && a >= p) {
                                                    for (let t = 0, s = r.defaultedMembers; t < s.length; t++) {
                                                        const i = s[t];
                                                        this.flowEnumErrorBooleanMemberNotInitialized(i.start, {
                                                            enumName: e,
                                                            memberName: i.id.name
                                                        })
                                                    }
                                                    return t.members = r.booleanMembers,
                                                        this.expect(n.braceR),
                                                        this.finishNode(t, "EnumBooleanBody")
                                                }
                                                if (!a && !h && o >= p) {
                                                    for (let t = 0, s = r.defaultedMembers; t < s.length; t++) {
                                                        const i = s[t];
                                                        this.flowEnumErrorNumberMemberNotInitialized(i.start, {
                                                            enumName: e,
                                                            memberName: i.id.name
                                                        })
                                                    }
                                                    return t.members = r.numberMembers,
                                                        this.expect(n.braceR),
                                                        this.finishNode(t, "EnumNumberBody")
                                                }
                                                return this.flowEnumErrorInconsistentMemberValues(s, {
                                                        enumName: e
                                                    }),
                                                    i()
                                            }
                                            return t.members = this.flowEnumStringMembers(r.stringMembers, r.defaultedMembers, {
                                                    enumName: e
                                                }),
                                                this.expect(n.braceR),
                                                this.finishNode(t, "EnumStringBody")
                                        }
                                        return i()
                                    }
                            }
                        }
                        flowParseEnumDeclaration(t) {
                            const e = this.parseIdentifier();
                            return t.id = e,
                                t.body = this.flowEnumBody(this.startNode(), {
                                    enumName: e.name,
                                    nameLoc: e.start
                                }),
                                this.finishNode(t, "EnumDeclaration")
                        }
                    },
                    typescript: t => class extends t {
                        getScopeHandler() {
                            return Z
                        }
                        tsIsIdentifier() {
                            return this.match(n.name)
                        }
                        tsNextTokenCanFollowModifier() {
                            return this.next(), !(this.hasPrecedingLineBreak() || this.match(n.parenL) || this.match(n.parenR) || this.match(n.colon) || this.match(n.eq) || this.match(n.question) || this.match(n.bang))
                        }
                        tsParseModifier(t) {
                            if (!this.match(n.name))
                                return;
                            const e = this.state.value;
                            return -1 !== t.indexOf(e) && this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)) ? e : void 0
                        }
                        tsParseModifiers(t, e) {
                            for (;;) {
                                const s = this.state.start,
                                    i = this.tsParseModifier(e);
                                if (!i)
                                    break;
                                Object.hasOwnProperty.call(t, i) && this.raise(s, rt.DuplicateModifier, i),
                                    t[i] = !0
                            }
                        }
                        tsIsListTerminator(t) {
                            switch (t) {
                                case "EnumMembers":
                                case "TypeMembers":
                                    return this.match(n.braceR);
                                case "HeritageClauseElement":
                                    return this.match(n.braceL);
                                case "TupleElementTypes":
                                    return this.match(n.bracketR);
                                case "TypeParametersOrArguments":
                                    return this.isRelational(">")
                            }
                            throw new Error("Unreachable")
                        }
                        tsParseList(t, e) {
                            const s = [];
                            for (; !this.tsIsListTerminator(t);)
                                s.push(e());
                            return s
                        }
                        tsParseDelimitedList(t, e) {
                            return st(this.tsParseDelimitedListWorker(t, e, !0))
                        }
                        tsParseDelimitedListWorker(t, e, s) {
                            const i = [];
                            for (; !this.tsIsListTerminator(t);) {
                                const r = e();
                                if (null == r)
                                    return;
                                if (i.push(r), !this.eat(n.comma)) {
                                    if (this.tsIsListTerminator(t))
                                        break;
                                    return void(s && this.expect(n.comma))
                                }
                            }
                            return i
                        }
                        tsParseBracketedList(t, e, s, i) {
                            i || (s ? this.expect(n.bracketL) : this.expectRelational("<"));
                            const r = this.tsParseDelimitedList(t, e);
                            return s ? this.expect(n.bracketR) : this.expectRelational(">"),
                                r
                        }
                        tsParseImportType() {
                            const t = this.startNode();
                            return this.expect(n._import),
                                this.expect(n.parenL),
                                this.match(n.string) || this.raise(this.state.start, rt.UnsupportedImportTypeArgument),
                                t.argument = this.parseExprAtom(),
                                this.expect(n.parenR),
                                this.eat(n.dot) && (t.qualifier = this.tsParseEntityName(!0)),
                                this.isRelational("<") && (t.typeParameters = this.tsParseTypeArguments()),
                                this.finishNode(t, "TSImportType")
                        }
                        tsParseEntityName(t) {
                            let e = this.parseIdentifier();
                            for (; this.eat(n.dot);) {
                                const s = this.startNodeAtNode(e);
                                s.left = e,
                                    s.right = this.parseIdentifier(t),
                                    e = this.finishNode(s, "TSQualifiedName")
                            }
                            return e
                        }
                        tsParseTypeReference() {
                            const t = this.startNode();
                            return t.typeName = this.tsParseEntityName(!1), !this.hasPrecedingLineBreak() && this.isRelational("<") && (t.typeParameters = this.tsParseTypeArguments()),
                                this.finishNode(t, "TSTypeReference")
                        }
                        tsParseThisTypePredicate(t) {
                            this.next();
                            const e = this.startNodeAtNode(t);
                            return e.parameterName = t,
                                e.typeAnnotation = this.tsParseTypeAnnotation(!1),
                                this.finishNode(e, "TSTypePredicate")
                        }
                        tsParseThisTypeNode() {
                            const t = this.startNode();
                            return this.next(),
                                this.finishNode(t, "TSThisType")
                        }
                        tsParseTypeQuery() {
                            const t = this.startNode();
                            return this.expect(n._typeof),
                                this.match(n._import) ? t.exprName = this.tsParseImportType() : t.exprName = this.tsParseEntityName(!0),
                                this.finishNode(t, "TSTypeQuery")
                        }
                        tsParseTypeParameter() {
                            const t = this.startNode();
                            return t.name = this.parseIdentifierName(t.start),
                                t.constraint = this.tsEatThenParseType(n._extends),
                                t.default = this.tsEatThenParseType(n.eq),
                                this.finishNode(t, "TSTypeParameter")
                        }
                        tsTryParseTypeParameters() {
                            if (this.isRelational("<"))
                                return this.tsParseTypeParameters()
                        }
                        tsParseTypeParameters() {
                            const t = this.startNode();
                            return this.isRelational("<") || this.match(n.jsxTagStart) ? this.next() : this.unexpected(),
                                t.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this), !1, !0),
                                this.finishNode(t, "TSTypeParameterDeclaration")
                        }
                        tsTryNextParseConstantContext() {
                            return this.lookahead().type === n._const ? (this.next(),
                                this.tsParseTypeReference()) : null
                        }
                        tsFillSignature(t, e) {
                            const s = t === n.arrow;
                            e.typeParameters = this.tsTryParseTypeParameters(),
                                this.expect(n.parenL),
                                e.parameters = this.tsParseBindingListForSignature(),
                                s ? e.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(t) : this.match(t) && (e.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(t))
                        }
                        tsParseBindingListForSignature() {
                            return this.parseBindingList(n.parenR, 41).map(t => ("Identifier" !== t.type && "RestElement" !== t.type && "ObjectPattern" !== t.type && "ArrayPattern" !== t.type && this.raise(t.start, rt.UnsupportedSignatureParameterKind, t.type),
                                t))
                        }
                        tsParseTypeMemberSemicolon() {
                            this.eat(n.comma) || this.semicolon()
                        }
                        tsParseSignatureMember(t, e) {
                            return this.tsFillSignature(n.colon, e),
                                this.tsParseTypeMemberSemicolon(),
                                this.finishNode(e, t)
                        }
                        tsIsUnambiguouslyIndexSignature() {
                            return this.next(),
                                this.eat(n.name) && this.match(n.colon)
                        }
                        tsTryParseIndexSignature(t) {
                            if (!this.match(n.bracketL) || !this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))
                                return;
                            this.expect(n.bracketL);
                            const e = this.parseIdentifier();
                            e.typeAnnotation = this.tsParseTypeAnnotation(),
                                this.resetEndLocation(e),
                                this.expect(n.bracketR),
                                t.parameters = [e];
                            const s = this.tsTryParseTypeAnnotation();
                            return s && (t.typeAnnotation = s),
                                this.tsParseTypeMemberSemicolon(),
                                this.finishNode(t, "TSIndexSignature")
                        }
                        tsParsePropertyOrMethodSignature(t, e) {
                            this.eat(n.question) && (t.optional = !0);
                            const s = t;
                            if (e || !this.match(n.parenL) && !this.isRelational("<")) {
                                const t = s;
                                e && (t.readonly = !0);
                                const i = this.tsTryParseTypeAnnotation();
                                return i && (t.typeAnnotation = i),
                                    this.tsParseTypeMemberSemicolon(),
                                    this.finishNode(t, "TSPropertySignature")
                            } {
                                const t = s;
                                return this.tsFillSignature(n.colon, t),
                                    this.tsParseTypeMemberSemicolon(),
                                    this.finishNode(t, "TSMethodSignature")
                            }
                        }
                        tsParseTypeMember() {
                            const t = this.startNode();
                            if (this.match(n.parenL) || this.isRelational("<"))
                                return this.tsParseSignatureMember("TSCallSignatureDeclaration", t);
                            if (this.match(n._new)) {
                                const e = this.startNode();
                                return this.next(),
                                    this.match(n.parenL) || this.isRelational("<") ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", t) : (t.key = this.createIdentifier(e, "new"),
                                        this.tsParsePropertyOrMethodSignature(t, !1))
                            }
                            const e = !!this.tsParseModifier(["readonly"]),
                                s = this.tsTryParseIndexSignature(t);
                            return s ? (e && (t.readonly = !0),
                                s) : (this.parsePropertyName(t, !1),
                                this.tsParsePropertyOrMethodSignature(t, e))
                        }
                        tsParseTypeLiteral() {
                            const t = this.startNode();
                            return t.members = this.tsParseObjectTypeMembers(),
                                this.finishNode(t, "TSTypeLiteral")
                        }
                        tsParseObjectTypeMembers() {
                            this.expect(n.braceL);
                            const t = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
                            return this.expect(n.braceR),
                                t
                        }
                        tsIsStartOfMappedType() {
                            return this.next(),
                                this.eat(n.plusMin) ? this.isContextual("readonly") : (this.isContextual("readonly") && this.next(), !!this.match(n.bracketL) && (this.next(), !!this.tsIsIdentifier() && (this.next(),
                                    this.match(n._in))))
                        }
                        tsParseMappedTypeParameter() {
                            const t = this.startNode();
                            return t.name = this.parseIdentifierName(t.start),
                                t.constraint = this.tsExpectThenParseType(n._in),
                                this.finishNode(t, "TSTypeParameter")
                        }
                        tsParseMappedType() {
                            const t = this.startNode();
                            return this.expect(n.braceL),
                                this.match(n.plusMin) ? (t.readonly = this.state.value,
                                    this.next(),
                                    this.expectContextual("readonly")) : this.eatContextual("readonly") && (t.readonly = !0),
                                this.expect(n.bracketL),
                                t.typeParameter = this.tsParseMappedTypeParameter(),
                                this.expect(n.bracketR),
                                this.match(n.plusMin) ? (t.optional = this.state.value,
                                    this.next(),
                                    this.expect(n.question)) : this.eat(n.question) && (t.optional = !0),
                                t.typeAnnotation = this.tsTryParseType(),
                                this.semicolon(),
                                this.expect(n.braceR),
                                this.finishNode(t, "TSMappedType")
                        }
                        tsParseTupleType() {
                            const t = this.startNode();
                            t.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
                            let e = !1;
                            return t.elementTypes.forEach(t => {
                                    "TSOptionalType" === t.type ? e = !0 : e && "TSRestType" !== t.type && this.raise(t.start, rt.OptionalTypeBeforeRequired)
                                }),
                                this.finishNode(t, "TSTupleType")
                        }
                        tsParseTupleElementType() {
                            if (this.match(n.ellipsis)) {
                                const t = this.startNode();
                                return this.next(),
                                    t.typeAnnotation = this.tsParseType(),
                                    this.match(n.comma) && 93 !== this.lookaheadCharCode() && this.raiseRestNotLast(this.state.start),
                                    this.finishNode(t, "TSRestType")
                            }
                            const t = this.tsParseType();
                            if (this.eat(n.question)) {
                                const e = this.startNodeAtNode(t);
                                return e.typeAnnotation = t,
                                    this.finishNode(e, "TSOptionalType")
                            }
                            return t
                        }
                        tsParseParenthesizedType() {
                            const t = this.startNode();
                            return this.expect(n.parenL),
                                t.typeAnnotation = this.tsParseType(),
                                this.expect(n.parenR),
                                this.finishNode(t, "TSParenthesizedType")
                        }
                        tsParseFunctionOrConstructorType(t) {
                            const e = this.startNode();
                            return "TSConstructorType" === t && this.expect(n._new),
                                this.tsFillSignature(n.arrow, e),
                                this.finishNode(e, t)
                        }
                        tsParseLiteralTypeNode() {
                            const t = this.startNode();
                            return t.literal = (() => {
                                    switch (this.state.type) {
                                        case n.num:
                                        case n.string:
                                        case n._true:
                                        case n._false:
                                            return this.parseExprAtom();
                                        default:
                                            throw this.unexpected()
                                    }
                                })(),
                                this.finishNode(t, "TSLiteralType")
                        }
                        tsParseTemplateLiteralType() {
                            const t = this.startNode(),
                                e = this.parseTemplate(!1);
                            return e.expressions.length > 0 && this.raise(e.expressions[0].start, rt.TemplateTypeHasSubstitution),
                                t.literal = e,
                                this.finishNode(t, "TSLiteralType")
                        }
                        tsParseThisTypeOrThisTypePredicate() {
                            const t = this.tsParseThisTypeNode();
                            return this.isContextual("is") && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(t) : t
                        }
                        tsParseNonArrayType() {
                            switch (this.state.type) {
                                case n.name:
                                case n._void:
                                case n._null:
                                    {
                                        const t = this.match(n._void) ? "TSVoidKeyword" : this.match(n._null) ? "TSNullKeyword" : function(t) {
                                            switch (t) {
                                                case "any":
                                                    return "TSAnyKeyword";
                                                case "boolean":
                                                    return "TSBooleanKeyword";
                                                case "bigint":
                                                    return "TSBigIntKeyword";
                                                case "never":
                                                    return "TSNeverKeyword";
                                                case "number":
                                                    return "TSNumberKeyword";
                                                case "object":
                                                    return "TSObjectKeyword";
                                                case "string":
                                                    return "TSStringKeyword";
                                                case "symbol":
                                                    return "TSSymbolKeyword";
                                                case "undefined":
                                                    return "TSUndefinedKeyword";
                                                case "unknown":
                                                    return "TSUnknownKeyword";
                                                default:
                                                    return
                                            }
                                        }(this.state.value);
                                        if (void 0 !== t && 46 !== this.lookaheadCharCode()) {
                                            const e = this.startNode();
                                            return this.next(),
                                                this.finishNode(e, t)
                                        }
                                        return this.tsParseTypeReference()
                                    }
                                case n.string:
                                case n.num:
                                case n._true:
                                case n._false:
                                    return this.tsParseLiteralTypeNode();
                                case n.plusMin:
                                    if ("-" === this.state.value) {
                                        const t = this.startNode();
                                        if (this.lookahead().type !== n.num)
                                            throw this.unexpected();
                                        return t.literal = this.parseMaybeUnary(),
                                            this.finishNode(t, "TSLiteralType")
                                    }
                                    break;
                                case n._this:
                                    return this.tsParseThisTypeOrThisTypePredicate();
                                case n._typeof:
                                    return this.tsParseTypeQuery();
                                case n._import:
                                    return this.tsParseImportType();
                                case n.braceL:
                                    return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
                                case n.bracketL:
                                    return this.tsParseTupleType();
                                case n.parenL:
                                    return this.tsParseParenthesizedType();
                                case n.backQuote:
                                    return this.tsParseTemplateLiteralType()
                            }
                            throw this.unexpected()
                        }
                        tsParseArrayTypeOrHigher() {
                            let t = this.tsParseNonArrayType();
                            for (; !this.hasPrecedingLineBreak() && this.eat(n.bracketL);)
                                if (this.match(n.bracketR)) {
                                    const e = this.startNodeAtNode(t);
                                    e.elementType = t,
                                        this.expect(n.bracketR),
                                        t = this.finishNode(e, "TSArrayType")
                                } else {
                                    const e = this.startNodeAtNode(t);
                                    e.objectType = t,
                                        e.indexType = this.tsParseType(),
                                        this.expect(n.bracketR),
                                        t = this.finishNode(e, "TSIndexedAccessType")
                                }
                            return t
                        }
                        tsParseTypeOperator(t) {
                            const e = this.startNode();
                            return this.expectContextual(t),
                                e.operator = t,
                                e.typeAnnotation = this.tsParseTypeOperatorOrHigher(),
                                "readonly" === t && this.tsCheckTypeAnnotationForReadOnly(e),
                                this.finishNode(e, "TSTypeOperator")
                        }
                        tsCheckTypeAnnotationForReadOnly(t) {
                            switch (t.typeAnnotation.type) {
                                case "TSTupleType":
                                case "TSArrayType":
                                    return;
                                default:
                                    this.raise(t.start, rt.UnexpectedReadonly)
                            }
                        }
                        tsParseInferType() {
                            const t = this.startNode();
                            this.expectContextual("infer");
                            const e = this.startNode();
                            return e.name = this.parseIdentifierName(e.start),
                                t.typeParameter = this.finishNode(e, "TSTypeParameter"),
                                this.finishNode(t, "TSInferType")
                        }
                        tsParseTypeOperatorOrHigher() {
                            const t = ["keyof", "unique", "readonly"].find(t => this.isContextual(t));
                            return t ? this.tsParseTypeOperator(t) : this.isContextual("infer") ? this.tsParseInferType() : this.tsParseArrayTypeOrHigher()
                        }
                        tsParseUnionOrIntersectionType(t, e, s) {
                            this.eat(s);
                            let i = e();
                            if (this.match(s)) {
                                const r = [i];
                                for (; this.eat(s);)
                                    r.push(e());
                                const a = this.startNodeAtNode(i);
                                a.types = r,
                                    i = this.finishNode(a, t)
                            }
                            return i
                        }
                        tsParseIntersectionTypeOrHigher() {
                            return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), n.bitwiseAND)
                        }
                        tsParseUnionTypeOrHigher() {
                            return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), n.bitwiseOR)
                        }
                        tsIsStartOfFunctionType() {
                            return !!this.isRelational("<") || this.match(n.parenL) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this))
                        }
                        tsSkipParameterStart() {
                            if (this.match(n.name) || this.match(n._this))
                                return this.next(), !0;
                            if (this.match(n.braceL)) {
                                let t = 1;
                                for (this.next(); t > 0;)
                                    this.match(n.braceL) ? ++t : this.match(n.braceR) && --t,
                                    this.next();
                                return !0
                            }
                            if (this.match(n.bracketL)) {
                                let t = 1;
                                for (this.next(); t > 0;)
                                    this.match(n.bracketL) ? ++t : this.match(n.bracketR) && --t,
                                    this.next();
                                return !0
                            }
                            return !1
                        }
                        tsIsUnambiguouslyStartOfFunctionType() {
                            if (this.next(),
                                this.match(n.parenR) || this.match(n.ellipsis))
                                return !0;
                            if (this.tsSkipParameterStart()) {
                                if (this.match(n.colon) || this.match(n.comma) || this.match(n.question) || this.match(n.eq))
                                    return !0;
                                if (this.match(n.parenR) && (this.next(),
                                        this.match(n.arrow)))
                                    return !0
                            }
                            return !1
                        }
                        tsParseTypeOrTypePredicateAnnotation(t) {
                            return this.tsInType(() => {
                                const e = this.startNode();
                                this.expect(t);
                                const s = this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
                                if (s && this.match(n._this)) {
                                    let t = this.tsParseThisTypeOrThisTypePredicate();
                                    if ("TSThisType" === t.type) {
                                        const s = this.startNodeAtNode(e);
                                        s.parameterName = t,
                                            s.asserts = !0,
                                            t = this.finishNode(s, "TSTypePredicate")
                                    } else
                                        t.asserts = !0;
                                    return e.typeAnnotation = t,
                                        this.finishNode(e, "TSTypeAnnotation")
                                }
                                const i = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
                                if (!i) {
                                    if (!s)
                                        return this.tsParseTypeAnnotation(!1, e);
                                    const t = this.startNodeAtNode(e);
                                    return t.parameterName = this.parseIdentifier(),
                                        t.asserts = s,
                                        e.typeAnnotation = this.finishNode(t, "TSTypePredicate"),
                                        this.finishNode(e, "TSTypeAnnotation")
                                }
                                const r = this.tsParseTypeAnnotation(!1),
                                    a = this.startNodeAtNode(e);
                                return a.parameterName = i,
                                    a.typeAnnotation = r,
                                    a.asserts = s,
                                    e.typeAnnotation = this.finishNode(a, "TSTypePredicate"),
                                    this.finishNode(e, "TSTypeAnnotation")
                            })
                        }
                        tsTryParseTypeOrTypePredicateAnnotation() {
                            return this.match(n.colon) ? this.tsParseTypeOrTypePredicateAnnotation(n.colon) : void 0
                        }
                        tsTryParseTypeAnnotation() {
                            return this.match(n.colon) ? this.tsParseTypeAnnotation() : void 0
                        }
                        tsTryParseType() {
                            return this.tsEatThenParseType(n.colon)
                        }
                        tsParseTypePredicatePrefix() {
                            const t = this.parseIdentifier();
                            if (this.isContextual("is") && !this.hasPrecedingLineBreak())
                                return this.next(),
                                    t
                        }
                        tsParseTypePredicateAsserts() {
                            if (!this.match(n.name) || "asserts" !== this.state.value || this.hasPrecedingLineBreak())
                                return !1;
                            const t = this.state.containsEsc;
                            return this.next(), !(!this.match(n.name) && !this.match(n._this)) && (t && this.raise(this.state.lastTokStart, f.InvalidEscapedReservedWord, "asserts"), !0)
                        }
                        tsParseTypeAnnotation(t = !0, e = this.startNode()) {
                            return this.tsInType(() => {
                                    t && this.expect(n.colon),
                                        e.typeAnnotation = this.tsParseType()
                                }),
                                this.finishNode(e, "TSTypeAnnotation")
                        }
                        tsParseType() {
                            it(this.state.inType);
                            const t = this.tsParseNonConditionalType();
                            if (this.hasPrecedingLineBreak() || !this.eat(n._extends))
                                return t;
                            const e = this.startNodeAtNode(t);
                            return e.checkType = t,
                                e.extendsType = this.tsParseNonConditionalType(),
                                this.expect(n.question),
                                e.trueType = this.tsParseType(),
                                this.expect(n.colon),
                                e.falseType = this.tsParseType(),
                                this.finishNode(e, "TSConditionalType")
                        }
                        tsParseNonConditionalType() {
                            return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(n._new) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.tsParseUnionTypeOrHigher()
                        }
                        tsParseTypeAssertion() {
                            const t = this.startNode(),
                                e = this.tsTryNextParseConstantContext();
                            return t.typeAnnotation = e || this.tsNextThenParseType(),
                                this.expectRelational(">"),
                                t.expression = this.parseMaybeUnary(),
                                this.finishNode(t, "TSTypeAssertion")
                        }
                        tsParseHeritageClause(t) {
                            const e = this.state.start,
                                s = this.tsParseDelimitedList("HeritageClauseElement", this.tsParseExpressionWithTypeArguments.bind(this));
                            return s.length || this.raise(e, rt.EmptyHeritageClauseType, t),
                                s
                        }
                        tsParseExpressionWithTypeArguments() {
                            const t = this.startNode();
                            return t.expression = this.tsParseEntityName(!1),
                                this.isRelational("<") && (t.typeParameters = this.tsParseTypeArguments()),
                                this.finishNode(t, "TSExpressionWithTypeArguments")
                        }
                        tsParseInterfaceDeclaration(t) {
                            t.id = this.parseIdentifier(),
                                this.checkLVal(t.id, 130, void 0, "typescript interface declaration"),
                                t.typeParameters = this.tsTryParseTypeParameters(),
                                this.eat(n._extends) && (t.extends = this.tsParseHeritageClause("extends"));
                            const e = this.startNode();
                            return e.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)),
                                t.body = this.finishNode(e, "TSInterfaceBody"),
                                this.finishNode(t, "TSInterfaceDeclaration")
                        }
                        tsParseTypeAliasDeclaration(t) {
                            return t.id = this.parseIdentifier(),
                                this.checkLVal(t.id, 2, void 0, "typescript type alias"),
                                t.typeParameters = this.tsTryParseTypeParameters(),
                                t.typeAnnotation = this.tsExpectThenParseType(n.eq),
                                this.semicolon(),
                                this.finishNode(t, "TSTypeAliasDeclaration")
                        }
                        tsInNoContext(t) {
                            const e = this.state.context;
                            this.state.context = [e[0]];
                            try {
                                return t()
                            } finally {
                                this.state.context = e
                            }
                        }
                        tsInType(t) {
                            const e = this.state.inType;
                            this.state.inType = !0;
                            try {
                                return t()
                            } finally {
                                this.state.inType = e
                            }
                        }
                        tsEatThenParseType(t) {
                            return this.match(t) ? this.tsNextThenParseType() : void 0
                        }
                        tsExpectThenParseType(t) {
                            return this.tsDoThenParseType(() => this.expect(t))
                        }
                        tsNextThenParseType() {
                            return this.tsDoThenParseType(() => this.next())
                        }
                        tsDoThenParseType(t) {
                            return this.tsInType(() => (t(),
                                this.tsParseType()))
                        }
                        tsParseEnumMember() {
                            const t = this.startNode();
                            return t.id = this.match(n.string) ? this.parseExprAtom() : this.parseIdentifier(!0),
                                this.eat(n.eq) && (t.initializer = this.parseMaybeAssign()),
                                this.finishNode(t, "TSEnumMember")
                        }
                        tsParseEnumDeclaration(t, e) {
                            return e && (t.const = !0),
                                t.id = this.parseIdentifier(),
                                this.checkLVal(t.id, e ? 779 : 267, void 0, "typescript enum declaration"),
                                this.expect(n.braceL),
                                t.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)),
                                this.expect(n.braceR),
                                this.finishNode(t, "TSEnumDeclaration")
                        }
                        tsParseModuleBlock() {
                            const t = this.startNode();
                            return this.scope.enter(0),
                                this.expect(n.braceL),
                                this.parseBlockOrModuleBlockBody(t.body = [], void 0, !0, n.braceR),
                                this.scope.exit(),
                                this.finishNode(t, "TSModuleBlock")
                        }
                        tsParseModuleOrNamespaceDeclaration(t, e = !1) {
                            if (t.id = this.parseIdentifier(),
                                e || this.checkLVal(t.id, 1024, null, "module or namespace declaration"),
                                this.eat(n.dot)) {
                                const e = this.startNode();
                                this.tsParseModuleOrNamespaceDeclaration(e, !0),
                                    t.body = e
                            } else
                                this.scope.enter(128),
                                this.prodParam.enter(0),
                                t.body = this.tsParseModuleBlock(),
                                this.prodParam.exit(),
                                this.scope.exit();
                            return this.finishNode(t, "TSModuleDeclaration")
                        }
                        tsParseAmbientExternalModuleDeclaration(t) {
                            return this.isContextual("global") ? (t.global = !0,
                                    t.id = this.parseIdentifier()) : this.match(n.string) ? t.id = this.parseExprAtom() : this.unexpected(),
                                this.match(n.braceL) ? (this.scope.enter(128),
                                    this.prodParam.enter(0),
                                    t.body = this.tsParseModuleBlock(),
                                    this.prodParam.exit(),
                                    this.scope.exit()) : this.semicolon(),
                                this.finishNode(t, "TSModuleDeclaration")
                        }
                        tsParseImportEqualsDeclaration(t, e) {
                            return t.isExport = e || !1,
                                t.id = this.parseIdentifier(),
                                this.checkLVal(t.id, 9, void 0, "import equals declaration"),
                                this.expect(n.eq),
                                t.moduleReference = this.tsParseModuleReference(),
                                this.semicolon(),
                                this.finishNode(t, "TSImportEqualsDeclaration")
                        }
                        tsIsExternalModuleReference() {
                            return this.isContextual("require") && 40 === this.lookaheadCharCode()
                        }
                        tsParseModuleReference() {
                            return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1)
                        }
                        tsParseExternalModuleReference() {
                            const t = this.startNode();
                            if (this.expectContextual("require"),
                                this.expect(n.parenL), !this.match(n.string))
                                throw this.unexpected();
                            return t.expression = this.parseExprAtom(),
                                this.expect(n.parenR),
                                this.finishNode(t, "TSExternalModuleReference")
                        }
                        tsLookAhead(t) {
                            const e = this.state.clone(),
                                s = t();
                            return this.state = e,
                                s
                        }
                        tsTryParseAndCatch(t) {
                            const e = this.tryParse(e => t() || e());
                            if (!e.aborted && e.node)
                                return e.error && (this.state = e.failState),
                                    e.node
                        }
                        tsTryParse(t) {
                            const e = this.state.clone(),
                                s = t();
                            return void 0 !== s && !1 !== s ? s : void(this.state = e)
                        }
                        tsTryParseDeclare(t) {
                            if (this.isLineTerminator())
                                return;
                            let e, s = this.state.type;
                            switch (this.isContextual("let") && (s = n._var,
                                    e = "let"),
                                s) {
                                case n._function:
                                    return this.parseFunctionStatement(t, !1, !0);
                                case n._class:
                                    return t.declare = !0,
                                        this.parseClass(t, !0, !1);
                                case n._const:
                                    if (this.match(n._const) && this.isLookaheadContextual("enum"))
                                        return this.expect(n._const),
                                            this.expectContextual("enum"),
                                            this.tsParseEnumDeclaration(t, !0);
                                case n._var:
                                    return e = e || this.state.value,
                                        this.parseVarStatement(t, e);
                                case n.name:
                                    {
                                        const e = this.state.value;
                                        return "global" === e ? this.tsParseAmbientExternalModuleDeclaration(t) : this.tsParseDeclaration(t, e, !0)
                                    }
                            }
                        }
                        tsTryParseExportDeclaration() {
                            return this.tsParseDeclaration(this.startNode(), this.state.value, !0)
                        }
                        tsParseExpressionStatement(t, e) {
                            switch (e.name) {
                                case "declare":
                                    {
                                        const e = this.tsTryParseDeclare(t);
                                        if (e)
                                            return e.declare = !0,
                                                e;
                                        break
                                    }
                                case "global":
                                    if (this.match(n.braceL)) {
                                        this.scope.enter(128),
                                            this.prodParam.enter(0);
                                        const s = t;
                                        return s.global = !0,
                                            s.id = e,
                                            s.body = this.tsParseModuleBlock(),
                                            this.scope.exit(),
                                            this.prodParam.exit(),
                                            this.finishNode(s, "TSModuleDeclaration")
                                    }
                                    break;
                                default:
                                    return this.tsParseDeclaration(t, e.name, !1)
                            }
                        }
                        tsParseDeclaration(t, e, s) {
                            switch (e) {
                                case "abstract":
                                    if (this.tsCheckLineTerminatorAndMatch(n._class, s)) {
                                        const e = t;
                                        return e.abstract = !0,
                                            s && (this.next(),
                                                this.match(n._class) || this.unexpected(null, n._class)),
                                            this.parseClass(e, !0, !1)
                                    }
                                    break;
                                case "enum":
                                    if (s || this.match(n.name))
                                        return s && this.next(),
                                            this.tsParseEnumDeclaration(t, !1);
                                    break;
                                case "interface":
                                    if (this.tsCheckLineTerminatorAndMatch(n.name, s))
                                        return s && this.next(),
                                            this.tsParseInterfaceDeclaration(t);
                                    break;
                                case "module":
                                    if (s && this.next(),
                                        this.match(n.string))
                                        return this.tsParseAmbientExternalModuleDeclaration(t);
                                    if (this.tsCheckLineTerminatorAndMatch(n.name, s))
                                        return this.tsParseModuleOrNamespaceDeclaration(t);
                                    break;
                                case "namespace":
                                    if (this.tsCheckLineTerminatorAndMatch(n.name, s))
                                        return s && this.next(),
                                            this.tsParseModuleOrNamespaceDeclaration(t);
                                    break;
                                case "type":
                                    if (this.tsCheckLineTerminatorAndMatch(n.name, s))
                                        return s && this.next(),
                                            this.tsParseTypeAliasDeclaration(t)
                            }
                        }
                        tsCheckLineTerminatorAndMatch(t, e) {
                            return (e || this.match(t)) && !this.isLineTerminator()
                        }
                        tsTryParseGenericAsyncArrowFunction(t, e) {
                            if (!this.isRelational("<"))
                                return;
                            const s = this.state.maybeInArrowParameters,
                                i = this.state.yieldPos,
                                r = this.state.awaitPos;
                            this.state.maybeInArrowParameters = !0,
                                this.state.yieldPos = -1,
                                this.state.awaitPos = -1;
                            const a = this.tsTryParseAndCatch(() => {
                                const s = this.startNodeAt(t, e);
                                return s.typeParameters = this.tsParseTypeParameters(),
                                    super.parseFunctionParams(s),
                                    s.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(),
                                    this.expect(n.arrow),
                                    s
                            });
                            return this.state.maybeInArrowParameters = s,
                                this.state.yieldPos = i,
                                this.state.awaitPos = r,
                                a ? this.parseArrowExpression(a, null, !0) : void 0
                        }
                        tsParseTypeArguments() {
                            const t = this.startNode();
                            return t.params = this.tsInType(() => this.tsInNoContext(() => (this.expectRelational("<"),
                                    this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))),
                                this.state.exprAllowed = !1,
                                this.expectRelational(">"),
                                this.finishNode(t, "TSTypeParameterInstantiation")
                        }
                        tsIsDeclarationStart() {
                            if (this.match(n.name))
                                switch (this.state.value) {
                                    case "abstract":
                                    case "declare":
                                    case "enum":
                                    case "interface":
                                    case "module":
                                    case "namespace":
                                    case "type":
                                        return !0
                                }
                            return !1
                        }
                        isExportDefaultSpecifier() {
                            return !this.tsIsDeclarationStart() && super.isExportDefaultSpecifier()
                        }
                        parseAssignableListItem(t, e) {
                            const s = this.state.start,
                                i = this.state.startLoc;
                            let r, a = !1;
                            t && (r = this.parseAccessModifier(),
                                a = !!this.tsParseModifier(["readonly"]));
                            const n = this.parseMaybeDefault();
                            this.parseAssignableListItemTypes(n);
                            const o = this.parseMaybeDefault(n.start, n.loc.start, n);
                            if (r || a) {
                                const t = this.startNodeAt(s, i);
                                return e.length && (t.decorators = e),
                                    r && (t.accessibility = r),
                                    a && (t.readonly = a),
                                    "Identifier" !== o.type && "AssignmentPattern" !== o.type && this.raise(t.start, rt.UnsupportedParameterPropertyKind),
                                    t.parameter = o,
                                    this.finishNode(t, "TSParameterProperty")
                            }
                            return e.length && (n.decorators = e),
                                o
                        }
                        parseFunctionBodyAndFinish(t, e, s = !1) {
                            this.match(n.colon) && (t.returnType = this.tsParseTypeOrTypePredicateAnnotation(n.colon));
                            const i = "FunctionDeclaration" === e ? "TSDeclareFunction" : "ClassMethod" === e ? "TSDeclareMethod" : void 0;
                            i && !this.match(n.braceL) && this.isLineTerminator() ? this.finishNode(t, i) : super.parseFunctionBodyAndFinish(t, e, s)
                        }
                        registerFunctionStatementId(t) {
                            !t.body && t.id ? this.checkLVal(t.id, 1024, null, "function name") : super.registerFunctionStatementId(...arguments)
                        }
                        parseSubscript(t, e, s, i, r) {
                            if (!this.hasPrecedingLineBreak() && this.match(n.bang)) {
                                this.state.exprAllowed = !1,
                                    this.next();
                                const i = this.startNodeAt(e, s);
                                return i.expression = t,
                                    this.finishNode(i, "TSNonNullExpression")
                            }
                            if (this.isRelational("<")) {
                                const a = this.tsTryParseAndCatch(() => {
                                    if (!i && this.atPossibleAsyncArrow(t)) {
                                        const t = this.tsTryParseGenericAsyncArrowFunction(e, s);
                                        if (t)
                                            return t
                                    }
                                    const a = this.startNodeAt(e, s);
                                    a.callee = t;
                                    const o = this.tsParseTypeArguments();
                                    if (o) {
                                        if (!i && this.eat(n.parenL))
                                            return a.arguments = this.parseCallExpressionArguments(n.parenR, !1),
                                                a.typeParameters = o,
                                                this.finishCallExpression(a, r.optionalChainMember);
                                        if (this.match(n.backQuote))
                                            return this.parseTaggedTemplateExpression(e, s, t, r, o)
                                    }
                                    this.unexpected()
                                });
                                if (a)
                                    return a
                            }
                            return super.parseSubscript(t, e, s, i, r)
                        }
                        parseNewArguments(t) {
                            if (this.isRelational("<")) {
                                const e = this.tsTryParseAndCatch(() => {
                                    const t = this.tsParseTypeArguments();
                                    return this.match(n.parenL) || this.unexpected(),
                                        t
                                });
                                e && (t.typeParameters = e)
                            }
                            super.parseNewArguments(t)
                        }
                        parseExprOp(t, e, s, i, r) {
                            if (st(n._in.binop) > i && !this.hasPrecedingLineBreak() && this.isContextual("as")) {
                                const a = this.startNodeAt(e, s);
                                a.expression = t;
                                const n = this.tsTryNextParseConstantContext();
                                return a.typeAnnotation = n || this.tsNextThenParseType(),
                                    this.finishNode(a, "TSAsExpression"),
                                    this.parseExprOp(a, e, s, i, r)
                            }
                            return super.parseExprOp(t, e, s, i, r)
                        }
                        checkReservedWord(t, e, s, i) {}
                        checkDuplicateExports() {}
                        parseImport(t) {
                            if (this.match(n.name) || this.match(n.star) || this.match(n.braceL)) {
                                const e = this.lookahead();
                                if (this.match(n.name) && e.type === n.eq)
                                    return this.tsParseImportEqualsDeclaration(t);
                                !this.isContextual("type") || e.type === n.comma || e.type === n.name && "from" === e.value ? t.importKind = "value" : (t.importKind = "type",
                                    this.next())
                            }
                            const e = super.parseImport(t);
                            return "type" === e.importKind && e.specifiers.length > 1 && "ImportDefaultSpecifier" === e.specifiers[0].type && this.raise(e.start, "A type-only import can specify a default import or named bindings, but not both."),
                                e
                        }
                        parseExport(t) {
                            if (this.match(n._import))
                                return this.expect(n._import),
                                    this.tsParseImportEqualsDeclaration(t, !0);
                            if (this.eat(n.eq)) {
                                const e = t;
                                return e.expression = this.parseExpression(),
                                    this.semicolon(),
                                    this.finishNode(e, "TSExportAssignment")
                            }
                            if (this.eatContextual("as")) {
                                const e = t;
                                return this.expectContextual("namespace"),
                                    e.id = this.parseIdentifier(),
                                    this.semicolon(),
                                    this.finishNode(e, "TSNamespaceExportDeclaration")
                            }
                            return this.isContextual("type") && this.lookahead().type === n.braceL ? (this.next(),
                                    t.exportKind = "type") : t.exportKind = "value",
                                super.parseExport(t)
                        }
                        isAbstractClass() {
                            return this.isContextual("abstract") && this.lookahead().type === n._class
                        }
                        parseExportDefaultExpression() {
                            if (this.isAbstractClass()) {
                                const t = this.startNode();
                                return this.next(),
                                    this.parseClass(t, !0, !0),
                                    t.abstract = !0,
                                    t
                            }
                            if ("interface" === this.state.value) {
                                const t = this.tsParseDeclaration(this.startNode(), this.state.value, !0);
                                if (t)
                                    return t
                            }
                            return super.parseExportDefaultExpression()
                        }
                        parseStatementContent(t, e) {
                            if (this.state.type === n._const) {
                                const t = this.lookahead();
                                if (t.type === n.name && "enum" === t.value) {
                                    const t = this.startNode();
                                    return this.expect(n._const),
                                        this.expectContextual("enum"),
                                        this.tsParseEnumDeclaration(t, !0)
                                }
                            }
                            return super.parseStatementContent(t, e)
                        }
                        parseAccessModifier() {
                            return this.tsParseModifier(["public", "protected", "private"])
                        }
                        parseClassMember(t, e, s, i) {
                            this.tsParseModifiers(e, ["declare"]);
                            const r = this.parseAccessModifier();
                            r && (e.accessibility = r),
                                this.tsParseModifiers(e, ["declare"]),
                                super.parseClassMember(t, e, s, i)
                        }
                        parseClassMemberWithIsStatic(t, e, s, i, r) {
                            this.tsParseModifiers(e, ["abstract", "readonly", "declare"]);
                            const a = this.tsTryParseIndexSignature(e);
                            if (a)
                                return t.body.push(a),
                                    e.abstract && this.raise(e.start, rt.IndexSignatureHasAbstract),
                                    i && this.raise(e.start, rt.IndexSignatureHasStatic),
                                    void(e.accessibility && this.raise(e.start, rt.IndexSignatureHasAccessibility, e.accessibility));
                            super.parseClassMemberWithIsStatic(t, e, s, i, r)
                        }
                        parsePostMemberNameModifiers(t) {
                            this.eat(n.question) && (t.optional = !0),
                                t.readonly && this.match(n.parenL) && this.raise(t.start, rt.ClassMethodHasReadonly),
                                t.declare && this.match(n.parenL) && this.raise(t.start, rt.ClassMethodHasDeclare)
                        }
                        parseExpressionStatement(t, e) {
                            return ("Identifier" === e.type ? this.tsParseExpressionStatement(t, e) : void 0) || super.parseExpressionStatement(t, e)
                        }
                        shouldParseExportDeclaration() {
                            return !!this.tsIsDeclarationStart() || super.shouldParseExportDeclaration()
                        }
                        parseConditional(t, e, s, i, r) {
                            if (!r || !this.match(n.question))
                                return super.parseConditional(t, e, s, i, r);
                            const a = this.tryParse(() => super.parseConditional(t, e, s, i));
                            return a.node ? (a.error && (this.state = a.failState),
                                a.node) : (r.start = a.error.pos || this.state.start,
                                t)
                        }
                        parseParenItem(t, e, s) {
                            if (t = super.parseParenItem(t, e, s),
                                this.eat(n.question) && (t.optional = !0,
                                    this.resetEndLocation(t)),
                                this.match(n.colon)) {
                                const i = this.startNodeAt(e, s);
                                return i.expression = t,
                                    i.typeAnnotation = this.tsParseTypeAnnotation(),
                                    this.finishNode(i, "TSTypeCastExpression")
                            }
                            return t
                        }
                        parseExportDeclaration(t) {
                            const e = this.state.start,
                                s = this.state.startLoc,
                                i = this.eatContextual("declare");
                            let r;
                            return this.match(n.name) && (r = this.tsTryParseExportDeclaration()),
                                r || (r = super.parseExportDeclaration(t)),
                                r && ("TSInterfaceDeclaration" === r.type || "TSTypeAliasDeclaration" === r.type || i) && (t.exportKind = "type"),
                                r && i && (this.resetStartLocation(r, e, s),
                                    r.declare = !0),
                                r
                        }
                        parseClassId(t, e, s) {
                            if ((!e || s) && this.isContextual("implements"))
                                return;
                            super.parseClassId(t, e, s, t.declare ? 1024 : 139);
                            const i = this.tsTryParseTypeParameters();
                            i && (t.typeParameters = i)
                        }
                        parseClassPropertyAnnotation(t) {
                            !t.optional && this.eat(n.bang) && (t.definite = !0);
                            const e = this.tsTryParseTypeAnnotation();
                            e && (t.typeAnnotation = e)
                        }
                        parseClassProperty(t) {
                            return this.parseClassPropertyAnnotation(t),
                                t.declare && this.match(n.equal) && this.raise(this.state.start, rt.DeclareClassFieldHasInitializer),
                                super.parseClassProperty(t)
                        }
                        parseClassPrivateProperty(t) {
                            return t.abstract && this.raise(t.start, rt.PrivateElementHasAbstract),
                                t.accessibility && this.raise(t.start, rt.PrivateElementHasAccessibility, t.accessibility),
                                this.parseClassPropertyAnnotation(t),
                                super.parseClassPrivateProperty(t)
                        }
                        pushClassMethod(t, e, s, i, r, a) {
                            const n = this.tsTryParseTypeParameters();
                            n && (e.typeParameters = n),
                                super.pushClassMethod(t, e, s, i, r, a)
                        }
                        pushClassPrivateMethod(t, e, s, i) {
                            const r = this.tsTryParseTypeParameters();
                            r && (e.typeParameters = r),
                                super.pushClassPrivateMethod(t, e, s, i)
                        }
                        parseClassSuper(t) {
                            super.parseClassSuper(t),
                                t.superClass && this.isRelational("<") && (t.superTypeParameters = this.tsParseTypeArguments()),
                                this.eatContextual("implements") && (t.implements = this.tsParseHeritageClause("implements"))
                        }
                        parseObjPropValue(t, ...e) {
                            const s = this.tsTryParseTypeParameters();
                            s && (t.typeParameters = s),
                                super.parseObjPropValue(t, ...e)
                        }
                        parseFunctionParams(t, e) {
                            const s = this.tsTryParseTypeParameters();
                            s && (t.typeParameters = s),
                                super.parseFunctionParams(t, e)
                        }
                        parseVarId(t, e) {
                            super.parseVarId(t, e),
                                "Identifier" === t.id.type && this.eat(n.bang) && (t.definite = !0);
                            const s = this.tsTryParseTypeAnnotation();
                            s && (t.id.typeAnnotation = s,
                                this.resetEndLocation(t.id))
                        }
                        parseAsyncArrowFromCallExpression(t, e) {
                            return this.match(n.colon) && (t.returnType = this.tsParseTypeAnnotation()),
                                super.parseAsyncArrowFromCallExpression(t, e)
                        }
                        parseMaybeAssign(...t) {
                            let e, s, i, r;
                            if (this.match(n.jsxTagStart)) {
                                if (e = this.state.clone(),
                                    s = this.tryParse(() => super.parseMaybeAssign(...t), e), !s.error)
                                    return s.node;
                                const { context: i } = this.state;
                                i[i.length - 1] === x.j_oTag ? i.length -= 2 : i[i.length - 1] === x.j_expr && (i.length -= 1)
                            }
                            if (!(s && s.error || this.isRelational("<")))
                                return super.parseMaybeAssign(...t);
                            e = e || this.state.clone();
                            const a = this.tryParse(e => {
                                r = this.tsParseTypeParameters();
                                const s = super.parseMaybeAssign(...t);
                                return ("ArrowFunctionExpression" !== s.type || s.extra && s.extra.parenthesized) && e(),
                                    r && 0 !== r.params.length && this.resetStartLocationFromNode(s, r),
                                    s.typeParameters = r,
                                    s
                            }, e);
                            if (!a.error && !a.aborted)
                                return a.node;
                            if (!s && (it(!this.hasPlugin("jsx")),
                                    i = this.tryParse(() => super.parseMaybeAssign(...t), e), !i.error))
                                return i.node;
                            if (s && s.node)
                                return this.state = s.failState,
                                    s.node;
                            if (a.node)
                                return this.state = a.failState,
                                    a.node;
                            if (i && i.node)
                                return this.state = i.failState,
                                    i.node;
                            if (s && s.thrown)
                                throw s.error;
                            if (a.thrown)
                                throw a.error;
                            if (i && i.thrown)
                                throw i.error;
                            throw s && s.error || a.error || i && i.error
                        }
                        parseMaybeUnary(t) {
                            return !this.hasPlugin("jsx") && this.isRelational("<") ? this.tsParseTypeAssertion() : super.parseMaybeUnary(t)
                        }
                        parseArrow(t) {
                            if (this.match(n.colon)) {
                                const e = this.tryParse(t => {
                                    const e = this.tsParseTypeOrTypePredicateAnnotation(n.colon);
                                    return !this.canInsertSemicolon() && this.match(n.arrow) || t(),
                                        e
                                });
                                if (e.aborted)
                                    return;
                                e.thrown || (e.error && (this.state = e.failState),
                                    t.returnType = e.node)
                            }
                            return super.parseArrow(t)
                        }
                        parseAssignableListItemTypes(t) {
                            this.eat(n.question) && ("Identifier" !== t.type && this.raise(t.start, rt.PatternIsOptional),
                                t.optional = !0);
                            const e = this.tsTryParseTypeAnnotation();
                            return e && (t.typeAnnotation = e),
                                this.resetEndLocation(t),
                                t
                        }
                        toAssignable(t) {
                            switch (t.type) {
                                case "TSTypeCastExpression":
                                    return super.toAssignable(this.typeCastToParameter(t));
                                case "TSParameterProperty":
                                    return super.toAssignable(t);
                                case "TSAsExpression":
                                case "TSNonNullExpression":
                                case "TSTypeAssertion":
                                    return t.expression = this.toAssignable(t.expression),
                                        t;
                                default:
                                    return super.toAssignable(t)
                            }
                        }
                        checkLVal(t, e = 64, s, i) {
                            switch (t.type) {
                                case "TSTypeCastExpression":
                                    return;
                                case "TSParameterProperty":
                                    return void this.checkLVal(t.parameter, e, s, "parameter property");
                                case "TSAsExpression":
                                case "TSNonNullExpression":
                                case "TSTypeAssertion":
                                    return void this.checkLVal(t.expression, e, s, i);
                                default:
                                    return void super.checkLVal(t, e, s, i)
                            }
                        }
                        parseBindingAtom() {
                            switch (this.state.type) {
                                case n._this:
                                    return this.parseIdentifier(!0);
                                default:
                                    return super.parseBindingAtom()
                            }
                        }
                        parseMaybeDecoratorArguments(t) {
                            if (this.isRelational("<")) {
                                const e = this.tsParseTypeArguments();
                                if (this.match(n.parenL)) {
                                    const s = super.parseMaybeDecoratorArguments(t);
                                    return s.typeParameters = e,
                                        s
                                }
                                this.unexpected(this.state.start, n.parenL)
                            }
                            return super.parseMaybeDecoratorArguments(t)
                        }
                        isClassMethod() {
                            return this.isRelational("<") || super.isClassMethod()
                        }
                        isClassProperty() {
                            return this.match(n.bang) || this.match(n.colon) || super.isClassProperty()
                        }
                        parseMaybeDefault(...t) {
                            const e = super.parseMaybeDefault(...t);
                            return "AssignmentPattern" === e.type && e.typeAnnotation && e.right.start < e.typeAnnotation.start && this.raise(e.typeAnnotation.start, rt.TypeAnnotationAfterAssign),
                                e
                        }
                        getTokenFromCode(t) {
                            return !this.state.inType || 62 !== t && 60 !== t ? super.getTokenFromCode(t) : this.finishOp(n.relational, 1)
                        }
                        toAssignableList(t) {
                            for (let e = 0; e < t.length; e++) {
                                const s = t[e];
                                if (s)
                                    switch (s.type) {
                                        case "TSTypeCastExpression":
                                            t[e] = this.typeCastToParameter(s);
                                            break;
                                        case "TSAsExpression":
                                        case "TSTypeAssertion":
                                            this.state.maybeInArrowParameters ? this.raise(s.start, rt.UnexpectedTypeCastInParameter) : t[e] = this.typeCastToParameter(s)
                                    }
                            }
                            return super.toAssignableList(...arguments)
                        }
                        typeCastToParameter(t) {
                            return t.expression.typeAnnotation = t.typeAnnotation,
                                this.resetEndLocation(t.expression, t.typeAnnotation.end, t.typeAnnotation.loc.end),
                                t.expression
                        }
                        toReferencedList(t, e) {
                            for (let e = 0; e < t.length; e++) {
                                const s = t[e];
                                s && "TSTypeCastExpression" === s.type && this.raise(s.start, rt.UnexpectedTypeAnnotation)
                            }
                            return t
                        }
                        shouldParseArrow() {
                            return this.match(n.colon) || super.shouldParseArrow()
                        }
                        shouldParseAsyncArrow() {
                            return this.match(n.colon) || super.shouldParseAsyncArrow()
                        }
                        canHaveLeadingDecorator() {
                            return super.canHaveLeadingDecorator() || this.isAbstractClass()
                        }
                        jsxParseOpeningElementAfterName(t) {
                            if (this.isRelational("<")) {
                                const e = this.tsTryParseAndCatch(() => this.tsParseTypeArguments());
                                e && (t.typeParameters = e)
                            }
                            return super.jsxParseOpeningElementAfterName(t)
                        }
                        getGetterSetterExpectedParamCount(t) {
                            const e = super.getGetterSetterExpectedParamCount(t),
                                s = t.params[0];
                            return s && "Identifier" === s.type && "this" === s.name ? e + 1 : e
                        }
                    },
                    v8intrinsic: t => class extends t {
                        parseV8Intrinsic() {
                            if (this.match(n.modulo)) {
                                const t = this.state.start,
                                    e = this.startNode();
                                if (this.eat(n.modulo),
                                    this.match(n.name)) {
                                    const t = this.parseIdentifierName(this.state.start),
                                        s = this.createIdentifier(e, t);
                                    if (s.type = "V8IntrinsicIdentifier",
                                        this.match(n.parenL))
                                        return s
                                }
                                this.unexpected(t)
                            }
                        }
                        parseExprAtom() {
                            return this.parseV8Intrinsic() || super.parseExprAtom(...arguments)
                        }
                    },
                    placeholders: t => class extends t {
                        parsePlaceholder(t) {
                            if (this.match(n.placeholder)) {
                                const e = this.startNode();
                                return this.next(),
                                    this.assertNoSpace("Unexpected space in placeholder."),
                                    e.name = super.parseIdentifier(!0),
                                    this.assertNoSpace("Unexpected space in placeholder."),
                                    this.expect(n.placeholder),
                                    this.finishPlaceholder(e, t)
                            }
                        }
                        finishPlaceholder(t, e) {
                            const s = !(!t.expectedNode || "Placeholder" !== t.type);
                            return t.expectedNode = e,
                                s ? t : this.finishNode(t, "Placeholder")
                        }
                        getTokenFromCode(t) {
                            return 37 === t && 37 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(n.placeholder, 2) : super.getTokenFromCode(...arguments)
                        }
                        parseExprAtom() {
                            return this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments)
                        }
                        parseIdentifier() {
                            return this.parsePlaceholder("Identifier") || super.parseIdentifier(...arguments)
                        }
                        checkReservedWord(t) {
                            void 0 !== t && super.checkReservedWord(...arguments)
                        }
                        parseBindingAtom() {
                            return this.parsePlaceholder("Pattern") || super.parseBindingAtom(...arguments)
                        }
                        checkLVal(t) {
                            "Placeholder" !== t.type && super.checkLVal(...arguments)
                        }
                        toAssignable(t) {
                            return t && "Placeholder" === t.type && "Expression" === t.expectedNode ? (t.expectedNode = "Pattern",
                                t) : super.toAssignable(...arguments)
                        }
                        verifyBreakContinue(t) {
                            t.label && "Placeholder" === t.label.type || super.verifyBreakContinue(...arguments)
                        }
                        parseExpressionStatement(t, e) {
                            if ("Placeholder" !== e.type || e.extra && e.extra.parenthesized)
                                return super.parseExpressionStatement(...arguments);
                            if (this.match(n.colon)) {
                                const s = t;
                                return s.label = this.finishPlaceholder(e, "Identifier"),
                                    this.next(),
                                    s.body = this.parseStatement("label"),
                                    this.finishNode(s, "LabeledStatement")
                            }
                            return this.semicolon(),
                                t.name = e.name,
                                this.finishPlaceholder(t, "Statement")
                        }
                        parseBlock() {
                            return this.parsePlaceholder("BlockStatement") || super.parseBlock(...arguments)
                        }
                        parseFunctionId() {
                            return this.parsePlaceholder("Identifier") || super.parseFunctionId(...arguments)
                        }
                        parseClass(t, e, s) {
                            const i = e ? "ClassDeclaration" : "ClassExpression";
                            this.next(),
                                this.takeDecorators(t);
                            const r = this.parsePlaceholder("Identifier");
                            if (r)
                                if (this.match(n._extends) || this.match(n.placeholder) || this.match(n.braceL))
                                    t.id = r;
                                else {
                                    if (s || !e)
                                        return t.id = null,
                                            t.body = this.finishPlaceholder(r, "ClassBody"),
                                            this.finishNode(t, i);
                                    this.unexpected(null, "A class name is required")
                                }
                            else
                                this.parseClassId(t, e, s);
                            return this.parseClassSuper(t),
                                t.body = this.parsePlaceholder("ClassBody") || this.parseClassBody(!!t.superClass),
                                this.finishNode(t, i)
                        }
                        parseExport(t) {
                            const e = this.parsePlaceholder("Identifier");
                            if (!e)
                                return super.parseExport(...arguments);
                            if (!this.isContextual("from") && !this.match(n.comma))
                                return t.specifiers = [],
                                    t.source = null,
                                    t.declaration = this.finishPlaceholder(e, "Declaration"),
                                    this.finishNode(t, "ExportNamedDeclaration");
                            this.expectPlugin("exportDefaultFrom");
                            const s = this.startNode();
                            return s.exported = e,
                                t.specifiers = [this.finishNode(s, "ExportDefaultSpecifier")],
                                super.parseExport(t)
                        }
                        maybeParseExportDefaultSpecifier(t) {
                            return !!(t.specifiers && t.specifiers.length > 0) || super.maybeParseExportDefaultSpecifier(...arguments)
                        }
                        checkExport(t) {
                            const { specifiers: e } = t;
                            e && e.length && (t.specifiers = e.filter(t => "Placeholder" === t.exported.type)),
                                super.checkExport(t),
                                t.specifiers = e
                        }
                        parseImport(t) {
                            const e = this.parsePlaceholder("Identifier");
                            if (!e)
                                return super.parseImport(...arguments);
                            if (t.specifiers = [], !this.isContextual("from") && !this.match(n.comma))
                                return t.source = this.finishPlaceholder(e, "StringLiteral"),
                                    this.semicolon(),
                                    this.finishNode(t, "ImportDeclaration");
                            const s = this.startNodeAtNode(e);
                            if (s.local = e,
                                this.finishNode(s, "ImportDefaultSpecifier"),
                                t.specifiers.push(s),
                                this.eat(n.comma)) {
                                this.maybeParseStarImportSpecifier(t) || this.parseNamedImportSpecifiers(t)
                            }
                            return this.expectContextual("from"),
                                t.source = this.parseImportSource(),
                                this.semicolon(),
                                this.finishNode(t, "ImportDeclaration")
                        }
                        parseImportSource() {
                            return this.parsePlaceholder("StringLiteral") || super.parseImportSource(...arguments)
                        }
                    }
                },
                ct = Object.keys(pt),
                ut = {
                    sourceType: "script",
                    sourceFilename: void 0,
                    startLine: 1,
                    allowAwaitOutsideFunction: !1,
                    allowReturnOutsideFunction: !1,
                    allowImportExportEverywhere: !1,
                    allowSuperOutsideMethod: !1,
                    allowUndeclaredExports: !1,
                    plugins: [],
                    strictMode: null,
                    ranges: !1,
                    tokens: !1,
                    createParenthesizedExpressions: !1,
                    errorRecovery: !1
                };
            class lt {
                constructor() {
                    this.errors = [],
                        this.potentialArrowAt = -1,
                        this.noArrowAt = [],
                        this.noArrowParamsConversionAt = [],
                        this.inParameters = !1,
                        this.maybeInArrowParameters = !1,
                        this.maybeInAsyncArrowHead = !1,
                        this.inPipeline = !1,
                        this.inType = !1,
                        this.noAnonFunctionType = !1,
                        this.inPropertyName = !1,
                        this.hasFlowComment = !1,
                        this.isIterator = !1,
                        this.topicContext = {
                            maxNumOfResolvableTopics: 0,
                            maxTopicIndex: null
                        },
                        this.soloAwait = !1,
                        this.inFSharpPipelineDirectBody = !1,
                        this.labels = [],
                        this.decoratorStack = [
                            []
                        ],
                        this.yieldPos = -1,
                        this.awaitPos = -1,
                        this.comments = [],
                        this.trailingComments = [],
                        this.leadingComments = [],
                        this.commentStack = [],
                        this.commentPreviousNode = null,
                        this.pos = 0,
                        this.lineStart = 0,
                        this.type = n.eof,
                        this.value = null,
                        this.start = 0,
                        this.end = 0,
                        this.lastTokEndLoc = null,
                        this.lastTokStartLoc = null,
                        this.lastTokStart = 0,
                        this.lastTokEnd = 0,
                        this.context = [x.braceStatement],
                        this.exprAllowed = !0,
                        this.containsEsc = !1,
                        this.octalPositions = [],
                        this.exportedIdentifiers = [],
                        this.tokensLength = 0
                }
                init(t) {
                    this.strict = !1 !== t.strictMode && "module" === t.sourceType,
                        this.curLine = t.startLine,
                        this.startLoc = this.endLoc = this.curPosition()
                }
                curPosition() {
                    return new l(this.curLine, this.pos - this.lineStart)
                }
                clone(t) {
                    const e = new lt,
                        s = Object.keys(this);
                    for (let i = 0, r = s.length; i < r; i++) {
                        const r = s[i];
                        let a = this[r];
                        !t && Array.isArray(a) && (a = a.slice()),
                            e[r] = a
                    }
                    return e
                }
            }
            var dt = function(t) {
                return t >= 48 && t <= 57
            };
            const mt = new Set(["g", "m", "s", "i", "y", "u"]),
                ft = {
                    decBinOct: [46, 66, 69, 79, 95, 98, 101, 111],
                    hex: [46, 88, 95, 120]
                },
                Dt = {
                    bin: [48, 49]
                };
            Dt.oct = [...Dt.bin, 50, 51, 52, 53, 54, 55],
                Dt.dec = [...Dt.oct, 56, 57],
                Dt.hex = [...Dt.dec, 65, 66, 67, 68, 69, 70, 97, 98, 99, 100, 101, 102];
            class yt {
                constructor(t) {
                    this.type = t.type,
                        this.value = t.value,
                        this.start = t.start,
                        this.end = t.end,
                        this.loc = new d(t.startLoc, t.endLoc)
                }
            }
            class xt {
                constructor() {
                    this.shorthandAssign = -1,
                        this.doubleProto = -1
                }
            }
            class gt {
                constructor(t, e, s) {
                    this.type = "",
                        this.start = e,
                        this.end = 0,
                        this.loc = new d(s),
                        t && t.options.ranges && (this.range = [e, 0]),
                        t && t.filename && (this.loc.filename = t.filename)
                }
                __clone() {
                    const t = new gt,
                        e = Object.keys(this);
                    for (let s = 0, i = e.length; s < i; s++) {
                        const i = e[s];
                        "leadingComments" !== i && "trailingComments" !== i && "innerComments" !== i && (t[i] = this[i])
                    }
                    return t
                }
            }
            const Pt = t => "ParenthesizedExpression" === t.type ? Pt(t.expression) : t;
            const Et = {
                    kind: "loop"
                },
                Ct = {
                    kind: "switch"
                };
            class bt {
                constructor() {
                    this.privateNames = new Set,
                        this.loneAccessors = new Map,
                        this.undefinedPrivateNames = new Map
                }
            }
            class Tt {
                constructor(t) {
                    this.stack = [],
                        this.undefinedPrivateNames = new Map,
                        this.raise = t
                }
                current() {
                    return this.stack[this.stack.length - 1]
                }
                enter() {
                    this.stack.push(new bt)
                }
                exit() {
                    const t = this.stack.pop(),
                        e = this.current();
                    for (let s = 0, i = Array.from(t.undefinedPrivateNames); s < i.length; s++) {
                        const [t, r] = i[s];
                        e ? e.undefinedPrivateNames.has(t) || e.undefinedPrivateNames.set(t, r) : this.raise(r, f.InvalidPrivateFieldResolution, t)
                    }
                }
                declarePrivateName(t, e, s) {
                    const i = this.current();
                    let r = i.privateNames.has(t);
                    if (3 & e) {
                        const s = r && i.loneAccessors.get(t);
                        if (s) {
                            const a = 4 & s,
                                n = 4 & e;
                            r = (3 & s) === (3 & e) || a !== n,
                                r || i.loneAccessors.delete(t)
                        } else
                            r || i.loneAccessors.set(t, e)
                    }
                    r && this.raise(s, f.PrivateNameRedeclaration, t),
                        i.privateNames.add(t),
                        i.undefinedPrivateNames.delete(t)
                }
                usePrivateName(t, e) {
                    let s;
                    for (let e = 0, i = this.stack; e < i.length; e++)
                        if (s = i[e],
                            s.privateNames.has(t))
                            return;
                    s ? s.undefinedPrivateNames.set(t, e) : this.raise(e, f.InvalidPrivateFieldResolution, t)
                }
            }
            class At extends class extends class extends class extends class extends class extends class extends class extends class extends class {
                constructor() {
                    this.sawUnambiguousESM = !1,
                        this.ambiguousScriptDifferentAst = !1
                }
                hasPlugin(t) {
                    return this.plugins.has(t)
                }
                getPluginOption(t, e) {
                    if (this.hasPlugin(t))
                        return this.plugins.get(t)[e]
                }
            } {
                addComment(t) {
                    this.filename && (t.loc.filename = this.filename),
                        this.state.trailingComments.push(t),
                        this.state.leadingComments.push(t)
                }
                adjustCommentsAfterTrailingComma(t, e, s) {
                    if (0 === this.state.leadingComments.length)
                        return;
                    let i = null,
                        r = e.length;
                    for (; null === i && r > 0;)
                        i = e[--r];
                    if (null === i)
                        return;
                    for (let t = 0; t < this.state.leadingComments.length; t++)
                        this.state.leadingComments[t].end < this.state.commentPreviousNode.end && (this.state.leadingComments.splice(t, 1),
                            t--);
                    const a = [];
                    for (let e = 0; e < this.state.leadingComments.length; e++) {
                        const i = this.state.leadingComments[e];
                        i.end < t.end ? (a.push(i),
                            s || (this.state.leadingComments.splice(e, 1),
                                e--)) : (void 0 === t.trailingComments && (t.trailingComments = []),
                            t.trailingComments.push(i))
                    }
                    s && (this.state.leadingComments = []),
                        a.length > 0 ? i.trailingComments = a : void 0 !== i.trailingComments && (i.trailingComments = [])
                }
                processComment(t) {
                    if ("Program" === t.type && t.body.length > 0)
                        return;
                    const e = this.state.commentStack;
                    let s, i, r, a, n;
                    if (this.state.trailingComments.length > 0)
                        this.state.trailingComments[0].start >= t.end ? (r = this.state.trailingComments,
                            this.state.trailingComments = []) : this.state.trailingComments.length = 0;
                    else if (e.length > 0) {
                        const s = m(e);
                        s.trailingComments && s.trailingComments[0].start >= t.end && (r = s.trailingComments,
                            delete s.trailingComments)
                    }
                    for (e.length > 0 && m(e).start >= t.start && (s = e.pop()); e.length > 0 && m(e).start >= t.start;)
                        i = e.pop();
                    if (!i && s && (i = s),
                        s)
                        switch (t.type) {
                            case "ObjectExpression":
                                this.adjustCommentsAfterTrailingComma(t, t.properties);
                                break;
                            case "ObjectPattern":
                                this.adjustCommentsAfterTrailingComma(t, t.properties, !0);
                                break;
                            case "CallExpression":
                                this.adjustCommentsAfterTrailingComma(t, t.arguments);
                                break;
                            case "ArrayExpression":
                                this.adjustCommentsAfterTrailingComma(t, t.elements);
                                break;
                            case "ArrayPattern":
                                this.adjustCommentsAfterTrailingComma(t, t.elements, !0)
                        }
                    else
                        this.state.commentPreviousNode && ("ImportSpecifier" === this.state.commentPreviousNode.type && "ImportSpecifier" !== t.type || "ExportSpecifier" === this.state.commentPreviousNode.type && "ExportSpecifier" !== t.type) && this.adjustCommentsAfterTrailingComma(t, [this.state.commentPreviousNode]);
                    if (i) {
                        if (i.leadingComments)
                            if (i !== t && i.leadingComments.length > 0 && m(i.leadingComments).end <= t.start)
                                t.leadingComments = i.leadingComments,
                                delete i.leadingComments;
                            else
                                for (a = i.leadingComments.length - 2; a >= 0; --a)
                                    if (i.leadingComments[a].end <= t.start) {
                                        t.leadingComments = i.leadingComments.splice(0, a + 1);
                                        break
                                    }
                    } else if (this.state.leadingComments.length > 0)
                        if (m(this.state.leadingComments).end <= t.start) {
                            if (this.state.commentPreviousNode)
                                for (n = 0; n < this.state.leadingComments.length; n++)
                                    this.state.leadingComments[n].end < this.state.commentPreviousNode.end && (this.state.leadingComments.splice(n, 1),
                                        n--);
                            this.state.leadingComments.length > 0 && (t.leadingComments = this.state.leadingComments,
                                this.state.leadingComments = [])
                        } else {
                            for (a = 0; a < this.state.leadingComments.length && !(this.state.leadingComments[a].end > t.start); a++)
                            ;
                            const e = this.state.leadingComments.slice(0, a);
                            e.length && (t.leadingComments = e),
                                r = this.state.leadingComments.slice(a),
                                0 === r.length && (r = null)
                        }
                    this.state.commentPreviousNode = t,
                        r && (r.length && r[0].start >= t.start && m(r).end <= t.end ? t.innerComments = r : t.trailingComments = r),
                        e.push(t)
                }
            } {
                getLocationForPosition(t) {
                    let e;
                    return e = t === this.state.start ? this.state.startLoc : t === this.state.lastTokStart ? this.state.lastTokStartLoc : t === this.state.end ? this.state.endLoc : t === this.state.lastTokEnd ? this.state.lastTokEndLoc : function(t, e) {
                            let s, i = 1,
                                r = 0;
                            for (h.lastIndex = 0;
                                (s = h.exec(t)) && s.index < e;)
                                i++,
                                r = h.lastIndex;
                            return new l(i, e - r)
                        }(this.input, t),
                        e
                }
                raise(t, e, ...s) {
                    return this.raiseWithData(t, void 0, e, ...s)
                }
                raiseWithData(t, e, s, ...i) {
                    const r = this.getLocationForPosition(t),
                        a = s.replace(/%(\d+)/g, (t, e) => i[e]) + " (".concat(r.line, ":").concat(r.column, ")");
                    return this._raise(Object.assign({
                        loc: r,
                        pos: t
                    }, e), a)
                }
                _raise(t, e) {
                    const s = new SyntaxError(e);
                    if (Object.assign(s, t),
                        this.options.errorRecovery)
                        return this.isLookahead || this.state.errors.push(s),
                            s;
                    throw s
                }
            } {
                constructor(t, e) {
                    super(),
                        this.tokens = [],
                        this.state = new lt,
                        this.state.init(t),
                        this.input = e,
                        this.length = e.length,
                        this.isLookahead = !1
                }
                pushToken(t) {
                    this.tokens.length = this.state.tokensLength,
                        this.tokens.push(t),
                        ++this.state.tokensLength
                }
                next() {
                    this.isLookahead || (this.checkKeywordEscapes(),
                            this.options.tokens && this.pushToken(new yt(this.state))),
                        this.state.lastTokEnd = this.state.end,
                        this.state.lastTokStart = this.state.start,
                        this.state.lastTokEndLoc = this.state.endLoc,
                        this.state.lastTokStartLoc = this.state.startLoc,
                        this.nextToken()
                }
                eat(t) {
                    return !!this.match(t) && (this.next(), !0)
                }
                match(t) {
                    return this.state.type === t
                }
                lookahead() {
                    const t = this.state;
                    this.state = t.clone(!0),
                        this.isLookahead = !0,
                        this.next(),
                        this.isLookahead = !1;
                    const e = this.state;
                    return this.state = t,
                        e
                }
                nextTokenStart() {
                    const t = this.state.pos;
                    return c.lastIndex = t,
                        t + c.exec(this.input)[0].length
                }
                lookaheadCharCode() {
                    return this.input.charCodeAt(this.nextTokenStart())
                }
                setStrict(t) {
                    if (this.state.strict = t,
                        this.match(n.num) || this.match(n.string)) {
                        for (this.state.pos = this.state.start; this.state.pos < this.state.lineStart;)
                            this.state.lineStart = this.input.lastIndexOf("\n", this.state.lineStart - 2) + 1,
                            --this.state.curLine;
                        this.nextToken()
                    }
                }
                curContext() {
                    return this.state.context[this.state.context.length - 1]
                }
                nextToken() {
                    const t = this.curContext();
                    if (t && t.preserveSpace || this.skipSpace(),
                        this.state.octalPositions = [],
                        this.state.start = this.state.pos,
                        this.state.startLoc = this.state.curPosition(),
                        this.state.pos >= this.length)
                        return void this.finishToken(n.eof);
                    const e = null == t ? void 0 : t.override;
                    e ? e(this) : this.getTokenFromCode(this.input.codePointAt(this.state.pos))
                }
                pushComment(t, e, s, i, r, a) {
                    const n = {
                        type: t ? "CommentBlock" : "CommentLine",
                        value: e,
                        start: s,
                        end: i,
                        loc: new d(r, a)
                    };
                    this.options.tokens && this.pushToken(n),
                        this.state.comments.push(n),
                        this.addComment(n)
                }
                skipBlockComment() {
                    const t = this.state.curPosition(),
                        e = this.state.pos,
                        s = this.input.indexOf("*/", this.state.pos + 2);
                    if (-1 === s)
                        throw this.raise(e, f.UnterminatedComment);
                    let i;
                    for (this.state.pos = s + 2,
                        h.lastIndex = e;
                        (i = h.exec(this.input)) && i.index < this.state.pos;)
                        ++this.state.curLine,
                        this.state.lineStart = i.index + i[0].length;
                    this.isLookahead || this.pushComment(!0, this.input.slice(e + 2, s), e, this.state.pos, t, this.state.curPosition())
                }
                skipLineComment(t) {
                    const e = this.state.pos,
                        s = this.state.curPosition();
                    let i = this.input.charCodeAt(this.state.pos += t);
                    if (this.state.pos < this.length)
                        for (; !p(i) && ++this.state.pos < this.length;)
                            i = this.input.charCodeAt(this.state.pos);
                    this.isLookahead || this.pushComment(!1, this.input.slice(e + t, this.state.pos), e, this.state.pos, s, this.state.curPosition())
                }
                skipSpace() {
                    t: for (; this.state.pos < this.length;) {
                        const t = this.input.charCodeAt(this.state.pos);
                        switch (t) {
                            case 32:
                            case 160:
                            case 9:
                                ++this.state.pos;
                                break;
                            case 13:
                                10 === this.input.charCodeAt(this.state.pos + 1) && ++this.state.pos;
                            case 10:
                            case 8232:
                            case 8233:
                                ++this.state.pos,
                                    ++this.state.curLine,
                                    this.state.lineStart = this.state.pos;
                                break;
                            case 47:
                                switch (this.input.charCodeAt(this.state.pos + 1)) {
                                    case 42:
                                        this.skipBlockComment();
                                        break;
                                    case 47:
                                        this.skipLineComment(2);
                                        break;
                                    default:
                                        break t
                                }
                                break;
                            default:
                                if (!u(t))
                                    break t;
                                ++this.state.pos
                        }
                    }
                }
                finishToken(t, e) {
                    this.state.end = this.state.pos,
                        this.state.endLoc = this.state.curPosition();
                    const s = this.state.type;
                    this.state.type = t,
                        this.state.value = e,
                        this.isLookahead || this.updateContext(s)
                }
                readToken_numberSign() {
                    if (0 === this.state.pos && this.readToken_interpreter())
                        return;
                    const t = this.state.pos + 1,
                        e = this.input.charCodeAt(t);
                    if (e >= 48 && e <= 57)
                        throw this.raise(this.state.pos, f.UnexpectedDigitAfterHash);
                    if (!this.hasPlugin("recordAndTuple") || 123 !== e && 91 !== e) {
                        if (!this.hasPlugin("classPrivateProperties") && !this.hasPlugin("classPrivateMethods") && "smart" !== this.getPluginOption("pipelineOperator", "proposal"))
                            throw this.raise(this.state.pos, f.InvalidOrUnexpectedToken, "#");
                        this.finishOp(n.hash, 1)
                    } else {
                        if ("hash" !== this.getPluginOption("recordAndTuple", "syntaxType"))
                            throw this.raise(this.state.pos, 123 === e ? f.RecordExpressionHashIncorrectStartSyntaxType : f.TupleExpressionHashIncorrectStartSyntaxType);
                        123 === e ? this.finishToken(n.braceHashL) : this.finishToken(n.bracketHashL),
                            this.state.pos += 2
                    }
                }
                readToken_dot() {
                    const t = this.input.charCodeAt(this.state.pos + 1);
                    t >= 48 && t <= 57 ? this.readNumber(!0) : 46 === t && 46 === this.input.charCodeAt(this.state.pos + 2) ? (this.state.pos += 3,
                        this.finishToken(n.ellipsis)) : (++this.state.pos,
                        this.finishToken(n.dot))
                }
                readToken_slash() {
                    if (this.state.exprAllowed && !this.state.inType)
                        return ++this.state.pos,
                            void this.readRegexp();
                    61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(n.assign, 2) : this.finishOp(n.slash, 1)
                }
                readToken_interpreter() {
                    if (0 !== this.state.pos || this.length < 2)
                        return !1;
                    let t = this.input.charCodeAt(this.state.pos + 1);
                    if (33 !== t)
                        return !1;
                    const e = this.state.pos;
                    for (this.state.pos += 1; !p(t) && ++this.state.pos < this.length;)
                        t = this.input.charCodeAt(this.state.pos);
                    const s = this.input.slice(e + 2, this.state.pos);
                    return this.finishToken(n.interpreterDirective, s), !0
                }
                readToken_mult_modulo(t) {
                    let e = 42 === t ? n.star : n.modulo,
                        s = 1,
                        i = this.input.charCodeAt(this.state.pos + 1);
                    const r = this.state.exprAllowed;
                    42 === t && 42 === i && (s++,
                            i = this.input.charCodeAt(this.state.pos + 2),
                            e = n.exponent),
                        61 !== i || r || (s++,
                            e = n.assign),
                        this.finishOp(e, s)
                }
                readToken_pipe_amp(t) {
                    const e = this.input.charCodeAt(this.state.pos + 1);
                    if (e !== t) {
                        if (124 === t) {
                            if (62 === e)
                                return void this.finishOp(n.pipeline, 2);
                            if (this.hasPlugin("recordAndTuple") && 125 === e) {
                                if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType"))
                                    throw this.raise(this.state.pos, f.RecordExpressionBarIncorrectEndSyntaxType);
                                return void this.finishOp(n.braceBarR, 2)
                            }
                            if (this.hasPlugin("recordAndTuple") && 93 === e) {
                                if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType"))
                                    throw this.raise(this.state.pos, f.TupleExpressionBarIncorrectEndSyntaxType);
                                return void this.finishOp(n.bracketBarR, 2)
                            }
                        }
                        61 !== e ? this.finishOp(124 === t ? n.bitwiseOR : n.bitwiseAND, 1) : this.finishOp(n.assign, 2)
                    } else
                        61 === this.input.charCodeAt(this.state.pos + 2) ? this.finishOp(n.assign, 3) : this.finishOp(124 === t ? n.logicalOR : n.logicalAND, 2)
                }
                readToken_caret() {
                    61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(n.assign, 2) : this.finishOp(n.bitwiseXOR, 1)
                }
                readToken_plus_min(t) {
                    const e = this.input.charCodeAt(this.state.pos + 1);
                    if (e === t)
                        return 45 !== e || this.inModule || 62 !== this.input.charCodeAt(this.state.pos + 2) || 0 !== this.state.lastTokEnd && !o.test(this.input.slice(this.state.lastTokEnd, this.state.pos)) ? void this.finishOp(n.incDec, 2) : (this.skipLineComment(3),
                            this.skipSpace(),
                            void this.nextToken());
                    61 === e ? this.finishOp(n.assign, 2) : this.finishOp(n.plusMin, 1)
                }
                readToken_lt_gt(t) {
                    const e = this.input.charCodeAt(this.state.pos + 1);
                    let s = 1;
                    return e === t ? (s = 62 === t && 62 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2,
                        61 === this.input.charCodeAt(this.state.pos + s) ? void this.finishOp(n.assign, s + 1) : void this.finishOp(n.bitShift, s)) : 33 !== e || 60 !== t || this.inModule || 45 !== this.input.charCodeAt(this.state.pos + 2) || 45 !== this.input.charCodeAt(this.state.pos + 3) ? (61 === e && (s = 2),
                        void this.finishOp(n.relational, s)) : (this.skipLineComment(4),
                        this.skipSpace(),
                        void this.nextToken())
                }
                readToken_eq_excl(t) {
                    const e = this.input.charCodeAt(this.state.pos + 1);
                    if (61 !== e)
                        return 61 === t && 62 === e ? (this.state.pos += 2,
                            void this.finishToken(n.arrow)) : void this.finishOp(61 === t ? n.eq : n.bang, 1);
                    this.finishOp(n.equality, 61 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2)
                }
                readToken_question() {
                    const t = this.input.charCodeAt(this.state.pos + 1),
                        e = this.input.charCodeAt(this.state.pos + 2);
                    63 !== t || this.state.inType ? 46 !== t || e >= 48 && e <= 57 ? (++this.state.pos,
                        this.finishToken(n.question)) : (this.state.pos += 2,
                        this.finishToken(n.questionDot)) : 61 === e ? this.finishOp(n.assign, 3) : this.finishOp(n.nullishCoalescing, 2)
                }
                getTokenFromCode(t) {
                    switch (t) {
                        case 46:
                            return void this.readToken_dot();
                        case 40:
                            return ++this.state.pos,
                                void this.finishToken(n.parenL);
                        case 41:
                            return ++this.state.pos,
                                void this.finishToken(n.parenR);
                        case 59:
                            return ++this.state.pos,
                                void this.finishToken(n.semi);
                        case 44:
                            return ++this.state.pos,
                                void this.finishToken(n.comma);
                        case 91:
                            if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
                                if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType"))
                                    throw this.raise(this.state.pos, f.TupleExpressionBarIncorrectStartSyntaxType);
                                this.finishToken(n.bracketBarL),
                                    this.state.pos += 2
                            } else
                                ++this.state.pos,
                                this.finishToken(n.bracketL);
                            return;
                        case 93:
                            return ++this.state.pos,
                                void this.finishToken(n.bracketR);
                        case 123:
                            if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
                                if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType"))
                                    throw this.raise(this.state.pos, f.RecordExpressionBarIncorrectStartSyntaxType);
                                this.finishToken(n.braceBarL),
                                    this.state.pos += 2
                            } else
                                ++this.state.pos,
                                this.finishToken(n.braceL);
                            return;
                        case 125:
                            return ++this.state.pos,
                                void this.finishToken(n.braceR);
                        case 58:
                            return void(this.hasPlugin("functionBind") && 58 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(n.doubleColon, 2) : (++this.state.pos,
                                this.finishToken(n.colon)));
                        case 63:
                            return void this.readToken_question();
                        case 96:
                            return ++this.state.pos,
                                void this.finishToken(n.backQuote);
                        case 48:
                            {
                                const t = this.input.charCodeAt(this.state.pos + 1);
                                if (120 === t || 88 === t)
                                    return void this.readRadixNumber(16);
                                if (111 === t || 79 === t)
                                    return void this.readRadixNumber(8);
                                if (98 === t || 66 === t)
                                    return void this.readRadixNumber(2)
                            }
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            return void this.readNumber(!1);
                        case 34:
                        case 39:
                            return void this.readString(t);
                        case 47:
                            return void this.readToken_slash();
                        case 37:
                        case 42:
                            return void this.readToken_mult_modulo(t);
                        case 124:
                        case 38:
                            return void this.readToken_pipe_amp(t);
                        case 94:
                            return void this.readToken_caret();
                        case 43:
                        case 45:
                            return void this.readToken_plus_min(t);
                        case 60:
                        case 62:
                            return void this.readToken_lt_gt(t);
                        case 61:
                        case 33:
                            return void this.readToken_eq_excl(t);
                        case 126:
                            return void this.finishOp(n.tilde, 1);
                        case 64:
                            return ++this.state.pos,
                                void this.finishToken(n.at);
                        case 35:
                            return void this.readToken_numberSign();
                        case 92:
                            return void this.readWord();
                        default:
                            if (w(t))
                                return void this.readWord()
                    }
                    throw this.raise(this.state.pos, f.InvalidOrUnexpectedToken, String.fromCodePoint(t))
                }
                finishOp(t, e) {
                    const s = this.input.slice(this.state.pos, this.state.pos + e);
                    this.state.pos += e,
                        this.finishToken(t, s)
                }
                readRegexp() {
                    const t = this.state.pos;
                    let e, s;
                    for (;;) {
                        if (this.state.pos >= this.length)
                            throw this.raise(t, f.UnterminatedRegExp);
                        const i = this.input.charAt(this.state.pos);
                        if (o.test(i))
                            throw this.raise(t, f.UnterminatedRegExp);
                        if (e)
                            e = !1;
                        else {
                            if ("[" === i)
                                s = !0;
                            else if ("]" === i && s)
                                s = !1;
                            else if ("/" === i && !s)
                                break;
                            e = "\\" === i
                        }
                        ++this.state.pos
                    }
                    const i = this.input.slice(t, this.state.pos);
                    ++this.state.pos;
                    let r = "";
                    for (; this.state.pos < this.length;) {
                        const t = this.input[this.state.pos],
                            e = this.input.codePointAt(this.state.pos);
                        if (mt.has(t))
                            r.indexOf(t) > -1 && this.raise(this.state.pos + 1, f.DuplicateRegExpFlags);
                        else {
                            if (!S(e) && 92 !== e)
                                break;
                            this.raise(this.state.pos + 1, f.MalformedRegExpFlags)
                        }
                        ++this.state.pos,
                            r += t
                    }
                    this.finishToken(n.regexp, {
                        pattern: i,
                        flags: r
                    })
                }
                readInt(t, e, s, i = !0) {
                    const r = this.state.pos,
                        a = 16 === t ? ft.hex : ft.decBinOct,
                        n = 16 === t ? Dt.hex : 10 === t ? Dt.dec : 8 === t ? Dt.oct : Dt.bin;
                    let o = !1,
                        h = 0;
                    for (let r = 0, p = null == e ? 1 / 0 : e; r < p; ++r) {
                        const e = this.input.charCodeAt(this.state.pos);
                        let p;
                        if (this.hasPlugin("numericSeparator") && 95 === e) {
                            const t = this.input.charCodeAt(this.state.pos - 1),
                                e = this.input.charCodeAt(this.state.pos + 1); -
                            1 === n.indexOf(e) ? this.raise(this.state.pos, f.UnexpectedNumericSeparator) : (a.indexOf(t) > -1 || a.indexOf(e) > -1 || Number.isNaN(e)) && this.raise(this.state.pos, f.UnexpectedNumericSeparator),
                                i || this.raise(this.state.pos, f.NumericSeparatorInEscapeSequence),
                                ++this.state.pos
                        } else {
                            if (p = e >= 97 ? e - 97 + 10 : e >= 65 ? e - 65 + 10 : dt(e) ? e - 48 : 1 / 0,
                                p >= t)
                                if (this.options.errorRecovery && p <= 9)
                                    p = 0,
                                    this.raise(this.state.start + r + 2, f.InvalidDigit, t);
                                else {
                                    if (!s)
                                        break;
                                    p = 0,
                                        o = !0
                                }
                                ++this.state.pos,
                                h = h * t + p
                        }
                    }
                    return this.state.pos === r || null != e && this.state.pos - r !== e || o ? null : h
                }
                readRadixNumber(t) {
                    const e = this.state.pos;
                    let s = !1;
                    this.state.pos += 2;
                    const i = this.readInt(t);
                    if (null == i && this.raise(this.state.start + 2, f.InvalidDigit, t),
                        110 === this.input.charCodeAt(this.state.pos) && (++this.state.pos,
                            s = !0),
                        w(this.input.codePointAt(this.state.pos)))
                        throw this.raise(this.state.pos, f.NumberIdentifier);
                    if (s) {
                        const t = this.input.slice(e, this.state.pos).replace(/[_n]/g, "");
                        this.finishToken(n.bigint, t)
                    } else
                        this.finishToken(n.num, i)
                }
                readNumber(t) {
                    const e = this.state.pos;
                    let s = !1,
                        i = !1,
                        r = !1;
                    t || null !== this.readInt(10) || this.raise(e, f.InvalidNumber);
                    let a = this.state.pos - e >= 2 && 48 === this.input.charCodeAt(e);
                    a && (this.state.strict && this.raise(e, f.StrictOctalLiteral),
                        /[89]/.test(this.input.slice(e, this.state.pos)) && (a = !1,
                            r = !0));
                    let o = this.input.charCodeAt(this.state.pos);
                    if (46 !== o || a || (++this.state.pos,
                            this.readInt(10),
                            s = !0,
                            o = this.input.charCodeAt(this.state.pos)),
                        69 !== o && 101 !== o || a || (o = this.input.charCodeAt(++this.state.pos),
                            43 !== o && 45 !== o || ++this.state.pos,
                            null === this.readInt(10) && this.raise(e, "Invalid number"),
                            s = !0,
                            o = this.input.charCodeAt(this.state.pos)),
                        this.hasPlugin("numericSeparator") && (a || r)) {
                        const t = this.input.slice(e, this.state.pos).indexOf("_");
                        t > 0 && this.raise(t + e, f.ZeroDigitNumericSeparator)
                    }
                    if (110 === o && ((s || a || r) && this.raise(e, "Invalid BigIntLiteral"),
                            ++this.state.pos,
                            i = !0),
                        w(this.input.codePointAt(this.state.pos)))
                        throw this.raise(this.state.pos, f.NumberIdentifier);
                    const h = this.input.slice(e, this.state.pos).replace(/[_n]/g, "");
                    if (i)
                        return void this.finishToken(n.bigint, h);
                    const p = a ? parseInt(h, 8) : parseFloat(h);
                    this.finishToken(n.num, p)
                }
                readCodePoint(t) {
                    let e;
                    if (123 === this.input.charCodeAt(this.state.pos)) {
                        const s = ++this.state.pos;
                        if (e = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, !0, t),
                            ++this.state.pos,
                            null !== e && e > 1114111) {
                            if (!t)
                                return null;
                            this.raise(s, f.InvalidCodePoint)
                        }
                    } else
                        e = this.readHexChar(4, !1, t);
                    return e
                }
                readString(t) {
                    let e = "",
                        s = ++this.state.pos;
                    for (;;) {
                        if (this.state.pos >= this.length)
                            throw this.raise(this.state.start, f.UnterminatedString);
                        const i = this.input.charCodeAt(this.state.pos);
                        if (i === t)
                            break;
                        if (92 === i)
                            e += this.input.slice(s, this.state.pos),
                            e += this.readEscapedChar(!1),
                            s = this.state.pos;
                        else if (8232 === i || 8233 === i)
                            ++this.state.pos,
                            ++this.state.curLine,
                            this.state.lineStart = this.state.pos;
                        else {
                            if (p(i))
                                throw this.raise(this.state.start, f.UnterminatedString);
                            ++this.state.pos
                        }
                    }
                    e += this.input.slice(s, this.state.pos++),
                        this.finishToken(n.string, e)
                }
                readTmplToken() {
                    let t = "",
                        e = this.state.pos,
                        s = !1;
                    for (;;) {
                        if (this.state.pos >= this.length)
                            throw this.raise(this.state.start, f.UnterminatedTemplate);
                        const i = this.input.charCodeAt(this.state.pos);
                        if (96 === i || 36 === i && 123 === this.input.charCodeAt(this.state.pos + 1))
                            return this.state.pos === this.state.start && this.match(n.template) ? 36 === i ? (this.state.pos += 2,
                                void this.finishToken(n.dollarBraceL)) : (++this.state.pos,
                                void this.finishToken(n.backQuote)) : (t += this.input.slice(e, this.state.pos),
                                void this.finishToken(n.template, s ? null : t));
                        if (92 === i) {
                            t += this.input.slice(e, this.state.pos);
                            const i = this.readEscapedChar(!0);
                            null === i ? s = !0 : t += i,
                                e = this.state.pos
                        } else if (p(i)) {
                            switch (t += this.input.slice(e, this.state.pos),
                                ++this.state.pos,
                                i) {
                                case 13:
                                    10 === this.input.charCodeAt(this.state.pos) && ++this.state.pos;
                                case 10:
                                    t += "\n";
                                    break;
                                default:
                                    t += String.fromCharCode(i)
                            }
                            ++this.state.curLine,
                                this.state.lineStart = this.state.pos,
                                e = this.state.pos
                        } else
                            ++this.state.pos
                    }
                }
                readEscapedChar(t) {
                    const e = !t,
                        s = this.input.charCodeAt(++this.state.pos);
                    switch (++this.state.pos,
                        s) {
                        case 110:
                            return "\n";
                        case 114:
                            return "\r";
                        case 120:
                            {
                                const t = this.readHexChar(2, !1, e);
                                return null === t ? null : String.fromCharCode(t)
                            }
                        case 117:
                            {
                                const t = this.readCodePoint(e);
                                return null === t ? null : String.fromCodePoint(t)
                            }
                        case 116:
                            return "\t";
                        case 98:
                            return "\b";
                        case 118:
                            return "\v";
                        case 102:
                            return "\f";
                        case 13:
                            10 === this.input.charCodeAt(this.state.pos) && ++this.state.pos;
                        case 10:
                            this.state.lineStart = this.state.pos,
                                ++this.state.curLine;
                        case 8232:
                        case 8233:
                            return "";
                        case 56:
                        case 57:
                            if (t)
                                return null;
                        default:
                            if (s >= 48 && s <= 55) {
                                const e = this.state.pos - 1;
                                let s = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/)[0],
                                    i = parseInt(s, 8);
                                i > 255 && (s = s.slice(0, -1),
                                        i = parseInt(s, 8)),
                                    this.state.pos += s.length - 1;
                                const r = this.input.charCodeAt(this.state.pos);
                                if ("0" !== s || 56 === r || 57 === r) {
                                    if (t)
                                        return null;
                                    this.state.strict ? this.raise(e, f.StrictOctalLiteral) : this.state.octalPositions.push(e)
                                }
                                return String.fromCharCode(i)
                            }
                            return String.fromCharCode(s)
                    }
                }
                readHexChar(t, e, s) {
                    const i = this.state.pos,
                        r = this.readInt(16, t, e, !1);
                    return null === r && (s ? this.raise(i, f.InvalidEscapeSequence) : this.state.pos = i - 1),
                        r
                }
                readWord1() {
                    let t = "";
                    this.state.containsEsc = !1;
                    const e = this.state.pos;
                    let s = this.state.pos;
                    for (; this.state.pos < this.length;) {
                        const i = this.input.codePointAt(this.state.pos);
                        if (S(i))
                            this.state.pos += i <= 65535 ? 1 : 2;
                        else if (this.state.isIterator && 64 === i)
                            ++this.state.pos;
                        else {
                            if (92 !== i)
                                break; {
                                this.state.containsEsc = !0,
                                    t += this.input.slice(s, this.state.pos);
                                const i = this.state.pos,
                                    r = this.state.pos === e ? w : S;
                                if (117 !== this.input.charCodeAt(++this.state.pos)) {
                                    this.raise(this.state.pos, f.MissingUnicodeEscape);
                                    continue
                                }
                                ++this.state.pos;
                                const a = this.readCodePoint(!0);
                                null !== a && (r(a) || this.raise(i, f.EscapedCharNotAnIdentifier),
                                        t += String.fromCodePoint(a)),
                                    s = this.state.pos
                            }
                        }
                    }
                    return t + this.input.slice(s, this.state.pos)
                }
                isIterator(t) {
                    return "@@iterator" === t || "@@asyncIterator" === t
                }
                readWord() {
                    const t = this.readWord1(),
                        e = i.get(t) || n.name;
                    !this.state.isIterator || this.isIterator(t) && this.state.inType || this.raise(this.state.pos, f.InvalidIdentifier, t),
                        this.finishToken(e, t)
                }
                checkKeywordEscapes() {
                    const t = this.state.type.keyword;
                    t && this.state.containsEsc && this.raise(this.state.start, f.InvalidEscapedReservedWord, t)
                }
                braceIsBlock(t) {
                    const e = this.curContext();
                    return e === x.functionExpression || e === x.functionStatement || (t !== n.colon || e !== x.braceStatement && e !== x.braceExpression ? t === n._return || t === n.name && this.state.exprAllowed ? o.test(this.input.slice(this.state.lastTokEnd, this.state.start)) : t === n._else || t === n.semi || t === n.eof || t === n.parenR || t === n.arrow || (t === n.braceL ? e === x.braceStatement : t !== n._var && t !== n._const && t !== n.name && (t === n.relational || !this.state.exprAllowed)) : !e.isExpr)
                }
                updateContext(t) {
                    const e = this.state.type;
                    let s;
                    !e.keyword || t !== n.dot && t !== n.questionDot ? (s = e.updateContext) ? s.call(this, t) : this.state.exprAllowed = e.beforeExpr : this.state.exprAllowed = !1
                }
            } {
                addExtra(t, e, s) {
                    if (!t)
                        return;
                    (t.extra = t.extra || {})[e] = s
                }
                isRelational(t) {
                    return this.match(n.relational) && this.state.value === t
                }
                isLookaheadRelational(t) {
                    const e = this.nextTokenStart();
                    if (this.input.charAt(e) === t) {
                        if (e + 1 === this.input.length)
                            return !0;
                        const s = this.input.charCodeAt(e + 1);
                        return s !== t.charCodeAt(0) && 61 !== s
                    }
                    return !1
                }
                expectRelational(t) {
                    this.isRelational(t) ? this.next() : this.unexpected(null, n.relational)
                }
                isContextual(t) {
                    return this.match(n.name) && this.state.value === t && !this.state.containsEsc
                }
                isUnparsedContextual(t, e) {
                    const s = t + e.length;
                    return this.input.slice(t, s) === e && (s === this.input.length || !S(this.input.charCodeAt(s)))
                }
                isLookaheadContextual(t) {
                    const e = this.nextTokenStart();
                    return this.isUnparsedContextual(e, t)
                }
                eatContextual(t) {
                    return this.isContextual(t) && this.eat(n.name)
                }
                expectContextual(t, e) {
                    this.eatContextual(t) || this.unexpected(null, e)
                }
                canInsertSemicolon() {
                    return this.match(n.eof) || this.match(n.braceR) || this.hasPrecedingLineBreak()
                }
                hasPrecedingLineBreak() {
                    return o.test(this.input.slice(this.state.lastTokEnd, this.state.start))
                }
                isLineTerminator() {
                    return this.eat(n.semi) || this.canInsertSemicolon()
                }
                semicolon() {
                    this.isLineTerminator() || this.unexpected(null, n.semi)
                }
                expect(t, e) {
                    this.eat(t) || this.unexpected(e, t)
                }
                assertNoSpace(t = "Unexpected space.") {
                    this.state.start > this.state.lastTokEnd && this.raise(this.state.lastTokEnd, t)
                }
                unexpected(t, e = "Unexpected token") {
                    throw "string" != typeof e && (e = 'Unexpected token, expected "'.concat(e.label, '"')),
                        this.raise(null != t ? t : this.state.start, e)
                }
                expectPlugin(t, e) {
                    if (!this.hasPlugin(t))
                        throw this.raiseWithData(null != e ? e : this.state.start, {
                            missingPlugin: [t]
                        }, "This experimental syntax requires enabling the parser plugin: '".concat(t, "'"));
                    return !0
                }
                expectOnePlugin(t, e) {
                    if (!t.some(t => this.hasPlugin(t)))
                        throw this.raiseWithData(null != e ? e : this.state.start, {
                            missingPlugin: t
                        }, "This experimental syntax requires enabling one of the following parser plugin(s): '".concat(t.join(", "), "'"))
                }
                checkYieldAwaitInDefaultParams() {
                    -1 !== this.state.yieldPos && (-1 === this.state.awaitPos || this.state.yieldPos < this.state.awaitPos) && this.raise(this.state.yieldPos, "Yield cannot be used as name inside a generator function"), -1 !== this.state.awaitPos && this.raise(this.state.awaitPos, "Await cannot be used as name inside an async function")
                }
                tryParse(t, e = this.state.clone()) {
                    const s = {
                        node: null
                    };
                    try {
                        const i = t((t = null) => {
                            throw s.node = t,
                                s
                        });
                        if (this.state.errors.length > e.errors.length) {
                            const t = this.state;
                            return this.state = e, {
                                node: i,
                                error: t.errors[e.errors.length],
                                thrown: !1,
                                aborted: !1,
                                failState: t
                            }
                        }
                        return {
                            node: i,
                            error: null,
                            thrown: !1,
                            aborted: !1,
                            failState: null
                        }
                    } catch (t) {
                        const i = this.state;
                        if (this.state = e,
                            t instanceof SyntaxError)
                            return {
                                node: null,
                                error: t,
                                thrown: !0,
                                aborted: !1,
                                failState: i
                            };
                        if (t === s)
                            return {
                                node: s.node,
                                error: null,
                                thrown: !1,
                                aborted: !0,
                                failState: i
                            };
                        throw t
                    }
                }
                checkExpressionErrors(t, e) {
                    if (!t)
                        return !1;
                    const { shorthandAssign: s, doubleProto: i } = t;
                    if (!e)
                        return s >= 0 || i >= 0;
                    s >= 0 && this.unexpected(s),
                        i >= 0 && this.raise(i, f.DuplicateProto)
                }
            } {
                startNode() {
                    return new gt(this, this.state.start, this.state.startLoc)
                }
                startNodeAt(t, e) {
                    return new gt(this, t, e)
                }
                startNodeAtNode(t) {
                    return this.startNodeAt(t.start, t.loc.start)
                }
                finishNode(t, e) {
                    return this.finishNodeAt(t, e, this.state.lastTokEnd, this.state.lastTokEndLoc)
                }
                finishNodeAt(t, e, s, i) {
                    return t.type = e,
                        t.end = s,
                        t.loc.end = i,
                        this.options.ranges && (t.range[1] = s),
                        this.processComment(t),
                        t
                }
                resetStartLocation(t, e, s) {
                    t.start = e,
                        t.loc.start = s,
                        this.options.ranges && (t.range[0] = e)
                }
                resetEndLocation(t, e = this.state.lastTokEnd, s = this.state.lastTokEndLoc) {
                    t.end = e,
                        t.loc.end = s,
                        this.options.ranges && (t.range[1] = e)
                }
                resetStartLocationFromNode(t, e) {
                    this.resetStartLocation(t, e.start, e.loc.start)
                }
            } {
                toAssignable(t) {
                    var e, s;
                    let i = void 0;
                    switch (("ParenthesizedExpression" === t.type || (null == (e = t.extra) ? void 0 : e.parenthesized)) && (i = Pt(t),
                            "Identifier" !== i.type && "MemberExpression" !== i.type && this.raise(t.start, f.InvalidParenthesizedAssignment)),
                        t.type) {
                        case "Identifier":
                        case "ObjectPattern":
                        case "ArrayPattern":
                        case "AssignmentPattern":
                            break;
                        case "ObjectExpression":
                            t.type = "ObjectPattern";
                            for (let e = 0, s = t.properties.length, i = s - 1; e < s; e++) {
                                var r;
                                const s = t.properties[e],
                                    a = e === i;
                                this.toAssignableObjectExpressionProp(s, a),
                                    a && "RestElement" === s.type && (null == (r = t.extra) ? void 0 : r.trailingComma) && this.raiseRestNotLast(t.extra.trailingComma)
                            }
                            break;
                        case "ObjectProperty":
                            this.toAssignable(t.value);
                            break;
                        case "SpreadElement":
                            {
                                this.checkToRestConversion(t),
                                t.type = "RestElement";
                                const e = t.argument;
                                this.toAssignable(e);
                                break
                            }
                        case "ArrayExpression":
                            t.type = "ArrayPattern",
                                this.toAssignableList(t.elements, null == (s = t.extra) ? void 0 : s.trailingComma);
                            break;
                        case "AssignmentExpression":
                            "=" !== t.operator && this.raise(t.left.end, f.MissingEqInAssignment),
                                t.type = "AssignmentPattern",
                                delete t.operator,
                                this.toAssignable(t.left);
                            break;
                        case "ParenthesizedExpression":
                            this.toAssignable(i)
                    }
                    return t
                }
                toAssignableObjectExpressionProp(t, e) {
                    if ("ObjectMethod" === t.type) {
                        const e = "get" === t.kind || "set" === t.kind ? f.PatternHasAccessor : f.PatternHasMethod;
                        this.raise(t.key.start, e)
                    } else
                        "SpreadElement" !== t.type || e ? this.toAssignable(t) : this.raiseRestNotLast(t.start)
                }
                toAssignableList(t, e) {
                    let s = t.length;
                    if (s) {
                        const i = t[s - 1];
                        if (i && "RestElement" === i.type)
                            --s;
                        else if (i && "SpreadElement" === i.type) {
                            i.type = "RestElement";
                            const t = i.argument;
                            this.toAssignable(t),
                                "Identifier" !== t.type && "MemberExpression" !== t.type && "ArrayPattern" !== t.type && "ObjectPattern" !== t.type && this.unexpected(t.start),
                                e && this.raiseTrailingCommaAfterRest(e),
                                --s
                        }
                    }
                    for (let e = 0; e < s; e++) {
                        const s = t[e];
                        s && (this.toAssignable(s),
                            "RestElement" === s.type && this.raiseRestNotLast(s.start))
                    }
                    return t
                }
                toReferencedList(t, e) {
                    return t
                }
                toReferencedListDeep(t, e) {
                    this.toReferencedList(t, e);
                    for (let e = 0; e < t.length; e++) {
                        const s = t[e];
                        s && "ArrayExpression" === s.type && this.toReferencedListDeep(s.elements)
                    }
                }
                parseSpread(t, e) {
                    const s = this.startNode();
                    return this.next(),
                        s.argument = this.parseMaybeAssign(!1, t, void 0, e),
                        this.finishNode(s, "SpreadElement")
                }
                parseRestBinding() {
                    const t = this.startNode();
                    return this.next(),
                        t.argument = this.parseBindingAtom(),
                        this.finishNode(t, "RestElement")
                }
                parseBindingAtom() {
                    switch (this.state.type) {
                        case n.bracketL:
                            {
                                const t = this.startNode();
                                return this.next(),
                                t.elements = this.parseBindingList(n.bracketR, 93, !0),
                                this.finishNode(t, "ArrayPattern")
                            }
                        case n.braceL:
                            return this.parseObj(n.braceR, !0)
                    }
                    return this.parseIdentifier()
                }
                parseBindingList(t, e, s, i) {
                    const r = [];
                    let a = !0;
                    for (; !this.eat(t);)
                        if (a ? a = !1 : this.expect(n.comma),
                            s && this.match(n.comma))
                            r.push(null);
                        else {
                            if (this.eat(t))
                                break;
                            if (this.match(n.ellipsis)) {
                                r.push(this.parseAssignableListItemTypes(this.parseRestBinding())),
                                    this.checkCommaAfterRest(e),
                                    this.expect(t);
                                break
                            } {
                                const t = [];
                                for (this.match(n.at) && this.hasPlugin("decorators") && this.raise(this.state.start, f.UnsupportedParameterDecorator); this.match(n.at);)
                                    t.push(this.parseDecorator());
                                r.push(this.parseAssignableListItem(i, t))
                            }
                        }
                    return r
                }
                parseAssignableListItem(t, e) {
                    const s = this.parseMaybeDefault();
                    this.parseAssignableListItemTypes(s);
                    const i = this.parseMaybeDefault(s.start, s.loc.start, s);
                    return e.length && (s.decorators = e),
                        i
                }
                parseAssignableListItemTypes(t) {
                    return t
                }
                parseMaybeDefault(t, e, s) {
                    if (e = e || this.state.startLoc,
                        t = t || this.state.start,
                        s = s || this.parseBindingAtom(), !this.eat(n.eq))
                        return s;
                    const i = this.startNodeAt(t, e);
                    return i.left = s,
                        i.right = this.parseMaybeAssign(),
                        this.finishNode(i, "AssignmentPattern")
                }
                checkLVal(t, e = 64, s, i, r, a = !1) {
                    switch (t.type) {
                        case "Identifier":
                            if (this.state.strict && (a ? O(t.name, this.inModule) : M(t.name)) && this.raise(t.start, 64 === e ? f.StrictEvalArguments : f.StrictEvalArgumentsBinding, t.name),
                                s) {
                                const e = "_".concat(t.name);
                                s[e] ? this.raise(t.start, f.ParamDupe) : s[e] = !0
                            }
                            r && "let" === t.name && this.raise(t.start, f.LetInLexicalBinding),
                                64 & e || this.scope.declareName(t.name, e, t.start);
                            break;
                        case "MemberExpression":
                            64 !== e && this.raise(t.start, f.InvalidPropertyBindingPattern);
                            break;
                        case "ObjectPattern":
                            for (let i = 0, a = t.properties; i < a.length; i++) {
                                let t = a[i];
                                if ("ObjectProperty" === t.type)
                                    t = t.value;
                                else if ("ObjectMethod" === t.type)
                                    continue;
                                this.checkLVal(t, e, s, "object destructuring pattern", r)
                            }
                            break;
                        case "ArrayPattern":
                            for (let i = 0, a = t.elements; i < a.length; i++) {
                                const t = a[i];
                                t && this.checkLVal(t, e, s, "array destructuring pattern", r)
                            }
                            break;
                        case "AssignmentPattern":
                            this.checkLVal(t.left, e, s, "assignment pattern");
                            break;
                        case "RestElement":
                            this.checkLVal(t.argument, e, s, "rest element");
                            break;
                        case "ParenthesizedExpression":
                            this.checkLVal(t.expression, e, s, "parenthesized expression");
                            break;
                        default:
                            this.raise(t.start, 64 === e ? f.InvalidLhs : f.InvalidLhsBinding, i)
                    }
                }
                checkToRestConversion(t) {
                    "Identifier" !== t.argument.type && "MemberExpression" !== t.argument.type && this.raise(t.argument.start, f.InvalidRestAssignmentPattern)
                }
                checkCommaAfterRest(t) {
                    this.match(n.comma) && (this.lookaheadCharCode() === t ? this.raiseTrailingCommaAfterRest(this.state.start) : this.raiseRestNotLast(this.state.start))
                }
                raiseRestNotLast(t) {
                    throw this.raise(t, f.ElementAfterRest)
                }
                raiseTrailingCommaAfterRest(t) {
                    this.raise(t, f.RestTrailingComma)
                }
            } {
                checkDuplicatedProto(t, e, s) {
                    if ("SpreadElement" === t.type || t.computed || t.kind || t.shorthand)
                        return;
                    const i = t.key;
                    "__proto__" === ("Identifier" === i.type ? i.name : String(i.value)) && (e.used && (s ? -1 === s.doubleProto && (s.doubleProto = i.start) : this.raise(i.start, f.DuplicateProto)),
                        e.used = !0)
                }
                getExpression() {
                    let t = 0;
                    this.hasPlugin("topLevelAwait") && this.inModule && (t |= 2),
                        this.scope.enter(1),
                        this.prodParam.enter(t),
                        this.nextToken();
                    const e = this.parseExpression();
                    return this.match(n.eof) || this.unexpected(),
                        e.comments = this.state.comments,
                        e.errors = this.state.errors,
                        e
                }
                parseExpression(t, e) {
                    const s = this.state.start,
                        i = this.state.startLoc,
                        r = this.parseMaybeAssign(t, e);
                    if (this.match(n.comma)) {
                        const a = this.startNodeAt(s, i);
                        for (a.expressions = [r]; this.eat(n.comma);)
                            a.expressions.push(this.parseMaybeAssign(t, e));
                        return this.toReferencedList(a.expressions),
                            this.finishNode(a, "SequenceExpression")
                    }
                    return r
                }
                parseMaybeAssign(t, e, s, i) {
                    const r = this.state.start,
                        a = this.state.startLoc;
                    if (this.isContextual("yield")) {
                        if (this.prodParam.hasYield) {
                            let e = this.parseYield(t);
                            return s && (e = s.call(this, e, r, a)),
                                e
                        }
                        this.state.exprAllowed = !1
                    }
                    let o;
                    e ? o = !1 : (e = new xt,
                            o = !0),
                        (this.match(n.parenL) || this.match(n.name)) && (this.state.potentialArrowAt = this.state.start);
                    let h = this.parseMaybeConditional(t, e, i);
                    if (s && (h = s.call(this, h, r, a)),
                        this.state.type.isAssign) {
                        const s = this.startNodeAt(r, a),
                            i = this.state.value;
                        return s.operator = i,
                            "??=" === i && this.expectPlugin("logicalAssignment"),
                            "||=" !== i && "&&=" !== i || this.expectPlugin("logicalAssignment"),
                            this.match(n.eq) ? (s.left = this.toAssignable(h),
                                e.doubleProto = -1) : s.left = h,
                            e.shorthandAssign >= s.left.start && (e.shorthandAssign = -1),
                            this.checkLVal(h, void 0, void 0, "assignment expression"),
                            this.next(),
                            s.right = this.parseMaybeAssign(t),
                            this.finishNode(s, "AssignmentExpression")
                    }
                    return o && this.checkExpressionErrors(e, !0),
                        h
                }
                parseMaybeConditional(t, e, s) {
                    const i = this.state.start,
                        r = this.state.startLoc,
                        a = this.state.potentialArrowAt,
                        n = this.parseExprOps(t, e);
                    return "ArrowFunctionExpression" === n.type && n.start === a ? n : this.checkExpressionErrors(e, !1) ? n : this.parseConditional(n, t, i, r, s)
                }
                parseConditional(t, e, s, i, r) {
                    if (this.eat(n.question)) {
                        const r = this.startNodeAt(s, i);
                        return r.test = t,
                            r.consequent = this.parseMaybeAssign(),
                            this.expect(n.colon),
                            r.alternate = this.parseMaybeAssign(e),
                            this.finishNode(r, "ConditionalExpression")
                    }
                    return t
                }
                parseExprOps(t, e) {
                    const s = this.state.start,
                        i = this.state.startLoc,
                        r = this.state.potentialArrowAt,
                        a = this.parseMaybeUnary(e);
                    return "ArrowFunctionExpression" === a.type && a.start === r ? a : this.checkExpressionErrors(e, !1) ? a : this.parseExprOp(a, s, i, -1, t)
                }
                parseExprOp(t, e, s, i, r) {
                    let a = this.state.type.binop;
                    if (!(null == a || r && this.match(n._in)) && a > i) {
                        const o = this.state.value;
                        if ("|>" === o && this.state.inFSharpPipelineDirectBody)
                            return t;
                        const h = this.startNodeAt(e, s);
                        h.left = t,
                            h.operator = o,
                            "**" !== o || "UnaryExpression" !== t.type || !this.options.createParenthesizedExpressions && t.extra && t.extra.parenthesized || this.raise(t.argument.start, f.UnexpectedTokenUnaryExponentiation);
                        const p = this.state.type,
                            c = p === n.logicalOR || p === n.logicalAND,
                            u = p === n.nullishCoalescing;
                        if (p === n.pipeline ? (this.expectPlugin("pipelineOperator"),
                                this.state.inPipeline = !0,
                                this.checkPipelineAtInfixOperator(t, e)) : u && (a = n.logicalAND.binop),
                            this.next(),
                            p === n.pipeline && "minimal" === this.getPluginOption("pipelineOperator", "proposal") && this.match(n.name) && "await" === this.state.value && this.prodParam.hasAwait)
                            throw this.raise(this.state.start, f.UnexpectedAwaitAfterPipelineBody);
                        h.right = this.parseExprOpRightExpr(p, a, r),
                            this.finishNode(h, c || u ? "LogicalExpression" : "BinaryExpression");
                        const l = this.state.type;
                        if (u && (l === n.logicalOR || l === n.logicalAND) || c && l === n.nullishCoalescing)
                            throw this.raise(this.state.start, f.MixingCoalesceWithLogical);
                        return this.parseExprOp(h, e, s, i, r)
                    }
                    return t
                }
                parseExprOpRightExpr(t, e, s) {
                    const i = this.state.start,
                        r = this.state.startLoc;
                    switch (t) {
                        case n.pipeline:
                            switch (this.getPluginOption("pipelineOperator", "proposal")) {
                                case "smart":
                                    return this.withTopicPermittingContext(() => this.parseSmartPipelineBody(this.parseExprOpBaseRightExpr(t, e, s), i, r));
                                case "fsharp":
                                    return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(e, s))
                            }
                        default:
                            return this.parseExprOpBaseRightExpr(t, e, s)
                    }
                }
                parseExprOpBaseRightExpr(t, e, s) {
                    const i = this.state.start,
                        r = this.state.startLoc;
                    return this.parseExprOp(this.parseMaybeUnary(), i, r, t.rightAssociative ? e - 1 : e, s)
                }
                parseMaybeUnary(t) {
                    if (this.isContextual("await") && this.isAwaitAllowed())
                        return this.parseAwait();
                    if (this.state.type.prefix) {
                        const e = this.startNode(),
                            s = this.match(n.incDec);
                        if (e.operator = this.state.value,
                            e.prefix = !0,
                            "throw" === e.operator && this.expectPlugin("throwExpressions"),
                            this.next(),
                            e.argument = this.parseMaybeUnary(),
                            this.checkExpressionErrors(t, !0),
                            s)
                            this.checkLVal(e.argument, void 0, void 0, "prefix operation");
                        else if (this.state.strict && "delete" === e.operator) {
                            const t = e.argument;
                            "Identifier" === t.type ? this.raise(e.start, f.StrictDelete) : "MemberExpression" === t.type && "PrivateName" === t.property.type && this.raise(e.start, f.DeletePrivateField)
                        }
                        return this.finishNode(e, s ? "UpdateExpression" : "UnaryExpression")
                    }
                    const e = this.state.start,
                        s = this.state.startLoc;
                    let i = this.parseExprSubscripts(t);
                    if (this.checkExpressionErrors(t, !1))
                        return i;
                    for (; this.state.type.postfix && !this.canInsertSemicolon();) {
                        const t = this.startNodeAt(e, s);
                        t.operator = this.state.value,
                            t.prefix = !1,
                            t.argument = i,
                            this.checkLVal(i, void 0, void 0, "postfix operation"),
                            this.next(),
                            i = this.finishNode(t, "UpdateExpression")
                    }
                    return i
                }
                parseExprSubscripts(t) {
                    const e = this.state.start,
                        s = this.state.startLoc,
                        i = this.state.potentialArrowAt,
                        r = this.parseExprAtom(t);
                    return "ArrowFunctionExpression" === r.type && r.start === i ? r : this.parseSubscripts(r, e, s)
                }
                parseSubscripts(t, e, s, i) {
                    const r = {
                        optionalChainMember: !1,
                        maybeAsyncArrow: this.atPossibleAsyncArrow(t),
                        stop: !1
                    };
                    do {
                        const a = this.state.maybeInAsyncArrowHead;
                        r.maybeAsyncArrow && (this.state.maybeInAsyncArrowHead = !0),
                            t = this.parseSubscript(t, e, s, i, r),
                            r.maybeAsyncArrow = !1,
                            this.state.maybeInAsyncArrowHead = a
                    } while (!r.stop);
                    return t
                }
                parseSubscript(t, e, s, i, r) {
                    if (!i && this.eat(n.doubleColon)) {
                        const a = this.startNodeAt(e, s);
                        return a.object = t,
                            a.callee = this.parseNoCallExpr(),
                            r.stop = !0,
                            this.parseSubscripts(this.finishNode(a, "BindExpression"), e, s, i)
                    }
                    let a = !1;
                    if (this.match(n.questionDot)) {
                        if (r.optionalChainMember = a = !0,
                            i && 40 === this.lookaheadCharCode())
                            return r.stop = !0,
                                t;
                        this.next()
                    }
                    const o = this.eat(n.bracketL);
                    if (a && !this.match(n.parenL) && !this.match(n.backQuote) || o || this.eat(n.dot)) {
                        const i = this.startNodeAt(e, s);
                        return i.object = t,
                            i.property = o ? this.parseExpression() : a ? this.parseIdentifier(!0) : this.parseMaybePrivateName(!0),
                            i.computed = o,
                            "PrivateName" === i.property.type && ("Super" === i.object.type && this.raise(e, f.SuperPrivateField),
                                this.classScope.usePrivateName(i.property.id.name, i.property.start)),
                            o && this.expect(n.bracketR),
                            r.optionalChainMember ? (i.optional = a,
                                this.finishNode(i, "OptionalMemberExpression")) : this.finishNode(i, "MemberExpression")
                    }
                    if (!i && this.match(n.parenL)) {
                        const i = this.state.maybeInArrowParameters,
                            o = this.state.yieldPos,
                            h = this.state.awaitPos;
                        this.state.maybeInArrowParameters = !0,
                            this.state.yieldPos = -1,
                            this.state.awaitPos = -1,
                            this.next();
                        let p = this.startNodeAt(e, s);
                        return p.callee = t,
                            a ? (p.optional = !0,
                                p.arguments = this.parseCallExpressionArguments(n.parenR, !1)) : p.arguments = this.parseCallExpressionArguments(n.parenR, r.maybeAsyncArrow, "Import" === t.type, "Super" !== t.type, p),
                            this.finishCallExpression(p, r.optionalChainMember),
                            r.maybeAsyncArrow && this.shouldParseAsyncArrow() && !a ? (r.stop = !0,
                                p = this.parseAsyncArrowFromCallExpression(this.startNodeAt(e, s), p),
                                this.checkYieldAwaitInDefaultParams(),
                                this.state.yieldPos = o,
                                this.state.awaitPos = h) : (this.toReferencedListDeep(p.arguments), -1 !== o && (this.state.yieldPos = o),
                                (this.isAwaitAllowed() || i) && -1 === h || (this.state.awaitPos = h)),
                            this.state.maybeInArrowParameters = i,
                            p
                    }
                    return this.match(n.backQuote) ? this.parseTaggedTemplateExpression(e, s, t, r) : (r.stop = !0,
                        t)
                }
                parseTaggedTemplateExpression(t, e, s, i, r) {
                    const a = this.startNodeAt(t, e);
                    return a.tag = s,
                        a.quasi = this.parseTemplate(!0),
                        r && (a.typeParameters = r),
                        i.optionalChainMember && this.raise(t, f.OptionalChainingNoTemplate),
                        this.finishNode(a, "TaggedTemplateExpression")
                }
                atPossibleAsyncArrow(t) {
                    return "Identifier" === t.type && "async" === t.name && this.state.lastTokEnd === t.end && !this.canInsertSemicolon() && t.end - t.start == 5 && t.start === this.state.potentialArrowAt
                }
                finishCallExpression(t, e) {
                    if ("Import" === t.callee.type)
                        if (1 !== t.arguments.length)
                            this.raise(t.start, f.ImportCallArity);
                        else {
                            const e = t.arguments[0];
                            e && "SpreadElement" === e.type && this.raise(e.start, f.ImportCallSpreadArgument)
                        }
                    return this.finishNode(t, e ? "OptionalCallExpression" : "CallExpression")
                }
                parseCallExpressionArguments(t, e, s, i, r) {
                    const a = [];
                    let o, h = !0;
                    const p = this.state.inFSharpPipelineDirectBody;
                    for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(t);) {
                        if (h)
                            h = !1;
                        else if (this.expect(n.comma),
                            this.match(t)) {
                            s && this.raise(this.state.lastTokStart, f.ImportCallArgumentTrailingComma),
                                r && this.addExtra(r, "trailingComma", this.state.lastTokStart),
                                this.next();
                            break
                        }
                        this.match(n.parenL) && !o && (o = this.state.start),
                            a.push(this.parseExprListItem(!1, e ? new xt : void 0, e ? {
                                start: 0
                            } : void 0, i))
                    }
                    return e && o && this.shouldParseAsyncArrow() && this.unexpected(),
                        this.state.inFSharpPipelineDirectBody = p,
                        a
                }
                shouldParseAsyncArrow() {
                    return this.match(n.arrow) && !this.canInsertSemicolon()
                }
                parseAsyncArrowFromCallExpression(t, e) {
                    var s;
                    return this.expect(n.arrow),
                        this.parseArrowExpression(t, e.arguments, !0, null == (s = e.extra) ? void 0 : s.trailingComma),
                        t
                }
                parseNoCallExpr() {
                    const t = this.state.start,
                        e = this.state.startLoc;
                    return this.parseSubscripts(this.parseExprAtom(), t, e, !0)
                }
                parseExprAtom(t) {
                    this.state.type === n.slash && this.readRegexp();
                    const e = this.state.potentialArrowAt === this.state.start;
                    let s;
                    switch (this.state.type) {
                        case n._super:
                            return s = this.startNode(),
                                this.next(), !this.match(n.parenL) || this.scope.allowDirectSuper || this.options.allowSuperOutsideMethod ? this.scope.allowSuper || this.options.allowSuperOutsideMethod || this.raise(s.start, f.UnexpectedSuper) : this.raise(s.start, f.SuperNotAllowed),
                                this.match(n.parenL) || this.match(n.bracketL) || this.match(n.dot) || this.raise(s.start, f.UnsupportedSuper),
                                this.finishNode(s, "Super");
                        case n._import:
                            return s = this.startNode(),
                                this.next(),
                                this.match(n.dot) ? this.parseImportMetaProperty(s) : (this.match(n.parenL) || this.raise(this.state.lastTokStart, f.UnsupportedImport),
                                    this.finishNode(s, "Import"));
                        case n._this:
                            return s = this.startNode(),
                                this.next(),
                                this.finishNode(s, "ThisExpression");
                        case n.name:
                            {
                                s = this.startNode();
                                const t = this.state.containsEsc,
                                    i = this.parseIdentifier();
                                if (!t && "async" === i.name && this.match(n._function) && !this.canInsertSemicolon()) {
                                    const t = this.state.context.length - 1;
                                    if (this.state.context[t] !== x.functionStatement)
                                        throw new Error("Internal error");
                                    return this.state.context[t] = x.functionExpression,
                                        this.next(),
                                        this.parseFunction(s, void 0, !0)
                                }
                                if (e && !t && "async" === i.name && this.match(n.name) && !this.canInsertSemicolon()) {
                                    const t = this.state.maybeInArrowParameters,
                                        e = this.state.maybeInAsyncArrowHead,
                                        i = this.state.yieldPos,
                                        r = this.state.awaitPos;
                                    this.state.maybeInArrowParameters = !0,
                                        this.state.maybeInAsyncArrowHead = !0,
                                        this.state.yieldPos = -1,
                                        this.state.awaitPos = -1;
                                    const a = [this.parseIdentifier()];
                                    return this.expect(n.arrow),
                                        this.checkYieldAwaitInDefaultParams(),
                                        this.state.maybeInArrowParameters = t,
                                        this.state.maybeInAsyncArrowHead = e,
                                        this.state.yieldPos = i,
                                        this.state.awaitPos = r,
                                        this.parseArrowExpression(s, a, !0),
                                        s
                                }
                                return e && this.match(n.arrow) && !this.canInsertSemicolon() ? (this.next(),
                                    this.parseArrowExpression(s, [i], !1),
                                    s) : i
                            }
                        case n._do:
                            {
                                this.expectPlugin("doExpressions");
                                const t = this.startNode();
                                this.next();
                                const e = this.state.labels;
                                return this.state.labels = [],
                                t.body = this.parseBlock(),
                                this.state.labels = e,
                                this.finishNode(t, "DoExpression")
                            }
                        case n.regexp:
                            {
                                const t = this.state.value;
                                return s = this.parseLiteral(t.value, "RegExpLiteral"),
                                s.pattern = t.pattern,
                                s.flags = t.flags,
                                s
                            }
                        case n.num:
                            return this.parseLiteral(this.state.value, "NumericLiteral");
                        case n.bigint:
                            return this.parseLiteral(this.state.value, "BigIntLiteral");
                        case n.string:
                            return this.parseLiteral(this.state.value, "StringLiteral");
                        case n._null:
                            return s = this.startNode(),
                                this.next(),
                                this.finishNode(s, "NullLiteral");
                        case n._true:
                        case n._false:
                            return this.parseBooleanLiteral();
                        case n.parenL:
                            return this.parseParenAndDistinguishExpression(e);
                        case n.bracketBarL:
                        case n.bracketHashL:
                            {
                                this.expectPlugin("recordAndTuple");
                                const e = this.state.inFSharpPipelineDirectBody,
                                    i = this.state.type === n.bracketBarL ? n.bracketBarR : n.bracketR;
                                return this.state.inFSharpPipelineDirectBody = !1,
                                s = this.startNode(),
                                this.next(),
                                s.elements = this.parseExprList(i, !0, t, s),
                                this.state.inFSharpPipelineDirectBody = e,
                                this.finishNode(s, "TupleExpression")
                            }
                        case n.bracketL:
                            {
                                const e = this.state.inFSharpPipelineDirectBody;
                                return this.state.inFSharpPipelineDirectBody = !1,
                                s = this.startNode(),
                                this.next(),
                                s.elements = this.parseExprList(n.bracketR, !0, t, s),
                                this.state.maybeInArrowParameters || this.toReferencedList(s.elements),
                                this.state.inFSharpPipelineDirectBody = e,
                                this.finishNode(s, "ArrayExpression")
                            }
                        case n.braceBarL:
                        case n.braceHashL:
                            {
                                this.expectPlugin("recordAndTuple");
                                const e = this.state.inFSharpPipelineDirectBody,
                                    s = this.state.type === n.braceBarL ? n.braceBarR : n.braceR;
                                this.state.inFSharpPipelineDirectBody = !1;
                                const i = this.parseObj(s, !1, !0, t);
                                return this.state.inFSharpPipelineDirectBody = e,
                                i
                            }
                        case n.braceL:
                            {
                                const e = this.state.inFSharpPipelineDirectBody;
                                this.state.inFSharpPipelineDirectBody = !1;
                                const s = this.parseObj(n.braceR, !1, !1, t);
                                return this.state.inFSharpPipelineDirectBody = e,
                                s
                            }
                        case n._function:
                            return this.parseFunctionExpression();
                        case n.at:
                            this.parseDecorators();
                        case n._class:
                            return s = this.startNode(),
                                this.takeDecorators(s),
                                this.parseClass(s, !1);
                        case n._new:
                            return this.parseNew();
                        case n.backQuote:
                            return this.parseTemplate(!1);
                        case n.doubleColon:
                            {
                                s = this.startNode(),
                                this.next(),
                                s.object = null;
                                const t = s.callee = this.parseNoCallExpr();
                                if ("MemberExpression" === t.type)
                                    return this.finishNode(s, "BindExpression");
                                throw this.raise(t.start, f.UnsupportedBind)
                            }
                        case n.hash:
                            if (this.state.inPipeline)
                                return s = this.startNode(),
                                    "smart" !== this.getPluginOption("pipelineOperator", "proposal") && this.raise(s.start, f.PrimaryTopicRequiresSmartPipeline),
                                    this.next(),
                                    this.primaryTopicReferenceIsAllowedInCurrentTopicContext() || this.raise(s.start, f.PrimaryTopicNotAllowed),
                                    this.registerTopicReference(),
                                    this.finishNode(s, "PipelinePrimaryTopicReference");
                        default:
                            throw this.unexpected()
                    }
                }
                parseBooleanLiteral() {
                    const t = this.startNode();
                    return t.value = this.match(n._true),
                        this.next(),
                        this.finishNode(t, "BooleanLiteral")
                }
                parseMaybePrivateName(t) {
                    if (this.match(n.hash)) {
                        this.expectOnePlugin(["classPrivateProperties", "classPrivateMethods"]),
                            t || this.raise(this.state.pos, f.UnexpectedPrivateField);
                        const e = this.startNode();
                        return this.next(),
                            this.assertNoSpace("Unexpected space between # and identifier"),
                            e.id = this.parseIdentifier(!0),
                            this.finishNode(e, "PrivateName")
                    }
                    return this.parseIdentifier(!0)
                }
                parseFunctionExpression() {
                    const t = this.startNode();
                    let e = this.startNode();
                    return this.next(),
                        e = this.createIdentifier(e, "function"),
                        this.prodParam.hasYield && this.eat(n.dot) ? this.parseMetaProperty(t, e, "sent") : this.parseFunction(t)
                }
                parseMetaProperty(t, e, s) {
                    t.meta = e,
                        "function" === e.name && "sent" === s && (this.isContextual(s) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected());
                    const i = this.state.containsEsc;
                    return t.property = this.parseIdentifier(!0),
                        (t.property.name !== s || i) && this.raise(t.property.start, f.UnsupportedMetaProperty, e.name, s),
                        this.finishNode(t, "MetaProperty")
                }
                parseImportMetaProperty(t) {
                    const e = this.createIdentifier(this.startNodeAtNode(t), "import");
                    return this.expect(n.dot),
                        this.isContextual("meta") ? (this.expectPlugin("importMeta"),
                            this.inModule || this.raiseWithData(e.start, {
                                code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
                            }, f.ImportMetaOutsideModule),
                            this.sawUnambiguousESM = !0) : this.hasPlugin("importMeta") || this.raise(e.start, f.ImportCallArityLtOne),
                        this.parseMetaProperty(t, e, "meta")
                }
                parseLiteral(t, e, s, i) {
                    s = s || this.state.start,
                        i = i || this.state.startLoc;
                    const r = this.startNodeAt(s, i);
                    return this.addExtra(r, "rawValue", t),
                        this.addExtra(r, "raw", this.input.slice(s, this.state.end)),
                        r.value = t,
                        this.next(),
                        this.finishNode(r, e)
                }
                parseParenAndDistinguishExpression(t) {
                    const e = this.state.start,
                        s = this.state.startLoc;
                    let i;
                    this.expect(n.parenL);
                    const r = this.state.maybeInArrowParameters,
                        a = this.state.yieldPos,
                        o = this.state.awaitPos,
                        h = this.state.inFSharpPipelineDirectBody;
                    this.state.maybeInArrowParameters = !0,
                        this.state.yieldPos = -1,
                        this.state.awaitPos = -1,
                        this.state.inFSharpPipelineDirectBody = !1;
                    const p = this.state.start,
                        c = this.state.startLoc,
                        u = [],
                        l = new xt,
                        d = {
                            start: 0
                        };
                    let m, f, D = !0;
                    for (; !this.match(n.parenR);) {
                        if (D)
                            D = !1;
                        else if (this.expect(n.comma, d.start || null),
                            this.match(n.parenR)) {
                            f = this.state.start;
                            break
                        }
                        if (this.match(n.ellipsis)) {
                            const t = this.state.start,
                                e = this.state.startLoc;
                            m = this.state.start,
                                u.push(this.parseParenItem(this.parseRestBinding(), t, e)),
                                this.checkCommaAfterRest(41);
                            break
                        }
                        u.push(this.parseMaybeAssign(!1, l, this.parseParenItem, d))
                    }
                    const y = this.state.start,
                        x = this.state.startLoc;
                    this.expect(n.parenR),
                        this.state.maybeInArrowParameters = r,
                        this.state.inFSharpPipelineDirectBody = h;
                    let g = this.startNodeAt(e, s);
                    if (t && this.shouldParseArrow() && (g = this.parseArrow(g))) {
                        this.isAwaitAllowed() || this.state.maybeInAsyncArrowHead || (this.state.awaitPos = o),
                            this.checkYieldAwaitInDefaultParams(),
                            this.state.yieldPos = a,
                            this.state.awaitPos = o;
                        for (let t = 0; t < u.length; t++) {
                            const e = u[t];
                            e.extra && e.extra.parenthesized && this.unexpected(e.extra.parenStart)
                        }
                        return this.parseArrowExpression(g, u, !1),
                            g
                    }
                    if (-1 !== a && (this.state.yieldPos = a), -1 !== o && (this.state.awaitPos = o),
                        u.length || this.unexpected(this.state.lastTokStart),
                        f && this.unexpected(f),
                        m && this.unexpected(m),
                        this.checkExpressionErrors(l, !0),
                        d.start && this.unexpected(d.start),
                        this.toReferencedListDeep(u, !0),
                        u.length > 1 ? (i = this.startNodeAt(p, c),
                            i.expressions = u,
                            this.finishNodeAt(i, "SequenceExpression", y, x)) : i = u[0], !this.options.createParenthesizedExpressions)
                        return this.addExtra(i, "parenthesized", !0),
                            this.addExtra(i, "parenStart", e),
                            i;
                    const P = this.startNodeAt(e, s);
                    return P.expression = i,
                        this.finishNode(P, "ParenthesizedExpression"),
                        P
                }
                shouldParseArrow() {
                    return !this.canInsertSemicolon()
                }
                parseArrow(t) {
                    if (this.eat(n.arrow))
                        return t
                }
                parseParenItem(t, e, s) {
                    return t
                }
                parseNew() {
                    const t = this.startNode();
                    let e = this.startNode();
                    if (this.next(),
                        e = this.createIdentifier(e, "new"),
                        this.eat(n.dot)) {
                        const s = this.parseMetaProperty(t, e, "target");
                        if (!this.scope.inNonArrowFunction && !this.scope.inClass) {
                            let t = f.UnexpectedNewTarget;
                            this.hasPlugin("classProperties") && (t += " or class properties"),
                                this.raise(s.start, t)
                        }
                        return s
                    }
                    return t.callee = this.parseNoCallExpr(),
                        "Import" === t.callee.type ? this.raise(t.callee.start, f.ImportCallNotNewExpression) : "OptionalMemberExpression" === t.callee.type || "OptionalCallExpression" === t.callee.type ? this.raise(this.state.lastTokEnd, f.OptionalChainingNoNew) : this.eat(n.questionDot) && this.raise(this.state.start, f.OptionalChainingNoNew),
                        this.parseNewArguments(t),
                        this.finishNode(t, "NewExpression")
                }
                parseNewArguments(t) {
                    if (this.eat(n.parenL)) {
                        const e = this.parseExprList(n.parenR);
                        this.toReferencedList(e),
                            t.arguments = e
                    } else
                        t.arguments = []
                }
                parseTemplateElement(t) {
                    const e = this.startNode();
                    return null === this.state.value && (t || this.raise(this.state.start + 1, f.InvalidEscapeSequenceTemplate)),
                        e.value = {
                            raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
                            cooked: this.state.value
                        },
                        this.next(),
                        e.tail = this.match(n.backQuote),
                        this.finishNode(e, "TemplateElement")
                }
                parseTemplate(t) {
                    const e = this.startNode();
                    this.next(),
                        e.expressions = [];
                    let s = this.parseTemplateElement(t);
                    for (e.quasis = [s]; !s.tail;)
                        this.expect(n.dollarBraceL),
                        e.expressions.push(this.parseExpression()),
                        this.expect(n.braceR),
                        e.quasis.push(s = this.parseTemplateElement(t));
                    return this.next(),
                        this.finishNode(e, "TemplateLiteral")
                }
                parseObj(t, e, s, i) {
                    const r = Object.create(null);
                    let a = !0;
                    const o = this.startNode();
                    for (o.properties = [],
                        this.next(); !this.eat(t);) {
                        if (a)
                            a = !1;
                        else if (this.expect(n.comma),
                            this.match(t)) {
                            this.addExtra(o, "trailingComma", this.state.lastTokStart),
                                this.next();
                            break
                        }
                        const s = this.parseObjectMember(e, i);
                        e || this.checkDuplicatedProto(s, r, i),
                            s.shorthand && this.addExtra(s, "shorthand", !0),
                            o.properties.push(s)
                    }
                    let h = "ObjectExpression";
                    return e ? h = "ObjectPattern" : s && (h = "RecordExpression"),
                        this.finishNode(o, h)
                }
                isAsyncProp(t) {
                    return !t.computed && "Identifier" === t.key.type && "async" === t.key.name && (this.match(n.name) || this.match(n.num) || this.match(n.string) || this.match(n.bracketL) || this.state.type.keyword || this.match(n.star)) && !this.hasPrecedingLineBreak()
                }
                parseObjectMember(t, e) {
                    let s = [];
                    if (this.match(n.at))
                        for (this.hasPlugin("decorators") && this.raise(this.state.start, f.UnsupportedPropertyDecorator); this.match(n.at);)
                            s.push(this.parseDecorator());
                    const i = this.startNode();
                    let r, a, o = !1,
                        h = !1;
                    if (this.match(n.ellipsis))
                        return s.length && this.unexpected(),
                            t ? (this.next(),
                                i.argument = this.parseIdentifier(),
                                this.checkCommaAfterRest(125),
                                this.finishNode(i, "RestElement")) : this.parseSpread();
                    s.length && (i.decorators = s,
                            s = []),
                        i.method = !1,
                        (t || e) && (r = this.state.start,
                            a = this.state.startLoc),
                        t || (o = this.eat(n.star));
                    const p = this.state.containsEsc;
                    return this.parsePropertyName(i, !1),
                        t || p || o || !this.isAsyncProp(i) ? h = !1 : (h = !0,
                            o = this.eat(n.star),
                            this.parsePropertyName(i, !1)),
                        this.parseObjPropValue(i, r, a, o, h, t, e, p),
                        i
                }
                isGetterOrSetterMethod(t, e) {
                    return !e && !t.computed && "Identifier" === t.key.type && ("get" === t.key.name || "set" === t.key.name) && (this.match(n.string) || this.match(n.num) || this.match(n.bracketL) || this.match(n.name) || !!this.state.type.keyword)
                }
                getGetterSetterExpectedParamCount(t) {
                    return "get" === t.kind ? 0 : 1
                }
                checkGetterSetterParams(t) {
                    const e = this.getGetterSetterExpectedParamCount(t),
                        s = t.start;
                    t.params.length !== e && ("get" === t.kind ? this.raise(s, f.BadGetterArity) : this.raise(s, f.BadSetterArity)),
                        "set" === t.kind && "RestElement" === t.params[t.params.length - 1].type && this.raise(s, f.BadSetterRestParameter)
                }
                parseObjectMethod(t, e, s, i, r) {
                    return s || e || this.match(n.parenL) ? (i && this.unexpected(),
                        t.kind = "method",
                        t.method = !0,
                        this.parseMethod(t, e, s, !1, !1, "ObjectMethod")) : !r && this.isGetterOrSetterMethod(t, i) ? ((e || s) && this.unexpected(),
                        t.kind = t.key.name,
                        this.parsePropertyName(t, !1),
                        this.parseMethod(t, !1, !1, !1, !1, "ObjectMethod"),
                        this.checkGetterSetterParams(t),
                        t) : void 0
                }
                parseObjectProperty(t, e, s, i, r) {
                    return t.shorthand = !1,
                        this.eat(n.colon) ? (t.value = i ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssign(!1, r),
                            this.finishNode(t, "ObjectProperty")) : t.computed || "Identifier" !== t.key.type ? void 0 : (this.checkReservedWord(t.key.name, t.key.start, !0, !0),
                            i ? t.value = this.parseMaybeDefault(e, s, t.key.__clone()) : this.match(n.eq) && r ? (-1 === r.shorthandAssign && (r.shorthandAssign = this.state.start),
                                t.value = this.parseMaybeDefault(e, s, t.key.__clone())) : t.value = t.key.__clone(),
                            t.shorthand = !0,
                            this.finishNode(t, "ObjectProperty"))
                }
                parseObjPropValue(t, e, s, i, r, a, n, o) {
                    const h = this.parseObjectMethod(t, i, r, a, o) || this.parseObjectProperty(t, e, s, a, n);
                    return h || this.unexpected(),
                        h
                }
                parsePropertyName(t, e) {
                    if (this.eat(n.bracketL))
                        t.computed = !0,
                        t.key = this.parseMaybeAssign(),
                        this.expect(n.bracketR);
                    else {
                        const s = this.state.inPropertyName;
                        this.state.inPropertyName = !0,
                            t.key = this.match(n.num) || this.match(n.string) || this.match(n.bigint) ? this.parseExprAtom() : this.parseMaybePrivateName(e),
                            "PrivateName" !== t.key.type && (t.computed = !1),
                            this.state.inPropertyName = s
                    }
                    return t.key
                }
                initFunction(t, e) {
                    t.id = null,
                        t.generator = !1,
                        t.async = !!e
                }
                parseMethod(t, e, s, i, r, a, n = !1) {
                    const o = this.state.yieldPos,
                        h = this.state.awaitPos;
                    this.state.yieldPos = -1,
                        this.state.awaitPos = -1,
                        this.initFunction(t, s),
                        t.generator = !!e;
                    const p = i;
                    return this.scope.enter(18 | (n ? 64 : 0) | (r ? 32 : 0)),
                        this.prodParam.enter(et(s, t.generator)),
                        this.parseFunctionParams(t, p),
                        this.parseFunctionBodyAndFinish(t, a, !0),
                        this.prodParam.exit(),
                        this.scope.exit(),
                        this.state.yieldPos = o,
                        this.state.awaitPos = h,
                        t
                }
                parseArrowExpression(t, e, s, i) {
                    this.scope.enter(6),
                        this.prodParam.enter(et(s, !1)),
                        this.initFunction(t, s);
                    const r = this.state.maybeInArrowParameters,
                        a = this.state.yieldPos,
                        n = this.state.awaitPos;
                    return e && (this.state.maybeInArrowParameters = !0,
                            this.setArrowFunctionParameters(t, e, i)),
                        this.state.maybeInArrowParameters = !1,
                        this.state.yieldPos = -1,
                        this.state.awaitPos = -1,
                        this.parseFunctionBody(t, !0),
                        this.prodParam.exit(),
                        this.scope.exit(),
                        this.state.maybeInArrowParameters = r,
                        this.state.yieldPos = a,
                        this.state.awaitPos = n,
                        this.finishNode(t, "ArrowFunctionExpression")
                }
                setArrowFunctionParameters(t, e, s) {
                    t.params = this.toAssignableList(e, s)
                }
                parseFunctionBodyAndFinish(t, e, s = !1) {
                    this.parseFunctionBody(t, !1, s),
                        this.finishNode(t, e)
                }
                parseFunctionBody(t, e, s = !1) {
                    const i = e && !this.match(n.braceL),
                        r = this.state.inParameters;
                    if (this.state.inParameters = !1,
                        i)
                        t.body = this.parseMaybeAssign(),
                        this.checkParams(t, !1, e, !1);
                    else {
                        const i = this.state.strict,
                            r = this.state.labels;
                        this.state.labels = [],
                            this.prodParam.enter(4 | this.prodParam.currentFlags()),
                            t.body = this.parseBlock(!0, !1, r => {
                                const a = !this.isSimpleParamList(t.params);
                                if (r && a) {
                                    const e = "method" !== t.kind && "constructor" !== t.kind || !t.key ? t.start : t.key.end;
                                    this.raise(e, f.IllegalLanguageModeDirective)
                                }
                                const n = !i && this.state.strict;
                                this.checkParams(t, !(this.state.strict || e || s || a), e, n),
                                    this.state.strict && t.id && this.checkLVal(t.id, 65, void 0, "function name", void 0, n)
                            }),
                            this.prodParam.exit(),
                            this.state.labels = r
                    }
                    this.state.inParameters = r
                }
                isSimpleParamList(t) {
                    for (let e = 0, s = t.length; e < s; e++)
                        if ("Identifier" !== t[e].type)
                            return !1;
                    return !0
                }
                checkParams(t, e, s, i = !0) {
                    const r = Object.create(null);
                    for (let s = 0; s < t.params.length; s++)
                        this.checkLVal(t.params[s], 5, e ? null : r, "function parameter list", void 0, i)
                }
                parseExprList(t, e, s, i) {
                    const r = [];
                    let a = !0;
                    for (; !this.eat(t);) {
                        if (a)
                            a = !1;
                        else if (this.expect(n.comma),
                            this.match(t)) {
                            i && this.addExtra(i, "trailingComma", this.state.lastTokStart),
                                this.next();
                            break
                        }
                        r.push(this.parseExprListItem(e, s))
                    }
                    return r
                }
                parseExprListItem(t, e, s, i) {
                    let r;
                    if (t && this.match(n.comma))
                        r = null;
                    else if (this.match(n.ellipsis)) {
                        const t = this.state.start,
                            i = this.state.startLoc;
                        r = this.parseParenItem(this.parseSpread(e, s), t, i)
                    } else if (this.match(n.question)) {
                        this.expectPlugin("partialApplication"),
                            i || this.raise(this.state.start, f.UnexpectedArgumentPlaceholder);
                        const t = this.startNode();
                        this.next(),
                            r = this.finishNode(t, "ArgumentPlaceholder")
                    } else
                        r = this.parseMaybeAssign(!1, e, this.parseParenItem, s);
                    return r
                }
                parseIdentifier(t) {
                    const e = this.startNode(),
                        s = this.parseIdentifierName(e.start, t);
                    return this.createIdentifier(e, s)
                }
                createIdentifier(t, e) {
                    return t.name = e,
                        t.loc.identifierName = e,
                        this.finishNode(t, "Identifier")
                }
                parseIdentifierName(t, e) {
                    let s;
                    if (this.match(n.name))
                        s = this.state.value;
                    else {
                        if (!this.state.type.keyword)
                            throw this.unexpected();
                        s = this.state.type.keyword,
                            "class" !== s && "function" !== s || this.state.lastTokEnd === this.state.lastTokStart + 1 && 46 === this.input.charCodeAt(this.state.lastTokStart) || this.state.context.pop()
                    }
                    return e ? this.state.type = n.name : this.checkReservedWord(s, this.state.start, !!this.state.type.keyword, !1),
                        this.next(),
                        s
                }
                checkReservedWord(t, e, s, i) {
                    if (this.prodParam.hasYield && "yield" === t)
                        return void this.raise(e, f.YieldBindingIdentifier);
                    if ("await" === t) {
                        if (this.prodParam.hasAwait)
                            return void this.raise(e, f.AwaitBindingIdentifier); -
                        1 === this.state.awaitPos && (this.state.maybeInAsyncArrowHead || this.isAwaitAllowed()) && (this.state.awaitPos = this.state.start)
                    }
                    if (this.scope.inClass && !this.scope.inNonArrowFunction && "arguments" === t)
                        return void this.raise(e, f.ArgumentsDisallowedInInitializer);
                    if (s && function(t) {
                            return k.has(t)
                        }(t))
                        return void this.raise(e, f.UnexpectedKeyword, t);
                    (this.state.strict ? i ? O : B : L)(t, this.inModule) && (this.prodParam.hasAwait || "await" !== t ? this.raise(e, f.UnexpectedReservedWord, t) : this.raise(e, f.AwaitNotInAsyncFunction))
                }
                isAwaitAllowed() {
                    return this.scope.inFunction ? this.prodParam.hasAwait : !!this.options.allowAwaitOutsideFunction || !!this.hasPlugin("topLevelAwait") && (this.inModule && this.prodParam.hasAwait)
                }
                parseAwait() {
                    const t = this.startNode();
                    return this.next(),
                        this.state.inParameters ? this.raise(t.start, f.AwaitExpressionFormalParameter) : -1 === this.state.awaitPos && (this.state.awaitPos = t.start),
                        this.eat(n.star) && this.raise(t.start, f.ObsoleteAwaitStar),
                        this.scope.inFunction || this.options.allowAwaitOutsideFunction || (this.hasPrecedingLineBreak() || this.match(n.plusMin) || this.match(n.parenL) || this.match(n.bracketL) || this.match(n.backQuote) || this.match(n.regexp) || this.match(n.slash) || this.hasPlugin("v8intrinsic") && this.match(n.modulo) ? this.ambiguousScriptDifferentAst = !0 : this.sawUnambiguousESM = !0),
                        this.state.soloAwait || (t.argument = this.parseMaybeUnary()),
                        this.finishNode(t, "AwaitExpression")
                }
                parseYield(t) {
                    const e = this.startNode();
                    return this.state.inParameters ? this.raise(e.start, f.YieldInParameter) : -1 === this.state.yieldPos && (this.state.yieldPos = e.start),
                        this.next(),
                        this.match(n.semi) || !this.match(n.star) && !this.state.type.startsExpr || this.hasPrecedingLineBreak() ? (e.delegate = !1,
                            e.argument = null) : (e.delegate = this.eat(n.star),
                            e.argument = this.parseMaybeAssign(t)),
                        this.finishNode(e, "YieldExpression")
                }
                checkPipelineAtInfixOperator(t, e) {
                    "smart" === this.getPluginOption("pipelineOperator", "proposal") && "SequenceExpression" === t.type && this.raise(e, f.PipelineHeadSequenceExpression)
                }
                parseSmartPipelineBody(t, e, s) {
                    const i = this.checkSmartPipelineBodyStyle(t);
                    return this.checkSmartPipelineBodyEarlyErrors(t, i, e),
                        this.parseSmartPipelineBodyInStyle(t, i, e, s)
                }
                checkSmartPipelineBodyEarlyErrors(t, e, s) {
                    if (this.match(n.arrow))
                        throw this.raise(this.state.start, f.PipelineBodyNoArrow);
                    "PipelineTopicExpression" === e && "SequenceExpression" === t.type && this.raise(s, f.PipelineBodySequenceExpression)
                }
                parseSmartPipelineBodyInStyle(t, e, s, i) {
                    const r = this.startNodeAt(s, i);
                    switch (e) {
                        case "PipelineBareFunction":
                            r.callee = t;
                            break;
                        case "PipelineBareConstructor":
                            r.callee = t.callee;
                            break;
                        case "PipelineBareAwaitedFunction":
                            r.callee = t.argument;
                            break;
                        case "PipelineTopicExpression":
                            this.topicReferenceWasUsedInCurrentTopicContext() || this.raise(s, f.PipelineTopicUnused),
                                r.expression = t;
                            break;
                        default:
                            throw new Error("Internal @babel/parser error: Unknown pipeline style (".concat(e, ")"))
                    }
                    return this.finishNode(r, e)
                }
                checkSmartPipelineBodyStyle(t) {
                    return t.type,
                        this.isSimpleReference(t) ? "PipelineBareFunction" : "PipelineTopicExpression"
                }
                isSimpleReference(t) {
                    switch (t.type) {
                        case "MemberExpression":
                            return !t.computed && this.isSimpleReference(t.object);
                        case "Identifier":
                            return !0;
                        default:
                            return !1
                    }
                }
                withTopicPermittingContext(t) {
                    const e = this.state.topicContext;
                    this.state.topicContext = {
                        maxNumOfResolvableTopics: 1,
                        maxTopicIndex: null
                    };
                    try {
                        return t()
                    } finally {
                        this.state.topicContext = e
                    }
                }
                withTopicForbiddingContext(t) {
                    const e = this.state.topicContext;
                    this.state.topicContext = {
                        maxNumOfResolvableTopics: 0,
                        maxTopicIndex: null
                    };
                    try {
                        return t()
                    } finally {
                        this.state.topicContext = e
                    }
                }
                withSoloAwaitPermittingContext(t) {
                    const e = this.state.soloAwait;
                    this.state.soloAwait = !0;
                    try {
                        return t()
                    } finally {
                        this.state.soloAwait = e
                    }
                }
                registerTopicReference() {
                    this.state.topicContext.maxTopicIndex = 0
                }
                primaryTopicReferenceIsAllowedInCurrentTopicContext() {
                    return this.state.topicContext.maxNumOfResolvableTopics >= 1
                }
                topicReferenceWasUsedInCurrentTopicContext() {
                    return null != this.state.topicContext.maxTopicIndex && this.state.topicContext.maxTopicIndex >= 0
                }
                parseFSharpPipelineBody(t, e) {
                    const s = this.state.start,
                        i = this.state.startLoc;
                    this.state.potentialArrowAt = this.state.start;
                    const r = this.state.inFSharpPipelineDirectBody;
                    this.state.inFSharpPipelineDirectBody = !0;
                    const a = this.parseExprOp(this.parseMaybeUnary(), s, i, t, e);
                    return this.state.inFSharpPipelineDirectBody = r,
                        a
                }
            } {
                parseTopLevel(t, e) {
                    if (e.sourceType = this.options.sourceType,
                        e.interpreter = this.parseInterpreterDirective(),
                        this.parseBlockBody(e, !0, !0, n.eof),
                        this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0)
                        for (let t = 0, e = Array.from(this.scope.undefinedExports); t < e.length; t++) {
                            const [s] = e[t], i = this.scope.undefinedExports.get(s);
                            this.raise(i, f.ModuleExportUndefined, s)
                        }
                    return t.program = this.finishNode(e, "Program"),
                        t.comments = this.state.comments,
                        this.options.tokens && (t.tokens = this.tokens),
                        this.finishNode(t, "File")
                }
                stmtToDirective(t) {
                    const e = t.expression,
                        s = this.startNodeAt(e.start, e.loc.start),
                        i = this.startNodeAt(t.start, t.loc.start),
                        r = this.input.slice(e.start, e.end),
                        a = s.value = r.slice(1, -1);
                    return this.addExtra(s, "raw", r),
                        this.addExtra(s, "rawValue", a),
                        i.value = this.finishNodeAt(s, "DirectiveLiteral", e.end, e.loc.end),
                        this.finishNodeAt(i, "Directive", t.end, t.loc.end)
                }
                parseInterpreterDirective() {
                    if (!this.match(n.interpreterDirective))
                        return null;
                    const t = this.startNode();
                    return t.value = this.state.value,
                        this.next(),
                        this.finishNode(t, "InterpreterDirective")
                }
                isLet(t) {
                    if (!this.isContextual("let"))
                        return !1;
                    const e = this.nextTokenStart(),
                        s = this.input.charCodeAt(e);
                    if (91 === s)
                        return !0;
                    if (t)
                        return !1;
                    if (123 === s)
                        return !0;
                    if (w(s)) {
                        let t = e + 1;
                        for (; S(this.input.charCodeAt(t));)
                            ++t;
                        const s = this.input.slice(e, t);
                        if (!R.test(s))
                            return !0
                    }
                    return !1
                }
                parseStatement(t, e) {
                    return this.match(n.at) && this.parseDecorators(!0),
                        this.parseStatementContent(t, e)
                }
                parseStatementContent(t, e) {
                    let s = this.state.type;
                    const i = this.startNode();
                    let r;
                    switch (this.isLet(t) && (s = n._var,
                            r = "let"),
                        s) {
                        case n._break:
                        case n._continue:
                            return this.parseBreakContinueStatement(i, s.keyword);
                        case n._debugger:
                            return this.parseDebuggerStatement(i);
                        case n._do:
                            return this.parseDoStatement(i);
                        case n._for:
                            return this.parseForStatement(i);
                        case n._function:
                            if (46 === this.lookaheadCharCode())
                                break;
                            return t && (this.state.strict ? this.raise(this.state.start, f.StrictFunction) : "if" !== t && "label" !== t && this.raise(this.state.start, f.SloppyFunction)),
                                this.parseFunctionStatement(i, !1, !t);
                        case n._class:
                            return t && this.unexpected(),
                                this.parseClass(i, !0);
                        case n._if:
                            return this.parseIfStatement(i);
                        case n._return:
                            return this.parseReturnStatement(i);
                        case n._switch:
                            return this.parseSwitchStatement(i);
                        case n._throw:
                            return this.parseThrowStatement(i);
                        case n._try:
                            return this.parseTryStatement(i);
                        case n._const:
                        case n._var:
                            return r = r || this.state.value,
                                t && "var" !== r && this.raise(this.state.start, f.UnexpectedLexicalDeclaration),
                                this.parseVarStatement(i, r);
                        case n._while:
                            return this.parseWhileStatement(i);
                        case n._with:
                            return this.parseWithStatement(i);
                        case n.braceL:
                            return this.parseBlock();
                        case n.semi:
                            return this.parseEmptyStatement(i);
                        case n._export:
                        case n._import:
                            {
                                const t = this.lookaheadCharCode();
                                if (40 === t || 46 === t)
                                    break;
                                let r;
                                return this.options.allowImportExportEverywhere || e || this.raise(this.state.start, f.UnexpectedImportExport),
                                this.next(),
                                s === n._import ? (r = this.parseImport(i),
                                    "ImportDeclaration" !== r.type || r.importKind && "value" !== r.importKind || (this.sawUnambiguousESM = !0)) : (r = this.parseExport(i),
                                    ("ExportNamedDeclaration" !== r.type || r.exportKind && "value" !== r.exportKind) && ("ExportAllDeclaration" !== r.type || r.exportKind && "value" !== r.exportKind) && "ExportDefaultDeclaration" !== r.type || (this.sawUnambiguousESM = !0)),
                                this.assertModuleNodeAllowed(i),
                                r
                            }
                        default:
                            if (this.isAsyncFunction())
                                return t && this.raise(this.state.start, f.AsyncFunctionInSingleStatementContext),
                                    this.next(),
                                    this.parseFunctionStatement(i, !0, !t)
                    }
                    const a = this.state.value,
                        o = this.parseExpression();
                    return s === n.name && "Identifier" === o.type && this.eat(n.colon) ? this.parseLabeledStatement(i, a, o, t) : this.parseExpressionStatement(i, o)
                }
                assertModuleNodeAllowed(t) {
                    this.options.allowImportExportEverywhere || this.inModule || this.raiseWithData(t.start, {
                        code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
                    }, f.ImportOutsideModule)
                }
                takeDecorators(t) {
                    const e = this.state.decoratorStack[this.state.decoratorStack.length - 1];
                    e.length && (t.decorators = e,
                        this.resetStartLocationFromNode(t, e[0]),
                        this.state.decoratorStack[this.state.decoratorStack.length - 1] = [])
                }
                canHaveLeadingDecorator() {
                    return this.match(n._class)
                }
                parseDecorators(t) {
                    const e = this.state.decoratorStack[this.state.decoratorStack.length - 1];
                    for (; this.match(n.at);) {
                        const t = this.parseDecorator();
                        e.push(t)
                    }
                    if (this.match(n._export))
                        t || this.unexpected(),
                        this.hasPlugin("decorators") && !this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(this.state.start, f.DecoratorExportClass);
                    else if (!this.canHaveLeadingDecorator())
                        throw this.raise(this.state.start, f.UnexpectedLeadingDecorator)
                }
                parseDecorator() {
                    this.expectOnePlugin(["decorators-legacy", "decorators"]);
                    const t = this.startNode();
                    if (this.next(),
                        this.hasPlugin("decorators")) {
                        this.state.decoratorStack.push([]);
                        const e = this.state.start,
                            s = this.state.startLoc;
                        let i;
                        if (this.eat(n.parenL))
                            i = this.parseExpression(),
                            this.expect(n.parenR);
                        else
                            for (i = this.parseIdentifier(!1); this.eat(n.dot);) {
                                const t = this.startNodeAt(e, s);
                                t.object = i,
                                    t.property = this.parseIdentifier(!0),
                                    t.computed = !1,
                                    i = this.finishNode(t, "MemberExpression")
                            }
                        t.expression = this.parseMaybeDecoratorArguments(i),
                            this.state.decoratorStack.pop()
                    } else
                        t.expression = this.parseExprSubscripts();
                    return this.finishNode(t, "Decorator")
                }
                parseMaybeDecoratorArguments(t) {
                    if (this.eat(n.parenL)) {
                        const e = this.startNodeAtNode(t);
                        return e.callee = t,
                            e.arguments = this.parseCallExpressionArguments(n.parenR, !1),
                            this.toReferencedList(e.arguments),
                            this.finishNode(e, "CallExpression")
                    }
                    return t
                }
                parseBreakContinueStatement(t, e) {
                    const s = "break" === e;
                    return this.next(),
                        this.isLineTerminator() ? t.label = null : (t.label = this.parseIdentifier(),
                            this.semicolon()),
                        this.verifyBreakContinue(t, e),
                        this.finishNode(t, s ? "BreakStatement" : "ContinueStatement")
                }
                verifyBreakContinue(t, e) {
                    const s = "break" === e;
                    let i;
                    for (i = 0; i < this.state.labels.length; ++i) {
                        const e = this.state.labels[i];
                        if (null == t.label || e.name === t.label.name) {
                            if (null != e.kind && (s || "loop" === e.kind))
                                break;
                            if (t.label && s)
                                break
                        }
                    }
                    i === this.state.labels.length && this.raise(t.start, f.IllegalBreakContinue, e)
                }
                parseDebuggerStatement(t) {
                    return this.next(),
                        this.semicolon(),
                        this.finishNode(t, "DebuggerStatement")
                }
                parseHeaderExpression() {
                    this.expect(n.parenL);
                    const t = this.parseExpression();
                    return this.expect(n.parenR),
                        t
                }
                parseDoStatement(t) {
                    return this.next(),
                        this.state.labels.push(Et),
                        t.body = this.withTopicForbiddingContext(() => this.parseStatement("do")),
                        this.state.labels.pop(),
                        this.expect(n._while),
                        t.test = this.parseHeaderExpression(),
                        this.eat(n.semi),
                        this.finishNode(t, "DoWhileStatement")
                }
                parseForStatement(t) {
                    this.next(),
                        this.state.labels.push(Et);
                    let e = -1;
                    if (this.isAwaitAllowed() && this.eatContextual("await") && (e = this.state.lastTokStart),
                        this.scope.enter(0),
                        this.expect(n.parenL),
                        this.match(n.semi))
                        return e > -1 && this.unexpected(e),
                            this.parseFor(t, null);
                    const s = this.isLet();
                    if (this.match(n._var) || this.match(n._const) || s) {
                        const i = this.startNode(),
                            r = s ? "let" : this.state.value;
                        return this.next(),
                            this.parseVar(i, !0, r),
                            this.finishNode(i, "VariableDeclaration"),
                            (this.match(n._in) || this.isContextual("of")) && 1 === i.declarations.length ? this.parseForIn(t, i, e) : (e > -1 && this.unexpected(e),
                                this.parseFor(t, i))
                    }
                    const i = new xt,
                        r = this.parseExpression(!0, i);
                    if (this.match(n._in) || this.isContextual("of")) {
                        this.toAssignable(r);
                        const s = this.isContextual("of") ? "for-of statement" : "for-in statement";
                        return this.checkLVal(r, void 0, void 0, s),
                            this.parseForIn(t, r, e)
                    }
                    return this.checkExpressionErrors(i, !0),
                        e > -1 && this.unexpected(e),
                        this.parseFor(t, r)
                }
                parseFunctionStatement(t, e, s) {
                    return this.next(),
                        this.parseFunction(t, 1 | (s ? 0 : 2), e)
                }
                parseIfStatement(t) {
                    return this.next(),
                        t.test = this.parseHeaderExpression(),
                        t.consequent = this.parseStatement("if"),
                        t.alternate = this.eat(n._else) ? this.parseStatement("if") : null,
                        this.finishNode(t, "IfStatement")
                }
                parseReturnStatement(t) {
                    return this.prodParam.hasReturn || this.options.allowReturnOutsideFunction || this.raise(this.state.start, f.IllegalReturn),
                        this.next(),
                        this.isLineTerminator() ? t.argument = null : (t.argument = this.parseExpression(),
                            this.semicolon()),
                        this.finishNode(t, "ReturnStatement")
                }
                parseSwitchStatement(t) {
                    this.next(),
                        t.discriminant = this.parseHeaderExpression();
                    const e = t.cases = [];
                    let s, i;
                    for (this.expect(n.braceL),
                        this.state.labels.push(Ct),
                        this.scope.enter(0); !this.match(n.braceR);)
                        if (this.match(n._case) || this.match(n._default)) {
                            const t = this.match(n._case);
                            s && this.finishNode(s, "SwitchCase"),
                                e.push(s = this.startNode()),
                                s.consequent = [],
                                this.next(),
                                t ? s.test = this.parseExpression() : (i && this.raise(this.state.lastTokStart, f.MultipleDefaultsInSwitch),
                                    i = !0,
                                    s.test = null),
                                this.expect(n.colon)
                        } else
                            s ? s.consequent.push(this.parseStatement(null)) : this.unexpected();
                    return this.scope.exit(),
                        s && this.finishNode(s, "SwitchCase"),
                        this.next(),
                        this.state.labels.pop(),
                        this.finishNode(t, "SwitchStatement")
                }
                parseThrowStatement(t) {
                    return this.next(),
                        o.test(this.input.slice(this.state.lastTokEnd, this.state.start)) && this.raise(this.state.lastTokEnd, f.NewlineAfterThrow),
                        t.argument = this.parseExpression(),
                        this.semicolon(),
                        this.finishNode(t, "ThrowStatement")
                }
                parseTryStatement(t) {
                    if (this.next(),
                        t.block = this.parseBlock(),
                        t.handler = null,
                        this.match(n._catch)) {
                        const e = this.startNode();
                        if (this.next(),
                            this.match(n.parenL)) {
                            this.expect(n.parenL),
                                e.param = this.parseBindingAtom();
                            const t = "Identifier" === e.param.type;
                            this.scope.enter(t ? 8 : 0),
                                this.checkLVal(e.param, 9, null, "catch clause"),
                                this.expect(n.parenR)
                        } else
                            e.param = null,
                            this.scope.enter(0);
                        e.body = this.withTopicForbiddingContext(() => this.parseBlock(!1, !1)),
                            this.scope.exit(),
                            t.handler = this.finishNode(e, "CatchClause")
                    }
                    return t.finalizer = this.eat(n._finally) ? this.parseBlock() : null,
                        t.handler || t.finalizer || this.raise(t.start, f.NoCatchOrFinally),
                        this.finishNode(t, "TryStatement")
                }
                parseVarStatement(t, e) {
                    return this.next(),
                        this.parseVar(t, !1, e),
                        this.semicolon(),
                        this.finishNode(t, "VariableDeclaration")
                }
                parseWhileStatement(t) {
                    return this.next(),
                        t.test = this.parseHeaderExpression(),
                        this.state.labels.push(Et),
                        t.body = this.withTopicForbiddingContext(() => this.parseStatement("while")),
                        this.state.labels.pop(),
                        this.finishNode(t, "WhileStatement")
                }
                parseWithStatement(t) {
                    return this.state.strict && this.raise(this.state.start, f.StrictWith),
                        this.next(),
                        t.object = this.parseHeaderExpression(),
                        t.body = this.withTopicForbiddingContext(() => this.parseStatement("with")),
                        this.finishNode(t, "WithStatement")
                }
                parseEmptyStatement(t) {
                    return this.next(),
                        this.finishNode(t, "EmptyStatement")
                }
                parseLabeledStatement(t, e, s, i) {
                    for (let t = 0, i = this.state.labels; t < i.length; t++) {
                        i[t].name === e && this.raise(s.start, f.LabelRedeclaration, e)
                    }
                    const r = this.state.type.isLoop ? "loop" : this.match(n._switch) ? "switch" : null;
                    for (let e = this.state.labels.length - 1; e >= 0; e--) {
                        const s = this.state.labels[e];
                        if (s.statementStart !== t.start)
                            break;
                        s.statementStart = this.state.start,
                            s.kind = r
                    }
                    return this.state.labels.push({
                            name: e,
                            kind: r,
                            statementStart: this.state.start
                        }),
                        t.body = this.parseStatement(i ? -1 === i.indexOf("label") ? i + "label" : i : "label"),
                        this.state.labels.pop(),
                        t.label = s,
                        this.finishNode(t, "LabeledStatement")
                }
                parseExpressionStatement(t, e) {
                    return t.expression = e,
                        this.semicolon(),
                        this.finishNode(t, "ExpressionStatement")
                }
                parseBlock(t = !1, e = !0, s) {
                    const i = this.startNode();
                    return this.expect(n.braceL),
                        e && this.scope.enter(0),
                        this.parseBlockBody(i, t, !1, n.braceR, s),
                        e && this.scope.exit(),
                        this.finishNode(i, "BlockStatement")
                }
                isValidDirective(t) {
                    return "ExpressionStatement" === t.type && "StringLiteral" === t.expression.type && !t.expression.extra.parenthesized
                }
                parseBlockBody(t, e, s, i, r) {
                    const a = t.body = [],
                        n = t.directives = [];
                    this.parseBlockOrModuleBlockBody(a, e ? n : void 0, s, i, r)
                }
                parseBlockOrModuleBlockBody(t, e, s, i, r) {
                    const a = [],
                        n = this.state.strict;
                    let o = !1,
                        h = !1;
                    for (; !this.match(i);) {
                        !h && this.state.octalPositions.length && a.push(...this.state.octalPositions);
                        const i = this.parseStatement(null, s);
                        if (e && !h && this.isValidDirective(i)) {
                            const t = this.stmtToDirective(i);
                            e.push(t),
                                o || "use strict" !== t.value.value || (o = !0,
                                    this.setStrict(!0))
                        } else
                            h = !0,
                            t.push(i)
                    }
                    if (this.state.strict && a.length)
                        for (let t = 0; t < a.length; t++) {
                            const e = a[t];
                            this.raise(e, f.StrictOctalLiteral)
                        }
                    r && r.call(this, o),
                        n || this.setStrict(!1),
                        this.next()
                }
                parseFor(t, e) {
                    return t.init = e,
                        this.expect(n.semi),
                        t.test = this.match(n.semi) ? null : this.parseExpression(),
                        this.expect(n.semi),
                        t.update = this.match(n.parenR) ? null : this.parseExpression(),
                        this.expect(n.parenR),
                        t.body = this.withTopicForbiddingContext(() => this.parseStatement("for")),
                        this.scope.exit(),
                        this.state.labels.pop(),
                        this.finishNode(t, "ForStatement")
                }
                parseForIn(t, e, s) {
                    const i = this.match(n._in);
                    return this.next(),
                        i ? s > -1 && this.unexpected(s) : t.await = s > -1,
                        "VariableDeclaration" !== e.type || null == e.declarations[0].init || i && !this.state.strict && "var" === e.kind && "Identifier" === e.declarations[0].id.type ? "AssignmentPattern" === e.type && this.raise(e.start, f.InvalidLhs, "for-loop") : this.raise(e.start, f.ForInOfLoopInitializer, i ? "for-in" : "for-of"),
                        t.left = e,
                        t.right = i ? this.parseExpression() : this.parseMaybeAssign(),
                        this.expect(n.parenR),
                        t.body = this.withTopicForbiddingContext(() => this.parseStatement("for")),
                        this.scope.exit(),
                        this.state.labels.pop(),
                        this.finishNode(t, i ? "ForInStatement" : "ForOfStatement")
                }
                parseVar(t, e, s) {
                    const i = t.declarations = [],
                        r = this.hasPlugin("typescript");
                    for (t.kind = s;;) {
                        const t = this.startNode();
                        if (this.parseVarId(t, s),
                            this.eat(n.eq) ? t.init = this.parseMaybeAssign(e) : ("const" !== s || this.match(n._in) || this.isContextual("of") ? "Identifier" === t.id.type || e && (this.match(n._in) || this.isContextual("of")) || this.raise(this.state.lastTokEnd, f.DeclarationMissingInitializer, "Complex binding patterns") : r || this.unexpected(),
                                t.init = null),
                            i.push(this.finishNode(t, "VariableDeclarator")), !this.eat(n.comma))
                            break
                    }
                    return t
                }
                parseVarId(t, e) {
                    t.id = this.parseBindingAtom(),
                        this.checkLVal(t.id, "var" === e ? 5 : 9, void 0, "variable declaration", "var" !== e)
                }
                parseFunction(t, e = 0, s = !1) {
                    const i = 1 & e,
                        r = 2 & e,
                        a = !(!i || 4 & e);
                    this.initFunction(t, s),
                        this.match(n.star) && r && this.raise(this.state.start, f.GeneratorInSingleStatementContext),
                        t.generator = this.eat(n.star),
                        i && (t.id = this.parseFunctionId(a));
                    const o = this.state.maybeInArrowParameters,
                        h = this.state.yieldPos,
                        p = this.state.awaitPos;
                    return this.state.maybeInArrowParameters = !1,
                        this.state.yieldPos = -1,
                        this.state.awaitPos = -1,
                        this.scope.enter(2),
                        this.prodParam.enter(et(s, t.generator)),
                        i || (t.id = this.parseFunctionId()),
                        this.parseFunctionParams(t),
                        this.withTopicForbiddingContext(() => {
                            this.parseFunctionBodyAndFinish(t, i ? "FunctionDeclaration" : "FunctionExpression")
                        }),
                        this.prodParam.exit(),
                        this.scope.exit(),
                        i && !r && this.registerFunctionStatementId(t),
                        this.state.maybeInArrowParameters = o,
                        this.state.yieldPos = h,
                        this.state.awaitPos = p,
                        t
                }
                parseFunctionId(t) {
                    return t || this.match(n.name) ? this.parseIdentifier() : null
                }
                parseFunctionParams(t, e) {
                    const s = this.state.inParameters;
                    this.state.inParameters = !0,
                        this.expect(n.parenL),
                        t.params = this.parseBindingList(n.parenR, 41, !1, e),
                        this.state.inParameters = s,
                        this.checkYieldAwaitInDefaultParams()
                }
                registerFunctionStatementId(t) {
                    t.id && this.scope.declareName(t.id.name, this.state.strict || t.generator || t.async ? this.scope.treatFunctionsAsVar ? 5 : 9 : 17, t.id.start)
                }
                parseClass(t, e, s) {
                    this.next(),
                        this.takeDecorators(t);
                    const i = this.state.strict;
                    return this.state.strict = !0,
                        this.parseClassId(t, e, s),
                        this.parseClassSuper(t),
                        t.body = this.parseClassBody(!!t.superClass, i),
                        this.state.strict = i,
                        this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression")
                }
                isClassProperty() {
                    return this.match(n.eq) || this.match(n.semi) || this.match(n.braceR)
                }
                isClassMethod() {
                    return this.match(n.parenL)
                }
                isNonstaticConstructor(t) {
                    return !(t.computed || t.static || "constructor" !== t.key.name && "constructor" !== t.key.value)
                }
                parseClassBody(t, e) {
                    this.classScope.enter();
                    const s = {
                        hadConstructor: !1
                    };
                    let i = [];
                    const r = this.startNode();
                    if (r.body = [],
                        this.expect(n.braceL),
                        this.withTopicForbiddingContext(() => {
                            for (; !this.match(n.braceR);) {
                                if (this.eat(n.semi)) {
                                    if (i.length > 0)
                                        throw this.raise(this.state.lastTokEnd, f.DecoratorSemicolon);
                                    continue
                                }
                                if (this.match(n.at)) {
                                    i.push(this.parseDecorator());
                                    continue
                                }
                                const e = this.startNode();
                                i.length && (e.decorators = i,
                                        this.resetStartLocationFromNode(e, i[0]),
                                        i = []),
                                    this.parseClassMember(r, e, s, t),
                                    "constructor" === e.kind && e.decorators && e.decorators.length > 0 && this.raise(e.start, f.DecoratorConstructor)
                            }
                        }),
                        e || (this.state.strict = !1),
                        this.next(),
                        i.length)
                        throw this.raise(this.state.start, f.TrailingDecorator);
                    return this.classScope.exit(),
                        this.finishNode(r, "ClassBody")
                }
                parseClassMemberFromModifier(t, e) {
                    const s = this.state.containsEsc,
                        i = this.parseIdentifier(!0);
                    if (this.isClassMethod()) {
                        const s = e;
                        return s.kind = "method",
                            s.computed = !1,
                            s.key = i,
                            s.static = !1,
                            this.pushClassMethod(t, s, !1, !1, !1, !1), !0
                    }
                    if (this.isClassProperty()) {
                        const s = e;
                        return s.computed = !1,
                            s.key = i,
                            s.static = !1,
                            t.body.push(this.parseClassProperty(s)), !0
                    }
                    if (s)
                        throw this.unexpected();
                    return !1
                }
                parseClassMember(t, e, s, i) {
                    const r = this.isContextual("static");
                    r && this.parseClassMemberFromModifier(t, e) || this.parseClassMemberWithIsStatic(t, e, s, r, i)
                }
                parseClassMemberWithIsStatic(t, e, s, i, r) {
                    const a = e,
                        o = e,
                        h = e,
                        p = e,
                        c = a,
                        u = a;
                    if (e.static = i,
                        this.eat(n.star))
                        return c.kind = "method",
                            this.parseClassPropertyName(c),
                            "PrivateName" === c.key.type ? void this.pushClassPrivateMethod(t, o, !0, !1) : (this.isNonstaticConstructor(a) && this.raise(a.key.start, f.ConstructorIsGenerator),
                                void this.pushClassMethod(t, a, !0, !1, !1, !1));
                    const l = this.state.containsEsc,
                        d = this.parseClassPropertyName(e),
                        m = "PrivateName" === d.type,
                        D = "Identifier" === d.type,
                        y = this.state.start;
                    if (this.parsePostMemberNameModifiers(u),
                        this.isClassMethod()) {
                        if (c.kind = "method",
                            m)
                            return void this.pushClassPrivateMethod(t, o, !1, !1);
                        const e = this.isNonstaticConstructor(a);
                        let i = !1;
                        e && (a.kind = "constructor",
                                s.hadConstructor && !this.hasPlugin("typescript") && this.raise(d.start, f.DuplicateConstructor),
                                s.hadConstructor = !0,
                                i = r),
                            this.pushClassMethod(t, a, !1, !1, e, i)
                    } else if (this.isClassProperty())
                        m ? this.pushClassPrivateProperty(t, p) : this.pushClassProperty(t, h);
                    else if (!D || "async" !== d.name || l || this.isLineTerminator())
                        !D || "get" !== d.name && "set" !== d.name || l || this.match(n.star) && this.isLineTerminator() ? this.isLineTerminator() ? m ? this.pushClassPrivateProperty(t, p) : this.pushClassProperty(t, h) : this.unexpected() : (c.kind = d.name,
                            this.parseClassPropertyName(a),
                            "PrivateName" === c.key.type ? this.pushClassPrivateMethod(t, o, !1, !1) : (this.isNonstaticConstructor(a) && this.raise(a.key.start, f.ConstructorIsAccessor),
                                this.pushClassMethod(t, a, !1, !1, !1, !1)),
                            this.checkGetterSetterParams(a));
                    else {
                        const e = this.eat(n.star);
                        u.optional && this.unexpected(y),
                            c.kind = "method",
                            this.parseClassPropertyName(c),
                            this.parsePostMemberNameModifiers(u),
                            "PrivateName" === c.key.type ? this.pushClassPrivateMethod(t, o, e, !0) : (this.isNonstaticConstructor(a) && this.raise(a.key.start, f.ConstructorIsAsync),
                                this.pushClassMethod(t, a, e, !0, !1, !1))
                    }
                }
                parseClassPropertyName(t) {
                    const e = this.parsePropertyName(t, !0);
                    return t.computed || !t.static || "prototype" !== e.name && "prototype" !== e.value || this.raise(e.start, f.StaticPrototype),
                        "PrivateName" === e.type && "constructor" === e.id.name && this.raise(e.start, f.ConstructorClassPrivateField),
                        e
                }
                pushClassProperty(t, e) {
                    e.computed || "constructor" !== e.key.name && "constructor" !== e.key.value || this.raise(e.key.start, f.ConstructorClassField),
                        t.body.push(this.parseClassProperty(e))
                }
                pushClassPrivateProperty(t, e) {
                    this.expectPlugin("classPrivateProperties", e.key.start);
                    const s = this.parseClassPrivateProperty(e);
                    t.body.push(s),
                        this.classScope.declarePrivateName(s.key.id.name, 0, s.key.start)
                }
                pushClassMethod(t, e, s, i, r, a) {
                    t.body.push(this.parseMethod(e, s, i, r, a, "ClassMethod", !0))
                }
                pushClassPrivateMethod(t, e, s, i) {
                    this.expectPlugin("classPrivateMethods", e.key.start);
                    const r = this.parseMethod(e, s, i, !1, !1, "ClassPrivateMethod", !0);
                    t.body.push(r);
                    const a = "get" === r.kind ? r.static ? 6 : 2 : "set" === r.kind ? r.static ? 5 : 1 : 0;
                    this.classScope.declarePrivateName(r.key.id.name, a, r.key.start)
                }
                parsePostMemberNameModifiers(t) {}
                parseAccessModifier() {}
                parseClassPrivateProperty(t) {
                    return this.scope.enter(80),
                        this.prodParam.enter(0),
                        t.value = this.eat(n.eq) ? this.parseMaybeAssign() : null,
                        this.semicolon(),
                        this.prodParam.exit(),
                        this.scope.exit(),
                        this.finishNode(t, "ClassPrivateProperty")
                }
                parseClassProperty(t) {
                    return t.typeAnnotation || this.expectPlugin("classProperties"),
                        this.scope.enter(80),
                        this.prodParam.enter(0),
                        this.match(n.eq) ? (this.expectPlugin("classProperties"),
                            this.next(),
                            t.value = this.parseMaybeAssign()) : t.value = null,
                        this.semicolon(),
                        this.prodParam.exit(),
                        this.scope.exit(),
                        this.finishNode(t, "ClassProperty")
                }
                parseClassId(t, e, s, i = 139) {
                    this.match(n.name) ? (t.id = this.parseIdentifier(),
                        e && this.checkLVal(t.id, i, void 0, "class name")) : s || !e ? t.id = null : this.unexpected(null, f.MissingClassName)
                }
                parseClassSuper(t) {
                    t.superClass = this.eat(n._extends) ? this.parseExprSubscripts() : null
                }
                parseExport(t) {
                    const e = this.maybeParseExportDefaultSpecifier(t),
                        s = !e || this.eat(n.comma),
                        i = s && this.eatExportStar(t),
                        r = i && this.maybeParseExportNamespaceSpecifier(t),
                        a = s && (!r || this.eat(n.comma)),
                        o = e || i;
                    if (i && !r)
                        return e && this.unexpected(),
                            this.parseExportFrom(t, !0),
                            this.finishNode(t, "ExportAllDeclaration");
                    const h = this.maybeParseExportNamedSpecifiers(t);
                    if (e && s && !i && !h || r && a && !h)
                        throw this.unexpected(null, n.braceL);
                    let p;
                    if (o || h ? (p = !1,
                            this.parseExportFrom(t, o)) : p = this.maybeParseExportDeclaration(t),
                        o || h || p)
                        return this.checkExport(t, !0, !1, !!t.source),
                            this.finishNode(t, "ExportNamedDeclaration");
                    if (this.eat(n._default))
                        return t.declaration = this.parseExportDefaultExpression(),
                            this.checkExport(t, !0, !0),
                            this.finishNode(t, "ExportDefaultDeclaration");
                    throw this.unexpected(null, n.braceL)
                }
                eatExportStar(t) {
                    return this.eat(n.star)
                }
                maybeParseExportDefaultSpecifier(t) {
                    if (this.isExportDefaultSpecifier()) {
                        this.expectPlugin("exportDefaultFrom");
                        const e = this.startNode();
                        return e.exported = this.parseIdentifier(!0),
                            t.specifiers = [this.finishNode(e, "ExportDefaultSpecifier")], !0
                    }
                    return !1
                }
                maybeParseExportNamespaceSpecifier(t) {
                    if (this.isContextual("as")) {
                        t.specifiers || (t.specifiers = []);
                        const e = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
                        return this.next(),
                            e.exported = this.parseIdentifier(!0),
                            t.specifiers.push(this.finishNode(e, "ExportNamespaceSpecifier")), !0
                    }
                    return !1
                }
                maybeParseExportNamedSpecifiers(t) {
                    return !!this.match(n.braceL) && (t.specifiers || (t.specifiers = []),
                        t.specifiers.push(...this.parseExportSpecifiers()),
                        t.source = null,
                        t.declaration = null, !0)
                }
                maybeParseExportDeclaration(t) {
                    if (this.shouldParseExportDeclaration()) {
                        if (this.isContextual("async")) {
                            const t = this.nextTokenStart();
                            this.isUnparsedContextual(t, "function") || this.unexpected(t, n._function)
                        }
                        return t.specifiers = [],
                            t.source = null,
                            t.declaration = this.parseExportDeclaration(t), !0
                    }
                    return !1
                }
                isAsyncFunction() {
                    if (!this.isContextual("async"))
                        return !1;
                    const t = this.nextTokenStart();
                    return !o.test(this.input.slice(this.state.pos, t)) && this.isUnparsedContextual(t, "function")
                }
                parseExportDefaultExpression() {
                    const t = this.startNode(),
                        e = this.isAsyncFunction();
                    if (this.match(n._function) || e)
                        return this.next(),
                            e && this.next(),
                            this.parseFunction(t, 5, e);
                    if (this.match(n._class))
                        return this.parseClass(t, !0, !0);
                    if (this.match(n.at))
                        return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(this.state.start, f.DecoratorBeforeExport),
                            this.parseDecorators(!1),
                            this.parseClass(t, !0, !0);
                    if (this.match(n._const) || this.match(n._var) || this.isLet())
                        throw this.raise(this.state.start, f.UnsupportedDefaultExport); {
                        const t = this.parseMaybeAssign();
                        return this.semicolon(),
                            t
                    }
                }
                parseExportDeclaration(t) {
                    return this.parseStatement(null)
                }
                isExportDefaultSpecifier() {
                    if (this.match(n.name))
                        return "async" !== this.state.value && "let" !== this.state.value;
                    if (!this.match(n._default))
                        return !1;
                    const t = this.nextTokenStart();
                    return 44 === this.input.charCodeAt(t) || this.isUnparsedContextual(t, "from")
                }
                parseExportFrom(t, e) {
                    this.eatContextual("from") ? (t.source = this.parseImportSource(),
                            this.checkExport(t)) : e ? this.unexpected() : t.source = null,
                        this.semicolon()
                }
                shouldParseExportDeclaration() {
                    if (this.match(n.at) && (this.expectOnePlugin(["decorators", "decorators-legacy"]),
                            this.hasPlugin("decorators"))) {
                        if (!this.getPluginOption("decorators", "decoratorsBeforeExport"))
                            return !0;
                        this.unexpected(this.state.start, f.DecoratorBeforeExport)
                    }
                    return "var" === this.state.type.keyword || "const" === this.state.type.keyword || "function" === this.state.type.keyword || "class" === this.state.type.keyword || this.isLet() || this.isAsyncFunction()
                }
                checkExport(t, e, s, i) {
                    if (e)
                        if (s)
                            this.checkDuplicateExports(t, "default");
                        else if (t.specifiers && t.specifiers.length)
                        for (let e = 0, s = t.specifiers; e < s.length; e++) {
                            const t = s[e];
                            this.checkDuplicateExports(t, t.exported.name), !i && t.local && (this.checkReservedWord(t.local.name, t.local.start, !0, !1),
                                this.scope.checkLocalExport(t.local))
                        }
                    else if (t.declaration)
                        if ("FunctionDeclaration" === t.declaration.type || "ClassDeclaration" === t.declaration.type) {
                            const e = t.declaration.id;
                            if (!e)
                                throw new Error("Assertion failure");
                            this.checkDuplicateExports(t, e.name)
                        } else if ("VariableDeclaration" === t.declaration.type)
                        for (let e = 0, s = t.declaration.declarations; e < s.length; e++) {
                            const t = s[e];
                            this.checkDeclaration(t.id)
                        }
                    if (this.state.decoratorStack[this.state.decoratorStack.length - 1].length) {
                        const e = t.declaration && ("ClassDeclaration" === t.declaration.type || "ClassExpression" === t.declaration.type);
                        if (!t.declaration || !e)
                            throw this.raise(t.start, f.UnsupportedDecoratorExport);
                        this.takeDecorators(t.declaration)
                    }
                }
                checkDeclaration(t) {
                    if ("Identifier" === t.type)
                        this.checkDuplicateExports(t, t.name);
                    else if ("ObjectPattern" === t.type)
                        for (let e = 0, s = t.properties; e < s.length; e++) {
                            const t = s[e];
                            this.checkDeclaration(t)
                        }
                    else if ("ArrayPattern" === t.type)
                        for (let e = 0, s = t.elements; e < s.length; e++) {
                            const t = s[e];
                            t && this.checkDeclaration(t)
                        }
                    else
                        "ObjectProperty" === t.type ? this.checkDeclaration(t.value) : "RestElement" === t.type ? this.checkDeclaration(t.argument) : "AssignmentPattern" === t.type && this.checkDeclaration(t.left)
                }
                checkDuplicateExports(t, e) {
                    this.state.exportedIdentifiers.indexOf(e) > -1 && this.raise(t.start, "default" === e ? f.DuplicateDefaultExport : f.DuplicateExport, e),
                        this.state.exportedIdentifiers.push(e)
                }
                parseExportSpecifiers() {
                    const t = [];
                    let e = !0;
                    for (this.expect(n.braceL); !this.eat(n.braceR);) {
                        if (e)
                            e = !1;
                        else if (this.expect(n.comma),
                            this.eat(n.braceR))
                            break;
                        const s = this.startNode();
                        s.local = this.parseIdentifier(!0),
                            s.exported = this.eatContextual("as") ? this.parseIdentifier(!0) : s.local.__clone(),
                            t.push(this.finishNode(s, "ExportSpecifier"))
                    }
                    return t
                }
                parseImport(t) {
                    if (t.specifiers = [], !this.match(n.string)) {
                        const e = !this.maybeParseDefaultImportSpecifier(t) || this.eat(n.comma),
                            s = e && this.maybeParseStarImportSpecifier(t);
                        e && !s && this.parseNamedImportSpecifiers(t),
                            this.expectContextual("from")
                    }
                    return t.source = this.parseImportSource(),
                        this.semicolon(),
                        this.finishNode(t, "ImportDeclaration")
                }
                parseImportSource() {
                    return this.match(n.string) || this.unexpected(),
                        this.parseExprAtom()
                }
                shouldParseDefaultImport(t) {
                    return this.match(n.name)
                }
                parseImportSpecifierLocal(t, e, s, i) {
                    e.local = this.parseIdentifier(),
                        this.checkLVal(e.local, 9, void 0, i),
                        t.specifiers.push(this.finishNode(e, s))
                }
                maybeParseDefaultImportSpecifier(t) {
                    return !!this.shouldParseDefaultImport(t) && (this.parseImportSpecifierLocal(t, this.startNode(), "ImportDefaultSpecifier", "default import specifier"), !0)
                }
                maybeParseStarImportSpecifier(t) {
                    if (this.match(n.star)) {
                        const e = this.startNode();
                        return this.next(),
                            this.expectContextual("as"),
                            this.parseImportSpecifierLocal(t, e, "ImportNamespaceSpecifier", "import namespace specifier"), !0
                    }
                    return !1
                }
                parseNamedImportSpecifiers(t) {
                    let e = !0;
                    for (this.expect(n.braceL); !this.eat(n.braceR);) {
                        if (e)
                            e = !1;
                        else {
                            if (this.eat(n.colon))
                                throw this.raise(this.state.start, f.DestructureNamedImport);
                            if (this.expect(n.comma),
                                this.eat(n.braceR))
                                break
                        }
                        this.parseImportSpecifier(t)
                    }
                }
                parseImportSpecifier(t) {
                    const e = this.startNode();
                    e.imported = this.parseIdentifier(!0),
                        this.eatContextual("as") ? e.local = this.parseIdentifier() : (this.checkReservedWord(e.imported.name, e.start, !0, !0),
                            e.local = e.imported.__clone()),
                        this.checkLVal(e.local, 9, void 0, "import specifier"),
                        t.specifiers.push(this.finishNode(e, "ImportSpecifier"))
                }
            } {
                constructor(t, e) {
                    super(t = function(t) {
                        const e = {};
                        for (let s = 0, i = Object.keys(ut); s < i.length; s++) {
                            const r = i[s];
                            e[r] = t && null != t[r] ? t[r] : ut[r]
                        }
                        return e
                    }(t), e);
                    const s = this.getScopeHandler();
                    this.options = t,
                        this.inModule = "module" === this.options.sourceType,
                        this.scope = new s(this.raise.bind(this), this.inModule),
                        this.prodParam = new tt,
                        this.classScope = new Tt(this.raise.bind(this)),
                        this.plugins = function(t) {
                            const e = new Map;
                            for (let s = 0; s < t.length; s++) {
                                const i = t[s],
                                    [r, a] = Array.isArray(i) ? i : [i, {}];
                                e.has(r) || e.set(r, a || {})
                            }
                            return e
                        }(this.options.plugins),
                        this.filename = t.sourceFilename
                }
                getScopeHandler() {
                    return Y
                }
                parse() {
                    let t = 0;
                    this.hasPlugin("topLevelAwait") && this.inModule && (t |= 2),
                        this.scope.enter(1),
                        this.prodParam.enter(t);
                    const e = this.startNode(),
                        s = this.startNode();
                    return this.nextToken(),
                        e.errors = null,
                        this.parseTopLevel(e, s),
                        e.errors = this.state.errors,
                        e
                }
            }

            function wt(t, e) {
                let s = At;
                return t && t.plugins && (! function(t) {
                            if (at(t, "decorators")) {
                                if (at(t, "decorators-legacy"))
                                    throw new Error("Cannot use the decorators and decorators-legacy plugin together");
                                const e = nt(t, "decorators", "decoratorsBeforeExport");
                                if (null == e)
                                    throw new Error("The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.");
                                if ("boolean" != typeof e)
                                    throw new Error("'decoratorsBeforeExport' must be a boolean.")
                            }
                            if (at(t, "flow") && at(t, "typescript"))
                                throw new Error("Cannot combine flow and typescript plugins.");
                            if (at(t, "placeholders") && at(t, "v8intrinsic"))
                                throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
                            if (at(t, "pipelineOperator") && !ot.includes(nt(t, "pipelineOperator", "proposal")))
                                throw new Error("'pipelineOperator' requires 'proposal' option whose value should be one of: " + ot.map(t => "'".concat(t, "'")).join(", "));
                            if (at(t, "recordAndTuple") && !ht.includes(nt(t, "recordAndTuple", "syntaxType")))
                                throw new Error("'recordAndTuple' requires 'syntaxType' option whose value should be one of: " + ht.map(t => "'".concat(t, "'")).join(", "))
                        }(t.plugins),
                        s = function(t) {
                            const e = ct.filter(e => at(t, e)),
                                s = e.join("/");
                            let i = St[s];
                            if (!i) {
                                i = At;
                                for (let t = 0; t < e.length; t++) {
                                    const s = e[t];
                                    i = pt[s](i)
                                }
                                St[s] = i
                            }
                            return i
                        }(t.plugins)),
                    new s(t, e)
            }
            const St = {};
            e.parse = function(t, e) {
                    if (!e || "unambiguous" !== e.sourceType)
                        return wt(e, t).parse();
                    e = Object.assign({}, e);
                    try {
                        e.sourceType = "module";
                        const s = wt(e, t),
                            i = s.parse();
                        if (s.sawUnambiguousESM)
                            return i;
                        if (s.ambiguousScriptDifferentAst)
                            try {
                                return e.sourceType = "script",
                                    wt(e, t).parse()
                            } catch (t) {}
                        else
                            i.program.sourceType = "script";
                        return i
                    } catch (s) {
                        try {
                            return e.sourceType = "script",
                                wt(e, t).parse()
                        } catch (t) {}
                        throw s
                    }
                },
                e.parseExpression = function(t, e) {
                    const s = wt(e, t);
                    return s.options.strictMode && (s.state.strict = !0),
                        s.getExpression()
                },
                e.tokTypes = n
        }));
    s(Kt);
    Kt.parse,
        Kt.parseExpression,
        Kt.tokTypes;
    const { hasPragma: Jt } = c;

    function Xt(t = []) {
        return {
            sourceType: "module",
            allowAwaitOutsideFunction: !0,
            allowImportExportEverywhere: !0,
            allowReturnOutsideFunction: !0,
            allowSuperOutsideMethod: !0,
            allowUndeclaredExports: !0,
            errorRecovery: !0,
            createParenthesizedExpressions: !0,
            plugins: ["doExpressions", "objectRestSpread", "classProperties", "exportDefaultFrom", "exportNamespaceFrom", "asyncGenerators", "functionBind", "functionSent", "dynamicImport", "numericSeparator", "importMeta", "optionalCatchBinding", "optionalChaining", "classPrivateProperties", ["pipelineOperator", {
                proposal: "minimal"
            }], "nullishCoalescingOperator", "bigInt", "throwExpressions", "logicalAssignment", "classPrivateMethods", "v8intrinsic", "partialApplication", ["decorators", {
                decoratorsBeforeExport: !1
            }], ...t]
        }
    }

    function Gt(t, ...s) {
        return (i, r, a) => {
            const n = Kt;
            let o;
            try {
                o = function(t, e) {
                    let s;
                    for (let i = 0; i < e.length; i++)
                        try {
                            return t(e[i])
                        } catch (t) {
                            s || (s = t)
                        }
                    throw s
                }(e => n[t](i, e), s.map(Xt))
            } catch (t) {
                throw e(t.message.replace(/ \(.*\)/, ""), {
                    start: {
                        line: t.loc.line,
                        column: t.loc.column + 1
                    }
                })
            }
            return delete o.tokens,
                Wt(o, Object.assign({}, a, {
                    originalText: i
                }))
        }
    }
    const Qt = Gt("parse", ["jsx", "flow"]),
        Yt = Gt("parse", ["jsx", ["flow", {
            all: !0,
            enums: !0
        }]]),
        $t = Gt("parse", ["jsx", "typescript"], ["typescript"]),
        Zt = Gt("parseExpression", ["jsx"]);

    function te(t, s) {
        switch (t.type) {
            case "ArrayExpression":
                return t.elements.forEach(i);
            case "ObjectExpression":
                return t.properties.forEach(i);
            case "ObjectProperty":
                if (t.computed)
                    throw r("computed");
                if (t.shorthand)
                    throw r("shorthand");
                return [t.key, t.value].forEach(i);
            case "UnaryExpression":
                switch (t.operator) {
                    case "+":
                    case "-":
                        return i(t.argument);
                    default:
                        throw r("operator")
                }
            case "Identifier":
                if (s && "ObjectProperty" === s.type && s.key === t)
                    return;
                throw r();
            case "NullLiteral":
            case "BooleanLiteral":
            case "NumericLiteral":
            case "StringLiteral":
                return;
            default:
                throw r()
        }

        function i(e) {
            return te(e, t)
        }

        function r(s) {
            const i = s ? "".concat(t.type, " with ").concat(s, "=").concat(JSON.stringify(t[s])) : t.type;
            return e("".concat(i, " is not allowed in JSON."), {
                start: {
                    line: t.loc.start.line,
                    column: t.loc.start.column + 1
                }
            })
        }
    }
    const ee = Object.assign({
            parse: Qt,
            astFormat: "estree",
            hasPragma: Jt
        }, m),
        se = Object.assign({}, ee, {
            parse: Yt
        }),
        ie = Object.assign({}, ee, {
            parse: $t
        }),
        re = Object.assign({}, ee, {
            parse: Zt
        });
    var ae = {
            parsers: {
                babel: ee,
                "babel-flow": se,
                "babel-ts": ie,
                json: Object.assign({}, re, {
                    hasPragma: () => !0
                }),
                json5: re,
                "json-stringify": Object.assign({
                    parse: function(t, e, s) {
                        const i = Zt(t, e, s);
                        return i.comments.forEach(te),
                            te(i),
                            i
                    },
                    astFormat: "estree-json"
                }, m),
                __js_expression: re,
                __vue_expression: re,
                __vue_event_binding: ee
            }
        },
        ne = ae.parsers;
    t.default = ae,
        t.parsers = ne,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
}));
