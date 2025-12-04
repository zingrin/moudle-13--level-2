import { Request,Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async(req:Request,res:Response) =>{
const {email,password} = req.body;
try {
const result = await authServices.loginUser(email,password);
if(!result.success)
{
return res.status(400).json({
    success: false,
    message:result.message
})
}    // console.log(result.rows[0]);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
}

}
export const authController = {
   loginUser 
}