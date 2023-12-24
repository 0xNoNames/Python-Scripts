"use strict";
import {
    initGame as t,
    darkMode as r
} from "./cemantix-base.js";
let w, v = e => document.getElementById(e),
    n = new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }),
    a = e => 0 < e[1],
    x = {},
    m = 2,
    g = 1;
async function s(e) {
    try {
        var t = await (await fetch("/score", {
            method: "POST",
            body: "word=" + e,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })).json();
        return t.word = e, t.score = [100 * t.score, t.percentile], t
    } catch (e) {
        return null
    }
}

function i(e, t, r) {
    return 1e3 == r[1] ? [e, "Le mot secret a été trouvé !"] : [!1, ""]
}

function o() {
    let n = 0,
        a = 0,
        s = 0,
        i = 0,
        o = 0,
        c = 0;
    return Object.keys(w.guesses).forEach(e => {
        var [t, r] = w.guesses[e][1];
        r ? 999 < r || (999 <= r ? c++ : 990 <= r ? o++ : 900 <= r ? i++ : s++) : t < 0 ? n++ : a++
    }), [c, o, i, s, a, n]
}

function c(e, t) {
    return e ? t : ""
}
async function u(e, t, r) {
    var [, , ] = t, n = (m = 2, L(e), await new Promise((a, e) => {
        setTimeout(() => {
            let n = 0;
            document.querySelectorAll(".growing").forEach(e => {
                n++;
                let t = e.getAttribute("growth");

                function r() {
                    0 != n && (1e3 == t && (e.textContent = "BINGO !"), 0 == --n) && a(!0)
                }
                e.addEventListener("transitionend", r), setTimeout(r, 1500), e.style.width = t / 10 + "%"
            }), 0 == n && a(!1)
        }, 100)
    }));
    n && (document.querySelectorAll(".popup").forEach(e => e.style.visibility = "inherit"), document.querySelectorAll("[color]").forEach(e => e.style.color = e.getAttribute("color"))), v("cemantix-day-meter").innerHTML = l(o(), "", 10)
}

function $(a, e, t, s, i) {
    let o = "",
        c = "",
        u = "",
        l = "",
        d = "",
        m = "",
        g = "",
        p, f = "";
    if (-1 != i && (g = e, o = t < 0 ? "🧊" : "🥶"), p = r() ? s ? `rgb(255,${255-s/12},0)` : "rgb(128,200,255)" : s ? `rgb(255,${84-s/12},0)` : "rgb(16,64,255)", s) {
        let e = "",
            t = "",
            r = "",
            n = "";
        c = "" + s, g && (1e3 == s ? (o = "🥳", e = "BINGO !", t = "text-align: center;") : o = 999 == s ? "😱" : 990 <= s ? "🔥" : 900 <= s ? "🥵" : "😎", l = "close", t += `background-image:linear-gradient(to right, yellow, rgb(255,${255-s/4},0));`, i == a ? (f = `color="${p}"`, m = "popup", t += `width:${s/10}%`) : 0 == i ? (f = `color="${p}"`, r = "growing", n = `growth="${s}"`, d = "popup", e = "") : t += `width:${s/10}%`, u = ` <span class="progress-container"><span class="progress-bar ${r}" ${n} style="${t}">&nbsp;${e}&nbsp;</span></span>`)
    } else i != a && 0 != i || (f = `style="color: ${p}"`);
    return i == a && (m += " sink"), `<tr class="${m}">
	<td class="number">${e||""}</td>
	<td class="word ${l}" ${f}>${a}</td>
	<td class="number ${l} ${d}" style="color: ${p}">${n.format(t)}</td>
	<td class="emoji ${d}">${o}</td>
	<td class="number ${l} ${d}">${c}</td>
	<td>${u}</td>
	</tr>`
}

function L(e) {
    v("cemantix-see").checked = !1;
    let t = '<tr class="separator"></tr>',
        r;
    if (r = 0 == m ? Object.entries(w.guesses).sort((e, t) => e[0].localeCompare(t[0])) : 1 == m ? Object.entries(w.guesses).sort((e, t) => g * (e[1][0] - t[1][0])) : Object.entries(w.guesses).sort((e, t) => t[1][1][0] == e[1][1][0] ? t[1][1][1] - e[1][1][1] : t[1][1][0] - e[1][1][0]), e)
        for (var n of r) {
            var [n, [a, [s, i]]] = n;
            if (n == e) {
                v("cemantix-guessed").innerHTML = $(e, a, s, i, 0);
                break
            }
        }
    for (let d = 0; d < r.length; d++) {
        var [o, [c, [u, l]]] = r[d];
        (0 < d || o != e) && (t += $(o, c, u, l, e))
    }
    return v("cemantix-guesses").innerHTML = t, v("cemantix-guess").focus(), r.length
}

function l(e, a, t) {
    function s(e) {
        var t = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        let r = "";
        for (; 0 < e;) r = t[e % 10] + r, e = Math.floor(e / 10);
        return r
    }

    function r(e, t) {
        if (0 == e || null == e) return "";
        let r = t;
        var n = Math.floor(e / 10);
        return 0 < n ? r += t.repeat(n - 1) + s(e) : 1 < e && (r += s(e)), a + r
    }
    var n, i, o, c, u, l, [d, m, g, p, f, h] = e;
    return 10 == t ? 0 == (u = (h + f + p + g + m + d) / t) ? "🧊".repeat(t) : (n = Math.round(d / u), i = Math.round(m / u), o = Math.round(g / u), c = Math.round(p / u), u = Math.round(h / u), l = Math.max(0, t - n - i - o - c - u), "🧊".repeat(u) + "🥶".repeat(l) + "😎".repeat(c) + "🥵".repeat(o) + "🔥".repeat(i) + "😱".repeat(n)) : "🥳" + r(d, "😱") + r(m, "🔥") + r(g, "🥵") + r(p, "😎") + r(f, "🥶") + r(h, "🧊")
}
async function M(e) {
    if (x.hasOwnProperty(e)) return x[e];
    try {
        return await (await fetch("/nearby", {
            method: "POST",
            body: "word=" + e,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })).json()
    } catch (e) {
        return null
    }
}
async function d(e) {
    if (e.target.checked) {
        let e = "",
            t = 0,
            r = 0;
        var n = await M(w.secret);
        if (!n) return !(v("cemantix-error").innerHTML = "Une erreur s´est produite.");
        x[w.secret] = n;
        for (var a = Object.entries(w.guesses).sort((e, t) => t[1][1][0] == e[1][1][0] ? t[1][1][1] - e[1][1][1] : t[1][1][0] - e[1][1][0]); t < n.length && r < a.length;) {
            var [s, i, o] = n[t], [c, [u, [l, d]]] = a[r];
            if (!d) break;
            i < d ? (e += $(c, u, l, d), r++) : d < i ? (e += $(s, "", o, i, -1), t++) : (e += $(s, u, l, i), t++, r++)
        }
        for (; t < n.length;) {
            var [m, g, p] = n[t++];
            e += $(m, "", p, g, -1)
        }
        for (; r < a.length;) {
            var [f, [h, [y, b]]] = a[r++];
            if (!b) break;
            e += $(f, h, y, b)
        }
        v("cemantix-guesses").innerHTML = e
    } else L();
    return !1
}
async function p() {
    var e, t, r, n = v("cemantix-yesterday").text,
        a = await M(n);
    if (!a) return !(v("cemantix-error").innerHTML = "Une erreur s´est produite.");
    x[n] = a, document.body.classList.add("dialog-open");
    let s = "";
    for ([e, t, r] of a) s += $(e, 1e3 - t, r, t, -1);
    v("yesterbody").innerHTML = s, v("yestertable").style.display = "block", v("dialog-close").focus()
}

function f() {
    v("cemantix-see").addEventListener("change", d), v("cemantix-yesterday").addEventListener("click", p), v("cemantix-chronoOrder").addEventListener("click", e => {
        m = 1, g = -g, L()
    }), v("cemantix-alphaOrder").addEventListener("click", e => {
        m = 0, L()
    }), v("temperatureOrder").addEventListener("click", e => {
        m = 2, L()
    });
    var e = document.getElementsByClassName("decimal");
    for (let r = 0; r < e.length; r++) {
        var t = e[r].innerHTML,
            t = n.format(Number(t));
        e[r].innerHTML = t
    }
}
let e = {
    init: async function() {
        var e = v("cemantix-script");
        w = {
            puzzleNumber: parseInt(e.getAttribute("data-puzzle-number")),
            utcTime: parseInt(e.getAttribute("data-utc-time")),
            active: "cemantix" == e.getAttribute("data-app"),
            appTitle: "cémantix",
            appName: "cemantix",
            prefix: "",
            apiPrefix: "",
            url: "https://cemantix.certitudes.org/",
            getScore: s,
            isCloudable: a,
            showGuess: u,
            showGuesses: L,
            getSecret: i,
            getTurns: o,
            showSecret: c,
            showStory: l,
            initPage: f
        }, t(w)
    }
};
window.addEventListener("load", async () => e.init());