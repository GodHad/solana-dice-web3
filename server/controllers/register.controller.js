const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const constants = require('@constants')

const User = mongoose.model('User')

const view = (req, res) => {
    res.render("register")
}

const register = async (req, res) => {
 
    try {
        let hash = bcrypt.hashSync(req.body.password, constants.saltRounds);

        let userInstance = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            userName: req.body.username,
            password: hash
        })
        
        await userInstance.save()

        res.redirect('/login')
    } catch(err) {
        res.render('register', {message: "Something wrong, please try again!"})
    }
}

module.exports = {
    view,
    register
}