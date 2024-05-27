const User = require('../models/useModel')
const bcrypt = require('bcrypt')

module.exports.register = async(req, res, next) => {


    try {
        const { username, email, password } = req.body
            // decontrust the data
        console.log(req.body);
        res.send('Registration endpoint hit'); // This confirms the endpoint is reached
        const UsernameCheck = await User.findOne({ username })
        if (UsernameCheck) {
            return res.json({ message: "Username already taken ", status: false })
        }

        const EmailCheck = await User.findOne({ email })
        if (EmailCheck) {
            return res.json({ message: "User with this email already exists ", status: false })
        }

        const hashedPw = await bcrypt.hash(password);
        const user = await User.create({
            email,
            username,
            password: hashedPw,
        });
        //return the created user object 
        return user.json({ status: true, user })
            //true and false to denote succession and failure of the operation

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", status: false })
    }


};