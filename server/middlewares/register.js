const mongoose = require("mongoose") 
const User = mongoose.model('User')

const validateFromInput = (req, res, next) => {
    let error = new Object()
    let result = User.validate({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    if(result != null) {
        result.details.forEach(detail => {
            if(detail.path[0] == 'firstname') {
                error.firstNameError = detail.message
            }
            if(detail.path[0] == 'lastname') {
                error.lastNameError = detail.message 
            }
            if(detail.path[0] == 'username') {
                error.userNameError = detail.message 
            }
            if(detail.path[0] == 'email') {
                error.emailError = detail.message 
            }
            if(detail.path[0] == 'password') {
                error.passwordError = 'at least 4 character, only alphabet and number is accepted'
            }
        });

        error.firstName = req.body.firstname
        error.lastName = req.body.lastname
        error.userName = req.body.username
        error.email = req.body.email
        res.render('register', error)
    }
    else {
        return next()
    }
}

const validateFromDb = async (req, res, next) => {
    let error = new Object()

    try {
        await User.findOne({'userName': req.body.username}, (err, result) => {
            if(err) throw err
            if(result != null) {
                error.userNameError = 'user name already exists'
            }
        })
    
        await User.findOne({'email': req.body.email}, (err, result) => {
            if(err) throw err
            if(result != null) {
                error.emailError = 'email already exists'
            }
        })
    
        if((Object.getOwnPropertyNames(error).length === 0)== false) {
            error.firstName = req.body.firstname
            error.lastName = req.body.lastname
            error.userName = req.body.username
            error.email = req.body.email
            res.render('register', error)
        }
        else {
            return next()
        }  
    } 
    catch(err) {
        res.render('register', {message: "Something wrong, please try again!"})
    } 
}
module.exports = {
    validateFromInput,
    validateFromDb
}