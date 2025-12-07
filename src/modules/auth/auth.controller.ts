import  { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        console.log("hello", email, password);
        const result = await authService.loginUser(email, password)
        res.status(201).json({
            success: true,
            message: "Login successfully",
            data: result
        })
    }catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message,
        msg: "helloooooooooooooo"
    })
   }
}
export const authController = {
    loginUser
}