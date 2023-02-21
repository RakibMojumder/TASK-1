
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const userInfo = req.body;
        const isUserExits = await Users.findOne({ email: userInfo.email });
        if (isUserExits) return res.json({ success: false, message: "This email already exits" });

        bcrypt.hash(userInfo.password, saltRounds, async (err, hash) => {
            const result = await Users.create({ ...userInfo, password: hash });
            if (result) {
                delete userInfo.password
                res.json({
                    success: true,
                    message: "Successfully become a user"
                })
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};


const login = async (req, res) => {
    try {
        const userInfo = req.body;
        const user = await Users.findOne({ email: userInfo.email });

        if (user) {
            const isPassMatched = await bcrypt.compare(userInfo.password, user.password);
            if (!isPassMatched) {
                return res.json({ message: "Incorrect username or password" })
            };
            const payload = {
                email: user.email
            }

            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
            delete userInfo.password;
            res.json({
                success: true,
                message: 'Successfully logged in',
                token,
                userInfo
            })
        } else {
            res.json({
                success: false,
                message: "Could not find any account"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { register, login }