const bcrypt = require('bcryptjs');
const User = require('../user/user.model');

const createUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    const error = new Error('Email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    name,
    email,
    password: hashedPassword,
  });
};

const authenticateUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  return user;
};

module.exports = {
  authenticateUser,
  createUser,
};