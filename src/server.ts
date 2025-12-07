
import express from "express"
import config from "./config/config"
import { userRoutes } from "./modules/user/user.routes"
import bodyParser from "body-parser";
import initDB from './config/DB';
import { authRoutes } from "./modules/auth/auth.routes";
const app = express()
const port = config.port


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

initDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//post user 
app.use('/users', userRoutes)

app.use("/auth", authRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
