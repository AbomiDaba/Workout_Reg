import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//Login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        
        //Create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//Signup user
export const signupUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.signup(email, password)
        
        //Create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}