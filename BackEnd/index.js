import express from 'express'
import cors  from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import { authRoutes } from './routes/authRoutes.js'
import { feedbackRoutes } from "./routes/feedbackRoutes.js";
import { aiRoutes } from "./routes/aiRoutes.js";
const PORT = process.env.PORT || 5000;

dotenv.config()


const app = express()

// Connect MongoDB
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use('/auth', authRoutes)
app.use("/feedback", feedbackRoutes);
app.use("/ai", aiRoutes);

app.get('/', (req, res) => {
  res.send('<h2>App is running !</h2>')
})


app.use('/auth', authRoutes)


try {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
} catch (err) {
  console.log("Unable to start server : ", err);
}