const jsonServer = require('json-server');
const users = jsonServer.create();
const router = jsonServer.router('db.json');
// Endpoint untuk menampilkan semua pengguna
users.get('/users', (req, res) => {
    const data = router.db.get('users').value();
    res.status(200).json({ data: data });
});

// Endpoint untuk menampilkan pengguna berdasarkan ID
users.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = router.db.get('users').find({ id }).value();
    res.json({ data: { data } });
});

// Endpoint untuk menambahkan pengguna baru
users.post('/users', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Data pengguna tidak lengkap' });
    }
    const newUser = {
        id: router.db.get('users').size().value() + 1,
        name,
        email,
        password
    };

    router.db.push(newUser);
    res.json({ data: newUser });
});

// Endpoint untuk mengubah data pengguna
users.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    router.db.get('users').find({ id }).assign({ name, email, password });
    res.json({ data: {name, email, password}, message: 'User Update' })
});

// Endpoint untuk menghapus pengguna berdasarkan ID
users.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    router.db.get('users').remove({ id });
    res.json({message: 'User deleted' })
})


module.exports = users