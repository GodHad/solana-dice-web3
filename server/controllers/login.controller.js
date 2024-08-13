const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const User = mongoose.model("User")

const view = (req, res) => {
    res.render('login')
}

const login = async (req, res) => {
    try {
        let hash = ''
        await User.findOne({'userName': req.body.username}, (err, result) => {
            if(err) throw err
            if(result == null)
            {
                res.render('login', {message: "invalid username or password!"})
            }
            else 
            {
                hash = result.password

                if(bcrypt.compareSync(req.body.password, hash) ==  true)
                {
                    req.session.user = {username: req.body.username}

                    res.redirect(req.session.redirectTo || '/')
                    delete req.session.redirectTo
                }
                else
                {
                    res.render('login', {message: "invalid username or password!"})
                }
            }
        })
    } catch(err) {
        res.render('login', {message: "Something wrong, please try again!"})
    }
    
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    view,
    login,
    logout
}