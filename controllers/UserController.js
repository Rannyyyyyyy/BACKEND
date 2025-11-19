import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.createUser(email, password);
        res.status(201).json({ success: true, message: `User created with ID ${user}` });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password); // returns { id, token }
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message });
    }
};
