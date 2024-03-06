const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/users.route')

app.use(cors())
app.use(express.json())

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://rrohamsaad:HDHTwFgvqbk1YJqB@cluster0.rbqjvso.mongodb.net/nodeClass?retryWrites=true', { useNewUrlParser: true });
    console.log("Database Connected")
}
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connection has been established successfully')
})

app.use('/api', userRouter.router)

app.listen(9000, () => {
    console.log("Port is running on 9000")
})