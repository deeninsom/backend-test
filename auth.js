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
  
    res.json({ data: {name, password}, message: "Sukses" });
  });

  auth.post('/register', (req, res) => {
    const { name,email, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ error: 'Data pengguna tidak lengkap' });
    }
  
    // const userExist = router.db.some(u => u.name === name);
  
    // if (userExist) {
    //   return res.status(409).json({ error: 'name telah terdaftar' });
    // }
  
    const newUser = {
      id: router.db.get('users').size().value() + 1,
      name,
      email,
      password
    };
  
    router.db.push(newUser);
  
    res.json({ data: newUser });
  });

  module.exports = auth