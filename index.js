const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/users.route')
const authRouter = require('./routes/auth.route')
const dotenv = require("dotenv")
dotenv.config()

app.use(cors())
app.use(express.json())

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    console.log("Database Connected")
}
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connection has been established successfully')
})

app.use('/user', userRouter.router)
app.use('/auth', authRouter.router)

app.listen(process.env.PORT, () => {
    console.log("Port is running on "+ process.env.PORT )
})