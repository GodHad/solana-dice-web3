const requireLogin = (req, res, next) => {
    req.session.redirectTo = req.originalUrl
    if(req.session.user) {
        return next()
    }
    else {
        res.redirect('login')
    }
}

const isLogged = (req, res, next)  => {
    if(!req.session.user) {
        return next()
    }
    else {
        res.redirect('/')
    }
}

const getUrl = (req, res, next) => {
    req.session.redirectTo = req.originalUrl
    next()
}

const sendData = (req, res, next) => {
    res.send({user: req.session.user})
    next()
}

module.exports = {
    requireLogin,
    sendData,
    isLogged,
    getUrl
}