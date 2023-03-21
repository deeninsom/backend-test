const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const auth = require('./auth');
const users = require('./users');


// Inisialisasi server Express
const app = express();
const port = 3000;

// Tambahkan middleware untuk mengurai permintaan HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inisialisasi server JSON
const middlewares = jsonServer.defaults();

app.use(middlewares);

// Jalankan server
app.use('/api',auth, users);


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});