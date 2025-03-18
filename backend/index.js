const express = require("express");
const app = express();
const user = require("./routes/users")
const cors = require("cors")
const morgan = require("morgan")
const transaction = require("./routes/transactionRoutes")

require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4000;

require("./config/database").connect();

app.use("/api/v1", user)

app.use("/api/t1", transaction)

app.listen(PORT, (req,res)=>{
    console.log("Server is started")
})

app.get("/", (req, res)=> {
    res.send("Hello World");
})