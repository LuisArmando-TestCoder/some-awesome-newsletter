// Fake SMTP inbox for local end-to-end tests. Accepts any login, keeps every message.
// HTTP: GET /messages (JSON list), DELETE /messages (clear). SMTP on 2525, HTTP on 2580.
const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const http = require('http');
const messages = [];
const smtp = new SMTPServer({
  authOptional: true, disabledCommands: ['STARTTLS'], logger: false,
  onAuth(auth, session, cb) { cb(null, { user: auth.username }); },
  onData(stream, session, cb) {
    simpleParser(stream).then((m) => {
      messages.push({ at: new Date().toISOString(), from: m.from?.text, to: m.to?.text, replyTo: m.replyTo?.text, subject: m.subject,
        text: m.text, html: m.html || '', headers: Object.fromEntries([...m.headers].map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)])) });
      cb();
    }).catch(cb);
  },
});
smtp.listen(2525, '127.0.0.1');
http.createServer((req, res) => {
  if (req.method === 'DELETE') { messages.length = 0; res.end('[]'); return; }
  res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(messages));
}).listen(2580, '127.0.0.1');
console.log('inbox ready');
