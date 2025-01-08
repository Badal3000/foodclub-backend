const dotenv = require("dotenv");
dotenv.config();


const express = require('express');
const { connectMongoDb } = require('./utils/connections');
const server = express();


let PORT = process.env.PORT || 5050;
const userRouter = require("./routes/user"); 
const foodRouter = require("./routes/food")
const http = require('http');
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/auth");
// const foodItems = require("./fooditems");
const cors = require('cors');
server.use(express.json());
server.use(cors());

// require("dotenv").config();

connectMongoDb("foodclub")
    .then(() => {
        console.log("Connected to MongoDB");
        listen();
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });



// server.use(express.json());
server.use(cookieParser());
server.use (express.urlencoded({ extended: true }));


server.use("/user", userRouter)
// server.use(checkAuth);
server.use("/food", foodRouter);    
server.get('/', (req, res) => {
    res.send('welcome to foodclub');
});

// server.get('/foodItems', (req, res) => {
//     res.json(foodItems);
// })


const myserver = http.createServer(server);

function listen() {
    try{
        myserver.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    }
    catch (err){
        console.log("server failed to start with error : ", err);
    }
    myserver.on("error", (error) => {
        if(error.code === "EADDRINUSE"){
            console.log("port" + PORT + " is already in use ...");
            PORT = PORT + 1;
            console.log("retrying with port" + PORT + "...") 
        }
    })
}
// listen();