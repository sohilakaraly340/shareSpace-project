const mongoose = require("mongoose")

const dburi = process.env.DB_URI

const dbConnection = mongoose.connect(dburi)
.then(()=> console.log("Connected to MongoDB..."))
.catch((err)=> console.log("could not connect to MonggoDB...",err))


module.exports = dbConnection;