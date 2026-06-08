import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Note: For real world use, you'd hash the password on signup and compare on login.
// Since there's no signup required, we'll assume a seeder will seed a user.

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' })
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

export const getUserInfo = (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email
  });
};
