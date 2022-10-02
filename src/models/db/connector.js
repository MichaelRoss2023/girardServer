const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;

/*
* useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer 
* necessary in mongoose 6
*/
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;