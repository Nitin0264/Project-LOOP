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