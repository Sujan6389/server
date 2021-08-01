const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');

const {readdirSync} = require("fs"); // access to file system

require('dotenv').config()



//app
const app =express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,

})
.then(()=>console.log("DB CONNECTED"))
.catch((err)=> console.log("DB CONNECTIOPN ERR",err));

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

// routes midddleware

readdirSync('./routes').map((r)=>app.use("/api",require('./routes/' +r)));

//decide port

const port = process.env.port || 8000;

app.listen(port,()=>console.log(`Server is running on port ${port}`));
