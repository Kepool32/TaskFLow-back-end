const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error("Ошибка подключения к MongoDB:", err);

    }
};

module.exports = connectDB;
