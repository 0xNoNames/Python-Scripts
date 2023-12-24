"use strict";
import {
    initGame as r
} from "./cemantix-base.js";
let c, d = e => document.getElementById(e);
new Intl.NumberFormat(navigator.language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
});
let n = e => 0 < Object.keys(e).length,
    p = 1,
    o = -1,
    i, s = 0,
    u = [],
    y = [],
    a = !0,
    l;
async function f(t) {
    try {
        var r = [];
        if (!c.secret)
            for (let e = 0; e < s; e++) "string" == typeof d(e).score ? r.push(d(e).score) : r.push(t);
        return await (await fetch("/pedantix/score", {
            method: "POST",
            body: JSON.stringify({
                word: t,
                answer: r
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()
    } catch (e) {
        return null
    }
}

function h(e, t, r) {
    if (t.solved) return [t.solved, ""];
    for (let n = 0; n < s; n++)
        if ("string" != typeof d(n).score && "string" != typeof r[n]) return [!1, ""];
    return [!0, "La page secrète a été trouvée !"]
}

function g() {
    let t = 0,
        r = 0,
        n = 0;
    return document.querySelectorAll(".w").forEach(e => {
        "latex" != e.parentElement.className && ("string" == typeof e.score ? t++ : 0 < e.score ? r++ : n++)
    }), [t, r, n]
}

function m(e, t) {
    var r = e ? t[1] : "page";
    return `<a href="https://fr.wikipedia.org/wiki/${t[0]}">${r}</a>`
}

function x(e) {
    d("pedantix-error").textContent = "";
    for (var t of u) t.style.backgroundColor = l.backgroundColor, t.style.boxShadow = "none", t.textContent = t.score;
    if (u = [], e)
        for (var [r, n] of y) r.style.color = `rgb(${n},${n},${n})`, r.closeColor = r.style.color;
    y = []
}

function b(e, t, r, n, i, o = !1) {
    var s;
    "string" == typeof r ? (e.style.color = l.color, e.style.minWidth = null, e.style.display = "inline", e.style.fontFamily = "inherit", e.style.fontSize = "inherit", e.style.lineHeight = "inherit", o && (e.word = t, e.score = r), i ? (e.style.backgroundColor = "#6E6", e.innerHTML = "&nbsp;" + r + "&nbsp;", e.word = t, e.score = r, u.push(e)) : (e.style.backgroundColor = l.backgroundColor, e.style.boxShadow = "none", e.textContent = r)) : (o || "number" == typeof e.score && (r > e.score || r == e.score && t == e.word)) && (s = Math.round(255 * Math.log10(r - 30) / 2), n && (e.style.backgroundColor = "#333", e.style.boxShadow = "1px 1px 1px #B8B9BA", e.style.minWidth = e.initialWidth + "px", e.style.display = null, e.style.fontFamily = null, e.style.fontSize = null, e.style.lineHeight = null, e.innerHTML = 0 < r ? "&nbsp;" + t + "&nbsp;" : t), o && (e.word = t, e.score = r), i ? (n && (e.style.color = `rgb(255,${s},0)`, e.closeColor = e.style.color), e.word = t, e.score = r, y.push([e, s])) : n && (e.style.color = `rgb(${s},${s},${s})`, e.closeColor = e.style.color))
}
async function e(n) {
    if (!d("pedantix-see").checked) {
        let r = n.target;
        if (r.wordLen && "string" != typeof r.score) {
            let e, t;
            var i;
            t = c.secret && d("pedantix-word").checked ? (i = await v(c.secret[1]), e = i[r.id], "#6E6") : (e = n.target.wordLen, "#0DF"), r.style.color != t && (r.style.color = t, r.style.minWidth = Math.max(r.offsetWidth, r.initialWidth) + "px", r.innerHTML = "&nbsp;" + e + "&nbsp;", setTimeout(() => {
                d("pedantix-see").checked || "string" == typeof r.score || (r.style.minWidth = r.initialWidth + "px", r.style.color = r.closeColor || "", r.innerHTML = 0 < r.score ? "&nbsp;" + r.word + "&nbsp;" : r.word)
            }, 2e3))
        }
    }
}

function w(t, r, e) {
    let n = !d("pedantix-see").checked,
        i = (x(n), Object.keys(r).forEach(e => b(d(e), t, r[e], n, !0)), k(!(p = 1)), 0),
        o = 0;
    for (var s of u) "latex" != s.parentElement.className && i++;
    for (var [a, l] of y) "latex" != a.parentElement.className && o++;
    d("pedantix-error").textContent = c.blocks.green.repeat(i) + c.blocks.orange.repeat(o) + c.blocks.red.repeat(i + o ? 0 : 1), d("pedantix-day-meter").innerHTML = C(g(), "", 10)
}

function k(e = !0) {
    let t = "",
        r, n = 0;
    for (var i of r = 0 == p ? Object.entries(c.guesses).sort((e, t) => e[0].localeCompare(t[0])) : Object.entries(c.guesses).sort((e, t) => o * (e[1][0] - t[1][0])))
        if (t += `<tr>
<td class="number">${i[1][0]}</td>
<td class="word">${i[0]}</td>
</tr>`, a && 4 < ++n) break;
    return e && (n = 0, Object.keys(c.guesses).forEach(t => {
        Object.keys(c.guesses[t][1]).forEach(e => {
            b(d(e), t, c.guesses[t][1][e], !0, !0)
        }), x(!0), n = Math.max(n, c.guesses[t][0])
    })), d("pedantix-guesses").innerHTML = t, n
}

function C(e, t, r = 20) {
    var [n, i, o] = e, o = (n + i + o) / r, n = Math.round(n / o), i = Math.round(i / o), o = Math.max(0, r - n - i);
    return "\n" == t ? "🟩".repeat(n) + "🟧".repeat(i) + "🟥".repeat(o) : c.blocks.green.repeat(n) + c.blocks.orange.repeat(i) + c.blocks.red.repeat(o)
}
async function v(e) {
    if (i) return i;
    try {
        var t = await fetch("/pedantix/page", {
            method: "POST",
            body: "answer=" + e,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return i = await t.json()
    } catch (e) {
        return null
    }
}
async function t(e) {
    if (d("pedantix-error").textContent = "", d("pedantix-guess").focus(), !e.target.checked) return d("wiki-img").style.display = "none", document.querySelectorAll(".w").forEach(e => b(e, e.word, e.score, !0, !1, !0)), !(d("wiki").style.userSelect = "none");
    let t = await v(c.secret[1]);
    if (!t) return !(d("pedantix-error").innerHTML = "Une erreur s´est produite.");
    try {
        !async function(e) {
            if (1 == d("wiki-img").exists) d("wiki-img").style.display = "inline-block";
            else if (0 != d("wiki-img").exists) {
                var t = await (await fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=${e}&prop=pageimages&format=json&origin=*&pithumbsize=300`)).json();
                if (d("wiki-img").exists = !1, t && t.query.pages)
                    for (var r of Object.keys(t.query.pages))
                        if (t.query.pages[r].thumbnail && t.query.pages[r].thumbnail.source) {
                            d("wiki-img").src = t.query.pages[r].thumbnail.source, d("wiki-img").style.display = "inline-block", d("wiki-img").exists = !0;
                            break
                        }
            }
        }(c.secret[0])
    } catch (e) {}
    return Object.keys(t).forEach(e => b(d(e), t[e], t[e], !1, !1)), !(d("wiki").style.userSelect = "auto")
}

function E() {
    d("pedantix-see").addEventListener("change", t), d("collapse").addEventListener("click", e => {
        a = !a, k(!1)
    }), d("pedantix-chronoOrder").addEventListener("click", e => {
        p = 1, o = -o, k(!1)
    }), d("pedantix-alphaOrder").addEventListener("click", e => {
        p = 0, k(!1)
    }), d("pin").addEventListener("click", e => {
        var t = d("pedantix-form").style;
        "sticky" == t.position ? (t.position = null, t.top = null, t.backgroundColor = null, t.boxShadow = "none", d("pin").textContent = "📍") : (t.position = "sticky", t.top = e.y - e.target.offsetHeight / 2 + "px", t.backgroundColor = "var(--body-bg)", t.boxShadow = "2px 2px 2px #88898A", d("pin").textContent = "📌"), d("pedantix-guess").focus()
    }), l = getComputedStyle(d("wiki")), document.querySelectorAll(".w").forEach(e => {
        e.word = e.textContent, e.initialWidth = e.offsetWidth, e.wordLen = e.word.length - 2, e.score = 0, e.classList.contains("h") && s++
    }), d("wiki").addEventListener("click", e)
}
let S = {
    init: async function() {
        var e, t = d("pedantix-script");
        c = {
            puzzleNumber: parseInt(t.getAttribute("data-puzzle-number")),
            utcTime: parseInt(t.getAttribute("data-utc-time")),
            active: "pedantix" == t.getAttribute("data-app"),
            appTitle: "pédantix",
            appName: "pedantix",
            prefix: "p",
            apiPrefix: "/pedantix",
            url: "https://cemantix.certitudes.org/pedantix",
            getScore: f,
            isCloudable: n,
            showGuess: w,
            showGuesses: k,
            getSecret: h,
            getTurns: g,
            showSecret: m,
            showStory: C,
            initPage: E
        }, (t = document.createElement("div")).innerHTML = "<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math><math><mn>1</mn></math>", document.body.appendChild(t), e = t.firstElementChild.firstElementChild.getBoundingClientRect().height > t.lastElementChild.firstElementChild.getBoundingClientRect().height + 1, t.remove(), e || document.querySelectorAll(".latex").forEach(e => {
            e.style.display = "inline-block"
        }), r(c)
    }
};
window.addEventListener("load", async () => S.init());