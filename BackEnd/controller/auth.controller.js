import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../model/user.js'
import { email, z } from "zod"


const register_controller = async(req,res) => {
const user_schema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  })

  try {
    const isValid = user_schema.safeParse(req.body)

    // Check required fields
    if (isValid.error) {
        console.log(isValid.error)
      return res.status(400).json({
        message: 'All fields are required',
        success: false
      })
    }
    const {email, name, password, confirmPassword} = isValid.data
    // Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Passwords do not match',
        success: false
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Registration error:', error)

    res.status(500).json({
      message: 'Server error',
      success: false
    })
  }
}


const login_controller = async (req,res) => {
  const login_schema = z.object({
    email: z.email(),
    password: z.string()
  })
try {
  const isValid = login_schema.safeParse(req.body)
   if (isValid.error) {
        console.log(isValid.error)
      return res.status(400).json({
        message: 'All fields are required',
        success: false
      })
    }
    const { email, password } = isValid.data

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

// set cookie
res.cookie("token", token)

    // Send response
    res.status(200).json({
      message: 'Login successful',

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}


export { register_controller, login_controller }