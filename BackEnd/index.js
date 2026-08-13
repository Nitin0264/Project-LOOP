const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
connectDB()
app.use('/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('Project LOOP Backend is running')
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})