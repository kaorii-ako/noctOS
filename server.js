const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'NoctOS', version: '1.0.0' });
});

// ─── Web proxy: lets the in-OS Safari load real sites that would
//     otherwise refuse to embed (X-Frame-Options / CSP frame-ancestors).
function isBlockedHost(host) {
  return /^(localhost|0\.0\.0\.0|\[?::1\]?|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(host)
    || host.endsWith('.local') || host.endsWith('.internal');
}

function rewriteHTML(html, baseURL) {
  const inject = `<base href="${baseURL.replace(/"/g, '&quot;')}">` +
    `<script>(function(){` +
    `function abs(u){try{return new URL(u,document.baseURI).href}catch(e){return null}}` +
    `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;` +
    `var h=a.getAttribute('href');if(!h||h[0]==='#'||/^(javascript|mailto|tel|data):/i.test(h))return;` +
    `var u=abs(a.href);if(!u||!/^https?:/i.test(u))return;e.preventDefault();parent.postMessage({__noctNav:u},'*')},true);` +
    `document.addEventListener('submit',function(e){var f=e.target;if(!f)return;` +
    `if((f.method||'get').toLowerCase()!=='get')return;var act=abs(f.getAttribute('action')||document.baseURI);if(!act)return;` +
    `var q=new URLSearchParams(new FormData(f)).toString();e.preventDefault();` +
    `parent.postMessage({__noctNav:act+(act.indexOf('?')<0?'?':'&')+q},'*')},true);` +
    // Route cross-origin GET fetch/XHR through the proxy so site APIs don't die on CORS.
    `var P='/api/proxy?url=';function xo(u){try{var a=new URL(u,document.baseURI);return a.origin!==location.origin&&/^https?:/i.test(a.href)?a.href:null}catch(e){return null}}` +
    `var of=window.fetch;window.fetch=function(i,o){try{var m=((o&&o.method)||(i&&i.method)||'GET').toUpperCase();var u=typeof i==='string'?i:(i&&i.url);var x=u&&m==='GET'&&xo(u);if(x){i=typeof i==='string'?P+encodeURIComponent(x):new Request(P+encodeURIComponent(x),i)}}catch(e){}return of.call(this,i,o)};` +
    `var oo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){try{if((m||'GET').toUpperCase()==='GET'){var x=xo(u);if(x)arguments[1]=P+encodeURIComponent(x)}}catch(e){}return oo.apply(this,arguments)};` +
    `})();</script>`;
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, m => m + inject);
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, m => m + inject);
  return inject + html;
}

app.get('/api/proxy', async (req, res) => {
  let target = req.query.url;
  if (!target) return res.status(400).send('Missing url');
  try { target = decodeURIComponent(target); } catch {}
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
  let targetURL;
  try { targetURL = new URL(target); } catch { return res.status(400).send('Invalid url'); }
  if (isBlockedHost(targetURL.hostname)) return res.status(403).send('Host not allowed');

  try {
    const upstream = await fetch(target, {
      redirect: 'follow',
      headers: {
        'User-Agent': req.get('user-agent') || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': req.get('accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const ct = upstream.headers.get('content-type') || 'application/octet-stream';
    const finalURL = upstream.url || target;
    // Strip framing/security headers that would block embedding.
    ['x-frame-options', 'content-security-policy', 'content-security-policy-report-only',
     'cross-origin-opener-policy', 'cross-origin-embedder-policy'].forEach(h => res.removeHeader(h));
    res.setHeader('Content-Type', ct);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (ct.includes('text/html')) {
      res.send(rewriteHTML(await upstream.text(), finalURL));
    } else {
      res.send(Buffer.from(await upstream.arrayBuffer()));
    }
  } catch (e) {
    res.status(502).send(
      `<body style="margin:0;font-family:-apple-system,system-ui,sans-serif;background:#1c1c1e;color:#e5e5e7;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center">
        <div style="font-size:46px;margin-bottom:10px">🌐</div>
        <div style="font-size:18px;font-weight:600">Can't reach ${targetURL.hostname}</div>
        <div style="font-size:13px;color:#8e8e93;margin-top:6px;max-width:320px">${(e.message || 'Network error').replace(/[<>]/g,'')}</div>
      </body>`);
  }
});

// API: Get notes (in-memory store for demo)
let notes = [
  { id: 1, title: 'Welcome to NoctOS', content: 'This is a full-stack web operating system.', updatedAt: Date.now() }
];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const note = { id: Date.now(), ...req.body, updatedAt: Date.now() };
  notes.push(note);
  res.status(201).json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  notes[index] = { ...notes[index], ...req.body, updatedAt: Date.now() };
  res.json(notes[index]);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(n => n.id !== id);
  res.status(204).end();
});

// Serve NoctOS app
app.get('/os', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'os.html'));
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ╭─────────────────────────────────────╮`);
  console.log(`  │                                     │`);
  console.log(`  │   ◗ NoctOS Server                   │`);
  console.log(`  │                                     │`);
  console.log(`  │   → http://localhost:${PORT}            │`);
  console.log(`  │   → http://localhost:${PORT}/os         │`);
  console.log(`  │                                     │`);
  console.log(`  ╰─────────────────────────────────────╯\n`);
});
