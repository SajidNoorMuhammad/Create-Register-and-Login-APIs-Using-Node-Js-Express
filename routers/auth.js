import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import Joi from 'joi'

const router = express.Router();

const schema = Joi.object({
    email: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    fullname: Joi.string().alphanum().min(3).max(30).required(),
})

router.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;
    
})

router.post('/login', (req, res) => {

})