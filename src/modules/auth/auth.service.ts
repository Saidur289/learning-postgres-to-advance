import jwt from "jsonwebtoken"
import { pool } from "../../config/DB";
import bcrypt from "bcryptjs"
import config from "../../config/config";
const loginUser = async(email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
   
    if(result.rows.length === 0){
        return null
    }
    const user = result.rows[0]
     const match = bcrypt.compare(password, user.password)
     if(!match) return false
    console.log({user});
    const secret = `${config.jwt_secret}`
    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, secret, {expiresIn: "7d"} )
    console.log(token);
    return {user, token}
    
}
export const authService = {
    loginUser
}