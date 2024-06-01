const User = require('../models/useModel')
const bcrypt = require('bcrypt')

/**
 * 

 */
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            next(); // Pass the error to the next middleware if needed
        });
};

module.exports.register = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)

            return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};
module.exports.setAvatar = async(req, res, next) => {
    try {

        const userId = req.params.id;
        //url ma atatched avatat image id
        const AvatarImg = req.body.image;
        // image is passed from frontend
        const UserData = await User.findByIdAndUpdate(userId, {
            isAvatarImgSet: true,
            AvatarImg
        })

        return res.json({ isSet: UserData.isAvatarImgSet, image: UserData.AvatarImg })



    } catch (ex) {
        next(ex)
    }
}

// exports.login = asyncHandler(async(req, res) => {
//     const { username, password } = req.body;

//     // Basic validation (consider more robust validation using libraries like Joi)
//     if (!username || !password) {
//         return res.status(400).json({ message: 'Please provide username and password' });
//     }

//     try {
//         // Find user by username
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Validate password using bcrypt (ensure password hashing in your User model)
//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Login successful
//         // Generate JWT token (consider using a dedicated library likejsonwebtoken)
//         // const token = await user.generateAuthToken();

//         res.status(200).json({
//             message: 'Login successful',
//             user: {
//                 _id: user._id,
//                 username: user.username,
//             },
//             // token,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });