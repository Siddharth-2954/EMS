const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("Connected to database successfully!")})
    .catch((err) => {
        console.log("Error occured")
        console.error(err)
    })
}
