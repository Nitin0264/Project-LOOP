<<<<<<< HEAD
import express from "express";

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Connected to the port ${PORT}`);
});
=======
import express, { urlencoded } from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;


const corsOption = {
    origin: process.env.CORS_ORIGIN
}


app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded())


app.get('/', (req, res) => {
    res.send('<h2>Server is Running</h2>');
});


try {

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

} catch(err) {
    console.log("Unable to start server : ", err);
}
>>>>>>> b39ee00ec1fd0d43d0c64b05af8b458df27a7ba5
