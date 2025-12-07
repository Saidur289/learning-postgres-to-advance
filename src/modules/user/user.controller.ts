import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async(req: Request, res: Response) => {
 
   try {
      // console.log("Body:", req.body); 
     const result = await userService.createUser(req.body)
     res.status(201).json({
        success: true,
        data: result.rows[0]
     })
   } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}

const getUser = async(req: Request, res: Response) => {
   try {
    
    const result = await userService.getUser()
     res.status(201).json({
        success: true,
        data: result.rows
     })
   } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}
const getSingleUserUser = async(req: Request, res: Response) => {
 try{
     const result = await userService.getSingleUser(req.params.id as string)
    if(result.rows.length === 0){
     
    res.status(500).json({
        success: false,
        message: "User not found"
    })
   
    }else{
        res.status(201).json({
        success: true,
        data: result.rows[0]
     })
    }
 }
 catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}
const updateUser = async(req: Request, res: Response) => {
  try{  const {name, email} = req.body
        console.log(name ,email, "hello");
        const result = await userService.updateUser(name, email, req.params.id as string)
        if(result.rows.length === 0){
          res.status(500).json({
        success: false,
        message: "User not found"
    })
        }else{
            res.status(201).json({
        success: true,
        data: result.rows[0],
        message: "Updated successfully"
     })
        }
  }catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}
const deleteUser = async(req: Request, res: Response) => {
  try{
       const result = await userService.deleteUser(req.params.id as string)
        if(result.rowCount === 0){
          res.status(500).json({
        success: false,
        message: "User not found"
    })
        }else{
            res.status(201).json({
        success: true,
       message: "Deleted successfully"
     })
        }
  }catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}
export const  userController = {
    createUser,
    getUser,
    getSingleUserUser,
    updateUser,
    deleteUser
}