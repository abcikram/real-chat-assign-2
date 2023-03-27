const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.use("/api/users",userRoutes)
app.use("/api/chats",chatRoute)
app.use("/api/message",messageRoute)

app.get("/",(req,res) => {
    res.send("welcome to our chat-update-api")
})
const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI


app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
})
mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log("MongoDB connection failed :-",error.message))