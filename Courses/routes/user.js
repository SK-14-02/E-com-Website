const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken')
router.post('/registration', async (req, res) => {
    try {
        let { full_name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = new User({ full_name, email, password });
        await user.save();
        return res.status(200).json({
            message: "Added Successfully",
            user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "something wrong",
            err
        })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const verifyuser = await bcrypt.compare(password, user.password);
            if (verifyuser) {
                const payload = {
                    user:{
                        id:user._id,
                        name:user.full_name
                    }
                }
                const token = jwt.sign(payload,'siliconMERNCourse',{expiresIn:3600});
                res.status(200).json({
                    message: "Logged in",
                    user:{user_id:user._id,email:user.email},
                    token
                })
            }
            else {
                res.status(401).json({
                    message: "Wrong Username or Password"
                })
            }
        }
        else {
            res.status(401).json({
                message: "something went wrong"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err.message
        })
    }

})
module.exports = router;
