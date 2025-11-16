import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await UserModel.createUser(email, password);
        res.status(201).json({success: true, message: user});
    }catch(err){
        console.log(err);
        res.status(400).json({success: false, message: err})

    }

}