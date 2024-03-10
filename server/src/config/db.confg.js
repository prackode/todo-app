const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((conn) => {
            console.log(`DB connected succesfully: ${conn.connection.host}`);
        }).catch((e) => {
            console.log(`Error connecting to DB: ${e.message}`);
        })
}

module.exports = connectDB;