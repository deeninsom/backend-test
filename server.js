const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const auth = require('./auth');


// Inisialisasi server Express
const app = express();
const port = 3000;

// Tambahkan middleware untuk mengurai permintaan HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inisialisasi server JSON
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Jalankan server
app.use('/api',auth, server);

// Endpoint untuk menampilkan semua pengguna
server.get('/users', (req, res) => {
    const data = router.db.get('users').value();
    res.json(data);
});

// Endpoint untuk menampilkan pengguna berdasarkan ID
server.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = router.db.get('users').find({ id }).value();
    res.json(data);
});

// Endpoint untuk menambahkan pengguna baru
server.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const id = router.db.get('users').size().value() + 1;
    const data = router.db.get('users').push({ id, name, email, password }).write();
    res.json(data);
});

// Endpoint untuk mengubah data pengguna
server.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    router.db.get('users').find({ id }).assign({ name, email,password }).write();
    res.json({ id, name, email, password });
});

// Endpoint untuk menghapus pengguna berdasarkan ID
server.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    router.db.get('users').remove({ id }).write();
    res.json({ message: 'User deleted' })
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});