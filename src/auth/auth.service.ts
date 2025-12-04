import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
const loginUser = async(email:string, password: string)=>{
console.log({email});
const result = await pool.query(`
    SELECT * FROM users WHERE email = $1`,[email]);
    console.log({result});
    if(result.rows.length === 0){
        return {
            success: false,
            message:"user not found"
        };
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password,user.password);
    console.log({match,user});
    if(!match){
        return {
            success:false,
            message:"Incorrect Password"
        };
    }
const token = jwt.sign({name: user.name, email: user.email, role:user.role},config.jwtSecret as string,
    {
    expiresIn: "7d",
});
return {
      success: true,
      message: "Login Successfully",
      data: {token,user},
    }

};
export const authServices = {
    loginUser
}