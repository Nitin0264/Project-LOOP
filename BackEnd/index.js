const express = require('express')
const cors = require('cors')
require('dotenv').config()
const feedbackRoutes = require("./routes/feedbackRoutes");
const aiRoutes = require("./routes/aiRoutes");

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()

// Connect MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use("/feedback", feedbackRoutes);
app.use("/ai", aiRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Project LOOP Backend is running')
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})