const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const yup = require('yup')

// Schema for validating user
let userSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email(),
})

// Register
router.post("/register", async (req, res, next) => {
    let { username, email, password } = req.body
    try {
        // Validates email and username format.
        await userSchema.validate({
            username,
            email
        })
        // Hashes password with salt.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generates new user with their new hashed password.
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user.username);
    } catch (err) {
        res.status(400).json("Username/Email already in use.")
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!user || !validPassword) {
            throw Error("Invalid password")
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json("Wrong username/password!")
    }
})

module.exports = router