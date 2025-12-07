import {Pool} from "pg"
import config from "./config"
 export const pool = new Pool({
    connectionString: `${config.connection_str}`
})
const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password TEXT,
        age INT,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
    
}
export default initDB