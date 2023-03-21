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


  module.exports = auth