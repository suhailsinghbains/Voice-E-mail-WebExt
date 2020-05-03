var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
var username = 'suhail.bains7@gmail.com';
var password = 'Suhail1998';

chrome.runtime.onMessage.addListener(function (msg, sender) {
    let choice = msg.data;
    if (choice.code == 0) {
        Email.send({
            Host: "smtp.gmail.com",
            Username: username,
            Password: password,
            To: msg.data.payload['to'],
            From: username,
            Subject: "",
            Body: msg.data.payload['msg'],
        });
    }
    // chrome.tabs.update(sender.tab.id, { url: myNewUrl });
});