import express from 'express'
import {login_controller, register_controller} from '../controller/auth.controller.js'

const authRoutes = express.Router()

authRoutes.post('/register', register_controller)

authRoutes.post('/login', login_controller)


export  { authRoutes }