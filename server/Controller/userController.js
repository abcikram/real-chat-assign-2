const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")


//create Token :-
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

//register :-
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) return res.status(400).json("All field is required")

        let Checkuser = await userModel.findOne({ email })
        if (Checkuser) return res.status(400).json("User's email is already exist")

        if (!validator.isEmail(email)) return res.status(400).json("Email is must be valid ...")

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong password...")

        let user = await userModel.create(req.body)

        //encrypted password
        const salt = await bcrypt.genSalt(10) //salt 10 characters
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        //create token for register user 
        const token = createToken(user._id)  // this (user._id) goes to createToken parameter and using
        //jwt.sign we are creating the token and this token will store "token" parameter

        res.status(200).json({ _id: user._id, name, email, token })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}


//login user :-
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        let findUser = await userModel.findOne({ email })

        if (!findUser) return res.status(400).json("Invalid email or password ...")

        // bcrypt.compare:- compare the password entered by user with the previously stored hased password .
        const isValidPassword = await bcrypt.compare(password, findUser.password)

        if (!isValidPassword) return res.status(400).json("Invalid email or password ...")

        //create token for register user 
        const token = createToken(findUser._id)  // this (findUser._id) goes to createToken parameter and using
        //jwt.sign we are creating the token and this token will store "token" parameter

        res.status(200).json({ _id: findUser._id, name: findUser.name, email, token })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

//find the User by params:- 
const findUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

//find all Users :-
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

//module exports :-
module.exports = { registerUser, loginUser, findUser ,getUsers}