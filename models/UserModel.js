import pool from './db.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (id) => {
    if (isNaN(parseInt(id))) {
        throw new Error('Invalid id');
    }
    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
    return user;
}

export const createUser = async (email, password) => {
    if (!email) throw new Error('Invalid email');
    if (!validator.isEmail(email)) throw new Error('Invalid email format');

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);
    if (user.length > 0) throw new Error(`The email ${email} is already used.`);

    if (!password) throw new Error('Invalid password');
    if (!validator.isStrongPassword(password)) throw new Error('Password too weak');

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const [newUser] = await pool.query("INSERT INTO tbluser(email, password) VALUES(?, ?)", [email, hashedPassword]);
    return newUser.insertId;
}

export const login = async (email, password) => {
    if (!email || !password) throw new Error('Email and Password are required');

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);
    if (user.length === 0) throw new Error(`An Account with email: ${email} does not exist.`);
    if (!bcrypt.compareSync(password, user[0].password)) throw new Error('Incorrect password');

    const token = jwt.sign({ id: user[0].id }, process.env.SECRET, { expiresIn: '24h' });
    return { id: user[0].id, token };
}
