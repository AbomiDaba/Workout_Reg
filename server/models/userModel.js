import mongoose from 'mongoose'
import brcypt from 'bcrypt'
import validator from 'validator'


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
})

//Static signup method
userSchema.statics.signup = async function(email, password) {
    
    //validattion
    if(!email || !password) {
        throw Error('All feilds must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exits = await this.findOne({email})

    if (exits) {
        throw Error('Email already in use')
    }

    //Hash password
    const salt = await brcypt.genSalt(10)
    const hash = await brcypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user

}

//Static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All feilds must be filled')
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await brcypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

const User = mongoose.model('User', userSchema)

export default User