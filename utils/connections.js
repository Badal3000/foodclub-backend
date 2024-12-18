const mongoose = require('mongoose');

exports.connectMongoDb = async (database_name = "") => {
    // console.log("fshefjkbsjkdb : ", process.env)
    const connectionUrl = `${process.env.MONGODB_URL}/${process.env.MONGO_DB || database_name}`;
    return mongoose.connect(connectionUrl);
    //    .then (() => console.log("MongoDB Connected..."))
    //    .catch(err => console.log(err));  
};