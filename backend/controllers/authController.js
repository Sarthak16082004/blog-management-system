const db = require('../config/mysql');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ message: 'User already exists' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};
