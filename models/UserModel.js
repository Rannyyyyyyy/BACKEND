import pool from './db.js';
import validator from "validator";
import bcrypt from "bcryptjs";

export const createUser = async (email, password) => {
  if (email === '') {
    throw new Error('Invalid email');
  }


  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }

  
  const [user] = await pool.query(
    "SELECT * FROM tbluser WHERE email = ?",
    [email]
  );

  if (user.length > 0) {
    throw new Error('An account is already created with that email');
  }

  if (password === '') {
    throw new Error('Invalid password');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password too weak');
  }

  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync(password, salt);

  const [newUser] = await pool.query(
    "INSERT INTO tbluser(email, password) VALUES(?, ?)",
    [email, newPassword]
  );

  return newUser.insertId;
};