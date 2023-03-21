const jsonServer = require('json-server');
const auth = jsonServer.create();
const router = jsonServer.router('db.json');

auth.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ error: 'Data pengguna tidak lengkap' });
    }
  
    const user = router.db.find(u => u.name === name && u.password === password);
  
    if (!user) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
  
    res.json({ data: user });
  });

  auth.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const id = router.db.get('users').size().value() + 1;
    router.db.get('users').push({ id, name, email, password }).write();
    res.json({ id, name, email, password });
});

  module.exports = auth