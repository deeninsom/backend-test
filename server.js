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
    res.status(200).json({data : data});
});

// Endpoint untuk menampilkan pengguna berdasarkan ID
server.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = router.db.get('users').find({ id }).value();
    res.json({data : {data}});
});

// Endpoint untuk menambahkan pengguna baru
server.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = {
        id: router.db.get('users').size().value() + 1,
        name,
        email,
        password
      };
    
      router.db.push(newUser);  res.json({data : {data}});
});

// Endpoint untuk mengubah data pengguna
server.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    router.db.get('users').find({ id }).assign({ name, email,password }).write();
    res.json({data: {name,email, password}, message: 'User Update'})
});

// Endpoint untuk menghapus pengguna berdasarkan ID
server.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = router.db.get('users').remove({ id }).write();
    res.json({data : {data}, message: 'User deleted' })
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});