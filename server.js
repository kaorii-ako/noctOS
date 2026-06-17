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
