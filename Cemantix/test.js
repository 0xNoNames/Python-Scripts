"use strict";
let o, i = {},
    t, s = 3e5,
    n = Date.now(),
    a, l, r, d, c, u = new URL(import.meta.url).origin,
    p = e => document.getElementById(e),
    m = (e, t) => window.localStorage.getItem(e.storePrefix + t),
    y = (e, t, a) => window.localStorage.setItem(e.storePrefix + t, a),
    f = (e, t) => window.localStorage.removeItem(e.storePrefix + t),
    b = window.localStorage.getItem("theme") || "colorful",
    g = window.localStorage.getItem("mode") || "dark",
    h = "true" == window.localStorage.getItem("blind"),
    v = {
        green: "🟩",
        orange: "🟧",
        red: "🟥"
    },
    w = {
        green: "💚",
        orange: "🟠",
        red: "🟥"
    };
var e = window.matchMedia("(prefers-color-scheme: dark)");
let k = e.matches;
var O = () => k && "system" == g || "dark" == g;

function N(e, t) {
    var a = JSON.parse(m(e, "days")) || {};
    return a[t] || null
}

function L(e, t, a) {
    var s = JSON.parse(m(e, "days")) || {};
    s[t] = a, y(e, "days", JSON.stringify(s))
}

function C() {
    p(o.appName + "-error").innerHTML = "Le temps imparti de 24h s’est écoulé.<br />Rafraîchissement en cours...", setInterval(function() {
        window.location.reload()
    }, 3e3)
}

function x() {
    document.querySelectorAll(".dialog-content").forEach(e => e.style.display = "none"), document.body.classList.remove("dialog-open"), p(o.appName + "-guess").focus()
}

function R(e) {
    e.preventDefault(), o.inputIdx < o.input.length - 1 && (o.inputIdx++, p(o.appName + "-guess").value = o.input[o.inputIdx]), o.inputIdx >= o.input.length - 1 && (p(o.appName + "-previous").style.visibility = "hidden"), p(o.appName + "-guess").focus()
}
async function $(e, t) {
    e.preventDefault(), p(t.appName + "-guess").focus();
    let a = p(t.appName + "-guess").value.replace(/[^-\p{L}\p{N}]/gu, "");
    if (0 != a.length)
        if (a = a.toLowerCase(), t.input[0] = a, t.input.unshift(""), t.input = t.input.slice(0, 21), t.inputIdx = 0, p(t.appName + "-ad").style.display = "none", p(t.appName + "-previous").style.visibility = "visible", p(t.appName + "-guess").value = "", p(t.appName + "-guess").placeholder = a, p(t.appName + "-guess-btn").disabled = !0, p(t.appName + "-error").textContent = "", t.guesses.hasOwnProperty(a)) p(t.appName + "-guess-btn").disabled = !1, t.showGuess(a, t.guesses[a][1], !0);
        else {
            var s = await t.getScore(a);
            if (p(t.appName + "-guess-btn").disabled = !1, !s) return !(p(t.appName + "-error").innerHTML = "Une erreur s´est produite.");
            if (s.num != t.puzzleNumber) C();
            else if (E(t, s.solvers), s.error) p(t.appName + "-error").innerHTML = s.error;
            else {
                if (t.ranking = s.solvers, D(t, a, s.word, s.score), await t.showGuess(s.word, s.score, !0), !t.secret) {
                    var [n, , ] = t.getSecret(a, s, s.score);
                    if (n) {
                        t.secret = n;
                        var i = t;
                        if (L(i, i.puzzleNumber, i.nTries), y(i, "turns", JSON.stringify(i.getTurns())), y(i, "secret", JSON.stringify(i.secret)), y(i, "ranking", i.ranking), i.syncRef) try {
                            l.onValue(i.syncRef, e => A(i, e), {
                                onlyOnce: !0
                            })
                        } catch (e) {}
                        P(t)
                    }
                }
                t.teamRef && t.isCloudable(s.score) && l.set(l.ref(d, S(t, t.teamRef.key, a)), s.score)
            }
        } return !1
}

function z(t, a) {
    var e, s, n;
    "_users" == a.key ? t.teamTwitter || (t.teamMembers = a.val(), o == t && (p("team-members").textContent = t.teamMembers)) : t.guesses.hasOwnProperty(a.key) || (e = a.val(), [s, n] = t.getSecret(a.key, e, e), p(t.appName + "-ad").style.display = "none", s && !t.secret ? (p(t.appName + "-error").innerHTML = n, p(t.appName + "-secret").style.display = "block", p(t.appName + "-reveal").addEventListener("click", e => {
        p(t.appName + "-guess").value = a.key, p(t.appName + "-guess").focus()
    })) : (D(t, a.key, a.key, e), t.showGuess(a.key, e, !1), p(t.appName + "-guess").placeholder = a.key))
}

function D(e, t, a, s) {
    e.guessCount++, e.guesses[t] = [e.guessCount, s], t != a && (e.guesses[a] = [e.guessCount, s]), y(e, "guesses", JSON.stringify(e.guesses)), e.secret || (e.nTries++, L(e, e.puzzleNumber, -e.nTries))
}

function P(e) {
    let t;
    t = 3 < e.ranking ? e.ranking + "<sup>e</sup>" : 3 == e.ranking ? "🥉3<sup>e</sup>" : 2 == e.ranking ? "🥈2<sup>e</sup>" : 1 == e.ranking ? "🥇1<sup>er</sup>" : "N<sup>ème</sup>", p(e.appName + "-tries").textContent = e.nTries + " coup" + (1 < e.nTries ? "s" : ""), p(e.appName + "-ranking").innerHTML = t, p(e.appName + "-meter").innerHTML = e.showStory(JSON.parse(m(e, "turns")) || [], "<br />"), p(e.appName + "-solution").innerHTML = e.showSecret(!1, e.secret), p(e.appName + "-secret").style.display = "none", p(e.appName + "-success").style.opacity = 1, p(e.appName + "-success").style.maxHeight = "100%", p(e.appName + "-success").style.marginBottom = ".25em", p(e.appName + "-success").style.display = "block", p(e.appName + "-error").style.display = "block"
}
async function T(e = !1) {
    if (e || !(Date.now() - n < s)) try {
        var t = o,
            a = await (await fetch(t.apiPrefix + "/stats")).json();
        a.num == t.puzzleNumber ? E(t, a.solvers) : C()
    } catch (e) {}
}

function E(e, t) {
    e.solvers <= t && (e.solvers = t, p("solved").textContent = 0 < t ? t : "", p("plural").textContent = 1 < t ? "s" : "", p("live")) && 0 < t && (p("live").textContent = t), n = Date.now()
}
async function U() {
    var [e, t] = await Promise.all([import("https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"), import("https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js")]);
    a = e.initializeApp({
        apiKey: "AIzaSyAuNU0MeepN6M6DRy-RK-dvIpmB-bjST1U",
        authDomain: "cemantix-11e28.firebaseapp.com",
        databaseURL: "https://cemantix-11e28-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "cemantix-11e28",
        storageBucket: "cemantix-11e28.appspot.com",
        messagingSenderId: "1088014539886",
        appId: "1:1088014539886:web:231597d11afb37f168da7f",
        measurementId: "G-7E8QW0JJHF"
    }), t.getAnalytics(a)
}
async function M() {
    a || await U();
    var [e, t] = await Promise.all([import("https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"), import("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-check.js")]);
    return d = e.getDatabase(a), t.initializeAppCheck(a, {
        provider: new t.ReCaptchaV3Provider("6LdglJIfAAAAAAouVey3CkDeeCZkdrqFKjUjdAHd"),
        isTokenAutoRefreshEnabled: !0
    }), e
}
async function J() {
    return r = r || await import("https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"), new Promise((t, a) => {
        let s = new r.TwitterAuthProvider,
            n = r.getAuth();
        n.useDeviceLanguage(), r.onAuthStateChanged(n, e => {
            e ? t(e) : r.signInWithPopup(n, s).then(e => {
                t(e.user)
            }).catch(e => a(e))
        })
    })
}

function V() {
    p("start").addEventListener("click", e => async function(t) {
        p("start").disabled = !0, p("join").disabled = !0, p("signin").disabled = !0;
        try {
            l = l || await M(), t.teamRef = l.push(l.ref(d, S(t))), t.teamCode = t.teamRef.key.replace(/-/gu, "Ô"), I(t), l.onChildAdded(t.teamRef, e => z(t, e)), l.onChildChanged(t.teamRef, e => z(t, e)), l.set(l.ref(d, S(t, t.teamRef.key, "_users")), 1), p("team-status").innerHTML = `Veuillez partager le code <b class="teamcode">${t.teamCode}</b> avec votre équipe.`;
            try {
                await navigator.clipboard.writeText(t.teamCode), p("team-error").textContent = "Code copié dans le presse-papiers"
            } catch (e) {}
            p("cloud-button").textContent = "thunderstorm", p("code").value = t.teamCode, p("twitter-collab").style.display = "none"
        } catch (e) {
            p("team-error").textContent = "Une erreur s´est produite. " + e, p("start").disabled = !1, p("join").disabled = !1, p("signin").disabled = !1
        }
    }(o)), p("join").addEventListener("click", e => async function(t) {
        if (t.teamCode = p("code").value.trim(), !t.teamCode) return !(p("team-error").textContent = "Veuillez entrer un code");
        p("start").disabled = !0, p("join").disabled = !0, p("signin").disabled = !0;
        try {
            l = l || await M(), t.teamRef = l.ref(d, S(t, t.teamCode.replace(/Ô/gu, "-"))), l.onValue(t.teamRef, e => {
                e.exists() ? (I(t, e), l.onChildAdded(t.teamRef, e => z(t, e)), l.onChildChanged(t.teamRef, e => z(t, e)), e.forEach(e => {
                    "_users" == e.key && l.set(l.ref(d, S(t, t.teamRef.key, "_users")), e.val() + 1)
                }), p("team-status").innerHTML = `Vous avez rejoint l´équipe <b class="teamcode">${t.teamCode}</b>.`, p("cloud-button").textContent = "thunderstorm", p("twitter-collab").style.display = "none") : (p("team-error").textContent = "Code non valide.", t.teamRef = null, p("start").disabled = !1, p("join").disabled = !1, p("signin").disabled = !1)
            }, {
                onlyOnce: !0
            })
        } catch (e) {
            p("team-error").textContent = "Code non valide. " + e, t.teamRef = null, p("start").disabled = !1, p("join").disabled = !1, p("signin").disabled = !1
        }
    }(o)), p("leave").addEventListener("click", e => H(o)), p("signin").addEventListener("click", e => async function(t) {
        p("start").disabled = !0, p("join").disabled = !0, p("signin").disabled = !0;
        try {
            l = l || await M(), c = c || await J(), t.teamRef = l.ref(d, S(t, c.uid)), t.teamTwitter = !0, l.onValue(t.teamRef, e => {
                I(t, e), l.onChildAdded(t.teamRef, e => z(t, e)), l.onChildChanged(t.teamRef, e => z(t, e))
            }, {
                onlyOnce: !0
            }), t.syncRef = l.ref(d, j(t, c.uid)), l.onValue(t.syncRef, e => A(t, e), {
                onlyOnce: !0
            }), p("twitter-name").textContent = c.displayName, p("twitter-photo").src = c.photoURL, p("twitter-status").innerHTML = `Vous êtes identifié comme <img class="twitter-button" src='${c.photoURL}' />&nbsp;<b>${c.displayName}</b>`, p("join-twitter").style.display = "none", p("team-collab").style.display = "none", p("cloud-button").textContent = "thunderstorm"
        } catch (e) {
            p("start").disabled = !1, p("join").disabled = !1, p("signin").disabled = !1
        }
    }(o)), p("signout").addEventListener("click", e => H(o)), document.body.classList.add("dialog-open"), p("cloud").style.display = "block", p("team-status").textContent = "", p("team-error").textContent = "", p("twitter-status").textContent = "", o.teamRef ? (p("start-team").style.display = "none", p("join-team").style.display = "none", p("join-twitter").style.display = "none", p("start").disabled = !0, p("join").disabled = !0, p("signin").disabled = !0, o.teamTwitter ? p("leave-twitter").style.display = "block" : (p("twitter-collab").style.display = "none", p("leave-team").style.display = "block", p("team").textContent = o.teamCode)) : H(o), p("dialog-close").focus()
}

function S(e, t = "", a = "") {
    return a ? e.appName + "/" + e.puzzleNumber + "/" + t + "/" + a : t ? e.appName + "/" + e.puzzleNumber + "/" + t : e.appName + "/" + e.puzzleNumber
}

function j(e, t, a = "") {
    return a ? e.prefix + "stats/" + t + "/" + a : e.prefix + "stats/" + t
}
async function I(e, t) {
    var a, s, n;
    for ([a, [s, n]] of Object.entries(e.guesses).sort((e, t) => e[1][0] - t[1][0])) !e.isCloudable(n) || t && t.hasChild(a) || l.set(l.ref(d, S(e, e.teamRef.key, a)), n)
}

function H(e) {
    p("leave").disabled = !0, p("signout").disabled = !0, e.teamRef && (l.off(e.teamRef), e.teamTwitter || (1 == e.teamMembers ? (l.set(l.ref(d, S(e, e.teamRef.key)), null), e.teamCode = "") : l.set(l.ref(d, S(e, e.teamRef.key, "_users")), e.teamMembers - 1)), e.teamRef = null, e.teamTwitter = !1), p("start").disabled = !1, p("join").disabled = !1, p("leave").disabled = !1, p("signin").disabled = !1, p("signout").disabled = !1, p("team-collab").style.display = "block", p("twitter-collab").style.display = "block", p("start-team").style.display = "block", p("join-team").style.display = "block", p("join-twitter").style.display = "block", p("leave-team").style.display = "none", p("leave-twitter").style.display = "none", p("team-status").textContent = "", p("team-error").textContent = "", p("twitter-status").textContent = "", p("cloud-button").textContent = "cloud", p("team-members").textContent = "", p("code").value = "", e.teamMembers = ""
}
async function A(e, t) {
    for (let r = 1; r <= e.puzzleNumber; r++) {
        var a, s = r.toString(),
            n = t ? t.child(s).val() : null,
            i = N(e, r);
        n != i && ((a = (0 < n || 0 < i ? 1 : -1) * Math.max(Math.abs(n), Math.abs(i))) != i && (L(e, r, a), r == e.puzzleNumber) && (e.guessCount = Math.abs(a), e.nTries = e.guessCount), a != n) && l.set(l.ref(d, j(e, e.syncRef.key, s)), a)
    }
    y(e, "sync", Date.now()), o == e && _(e, await G(e))
}
async function q(t) {
    p("sync").disabled = !0, p("refresh").disabled = !0;
    try {
        l = l || await M(), c = c || await J(), t.syncRef = l.ref(d, j(t, c.uid)), l.onValue(t.syncRef, e => A(t, e), {
            onlyOnce: !0
        }), p("sync-name").textContent = c.displayName, p("sync-photo").src = c.photoURL, p("sync-twitter").style.display = "none", p("sync-time").textContent = "maintenant", p("refresh").style.display = "none", p("history-sync").style.display = "block", p("synced-twitter").style.display = "block"
    } catch (e) {
        p("sync").disabled = !1, p("refresh").disabled = !1
    }
}
async function G(e) {
    if (0 < e.cacheHistory.length) return e.cacheHistory;
    try {
        return await (await fetch(e.apiPrefix + "/history")).json()
    } catch (e) {
        return null
    }
}

function _(s, n) {
    let i = "";
    for (var [r, o, l] of n) {
        let e = N(s, r),
            t = "",
            a = "";
        e ? 0 < e ? t = "✅" : (e = -e, r < s.puzzleNumber && (t = "❌")) : e = "", r == s.puzzleNumber && (o = p("solved").textContent, a = 'id="live"', s.cacheHistory = n), i += `<tr>
<td class="number">${r}</td>
<td class="word"><b>${s.showSecret(!0,l)}</b></td>
<td class="number">${e}</td>
<td>${t}</td>
<td class="number" ${a}>${0<o?o:""}</td>
</tr>`
    }
    p("historybody").innerHTML = i
}
async function B(t) {
    p("sync").addEventListener("click", e => q(t)), p("refresh").addEventListener("click", e => q(t));
    var e, a, s, n = await G(t);
    if (!n) return !(p(t.appName + "-error").innerHTML = "Une erreur s´est produite.");
    document.body.classList.add("dialog-open"), c ? (p("sync-name").textContent = c.displayName, p("sync-photo").src = c.photoURL, p("sync-twitter").style.display = "none", p("synced-twitter").style.display = "block", p("refresh").style.display = "inline-block") : (p("sync-twitter").style.display = "block", p("synced-twitter").style.display = "none", p("refresh").style.display = "none"), m(t, "sync") ? (p("sync-time").textContent = "il y a " + (e = m(t, "sync"), a = Math.floor((Date.now() - e) / 1e3), (s = Math.floor(a / 86400)) ? s + " jour" + (1 < s ? "s" : "") : (a %= 86400, (s = Math.floor(a / 3600)) ? s + " heure" + (1 < s ? "s" : "") : (a %= 3600, (s = Math.floor(a / 60)) ? s + " minute" + (1 < s ? "s" : "") : (a %= 60) ? a + " seconde" + (1 < a ? "s" : "") : "un moment"))), p("history-sync").style.display = "block") : p("history-sync").style.display = "none", _(t, n), p("history").style.display = "block", p("dialog-close").focus()
}

function W() {
    let e = ["colorful", "grey"],
        t = ["light", "dark", "system"];

    function a(e, t, a) {
        e.target.checked ? (window.localStorage.setItem(t, a), b = window.localStorage.getItem("theme") || "colorful", "system" == (g = window.localStorage.getItem("mode") || "dark") ? document.documentElement.className = (k ? "dark" : "light") + "-" + b : document.documentElement.className = g + "-" + b, o.showGuesses()) : e.preventDefault()
    }
    for (var s of e) p(s).checked = s == b;
    for (var n of t) p(n).checked = n == g;
    p("blind").checked = h, p("colorful").addEventListener("click", e => a(e, "theme", "colorful")), p("grey").addEventListener("click", e => a(e, "theme", "grey")), p("light").addEventListener("click", e => a(e, "mode", "light")), p("dark").addEventListener("click", e => a(e, "mode", "dark")), p("system").addEventListener("click", e => a(e, "mode", "system")), p("blind").addEventListener("click", e => {
        for (var t in h = e.target.checked, i) i[t].blocks = h ? w : v;
        window.localStorage.setItem("blind", h)
    }), document.body.classList.add("dialog-open"), p("theme").style.display = "block", p("dialog-close").focus()
}
async function K() {
    document.body.classList.add("dialog-open"), p(o.appName + "-rules").style.display = "block";
    try {
        var e = await fetch(`${u}/html/${o.appName}-rules.html`),
            t = new Date;
        t.setTime(1e3 * o.utcTime), p(o.appName + "-rulesbody").innerHTML = await e.text(), p(o.appName + "-localtime").textContent = t.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        }), y(o, "readRules", !0)
    } catch (e) {
        p(o.appName + "-rulesbody").innerHTML = "Une erreur s´est produite."
    }
    p("dialog-close").focus()
}
async function F() {
    document.body.classList.add("dialog-open"), p("faq").style.display = "block";
    try {
        var e = await fetch(u + "/html/cemantix-faq.html");
        p("faqbody").innerHTML = await e.text()
    } catch (e) {
        p("faqbody").innerHTML = "Une erreur s´est produite."
    }
    p("dialog-close").focus()
}
async function Q() {
    document.body.classList.add("dialog-open"), p("story").style.display = "block";
    var e = Math.abs(N(o, o.puzzleNumber)),
        t = o.showStory(JSON.parse(m(o, "turns")) || [], "\n"),
        e = `J'ai trouvé #${o.appName} nº${o.puzzleNumber} en ${e} coup${1<e?"s":""} !
${t}
${o.url} `;
    p("share-story").innerHTML = e.replace(/\n/gu, "<br />");
    try {
        await navigator.clipboard.writeText(e), p("clipboard").innerHTML = "Copié dans le presse-papiers"
    } catch (e) {
        p("clipboard").innerHTML = "Erreur de copiage dans le presse-papiers<br />" + e
    }
    p("dialog-close").focus()
}

function Z(e, t, a) {
    if (e.preventDefault(), o != i[t]) {
        p(t).after(p(a)), p(t).classList.add("active"), p(t).classList.remove("inactive"), p(a).classList.add("inactive"), p(a).classList.remove("active"), p(t + "-guess").disabled = !1, p(a + "-guess").disabled = !0, p(a + "-ad").classList.remove("adsbygoogle"), p(a + "-ad").style.display = "none";
        for (var s of ["-game", "-rules", "-summary", "-credits"])[p(t + s).style.display, p(a + s).style.display] = [p(a + s).style.display, p(t + s).style.display];
        (o = i[t]).inited || X(o), p("puzzle-num").textContent = o.puzzleNumber, p("app-title").textContent = o.appTitle, p("team-members").textContent = o.teamMembers, p("cloud-button").textContent = o.teamMembers || o.teamTwitter ? "thunderstorm" : "cloud", E(o, o.solvers), T(!0)
    }
    p(o.appName + "-guess").focus()
}

function X(t) {
    t.initPage(), t.puzzleNumber != m(t, "puzzleNumber") && (f(t, "secret"), f(t, "ranking"), f(t, "turns"), f(t, "guesses"), y(t, "puzzleNumber", t.puzzleNumber));
    var e = N(t, t.puzzleNumber);
    e && (t.nTries = Math.abs(e), t.guesses = JSON.parse(m(t, "guesses")) || {}, t.guessCount = t.showGuesses(), t.secret = JSON.parse(m(t, "secret")), t.secret) && (t.ranking = m(t, "ranking"), P(t)), p(t.appName + "-share").addEventListener("click", Q), p(t.appName + "-form").addEventListener("submit", e => $(e, t)), p(t.appName + "-previous").addEventListener("click", R), p(t.appName + "-guess").addEventListener("keydown", e => {
        switch (e.key) {
            case "ArrowUp":
                R(e);
                break;
            case "ArrowDown":
                e.preventDefault(), 0 < o.inputIdx && (o.inputIdx--, p(o.appName + "-guess").value = o.input[o.inputIdx]), o.inputIdx < o.input.length - 1 && (p(o.appName + "-previous").style.visibility = "visible"), p(o.appName + "-guess").focus()
        }
    }), p(t.appName + "-day-meter").innerHTML = t.showStory(t.getTurns(), "", 10), p(t.appName + "-guess-btn").disabled = !1, p(t.appName + "-guess").focus(), e || (p(t.appName + "-ad").classList.add("adsbygoogle"), p(t.appName + "-ad").style.display = "block", (window.adsbygoogle || []).push({})), t.inited = !0, m(t, "readRules") || K()
}
async function Y(e) {
    e.inited = !1, e.storePrefix = e.prefix ? e.prefix + "/" : "", e.blocks = h ? w : v, e.guesses = {}, e.secret = "", e.guessCount = 0, e.nTries = 0, e.ranking = 0, e.cacheHistory = [], e.input = [""], e.inputIdx = 0, e.solvers = 0, e.teamRef = null, e.teamCode = "", e.teamMembers = "", e.teamTwitter = !1, e.syncRef = null, (i[e.appName] = e).active && X(o = e)
}
k && "system" == g ? document.documentElement.className = (k ? "dark" : "light") + "-" + b : document.documentElement.className = g + "-" + b, e.onchange = e => {
    if (k = !!e.matches, "system" == g)
        for (var t in document.documentElement.className = (k ? "dark" : "light") + "-" + b, i) i[t].showGuesses()
};
let ee = {
    init: async function() {
        p("cloud-button").addEventListener("click", V), p("history-button").addEventListener("click", e => B(o)), p("theme-button").addEventListener("click", W), p("rules-button").addEventListener("click", K), p("faq-button").addEventListener("click", F), p("dialog-underlay").addEventListener("click", x), p("dialog-close").addEventListener("click", x), p("dialog").addEventListener("click", e => e.stopPropagation()), p("cemantix").addEventListener("click", e => Z(e, "cemantix", "pedantix")), p("pedantix").addEventListener("click", e => Z(e, "pedantix", "cemantix")), document.addEventListener("visibilitychange", e => {
            "visible" == document.visibilityState ? t || (T(), t = setInterval(T, s)) : (clearInterval(t), t = null)
        }), t = setInterval(T, s), window.addEventListener("beforeunload", e => {
            for (var t in i) p(t + "-see").checked = !1, i[t].teamRef && H(i[t])
        }), U(), "serviceWorker" in navigator && navigator.serviceWorker.register("/worker.js").catch(() => {})
    }
};
window.addEventListener("load", async () => ee.init());
export {
    O as darkMode, Y as initGame
};