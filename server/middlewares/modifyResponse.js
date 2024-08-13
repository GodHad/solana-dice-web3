module.exports = (req, res, next) => {
    

    const _render =  res.render;

    res.render = (url, data) => {
        // console.log('render', url, data)
        _render.call(res, url, {
            ...data,
            user: req.session.user
        })
    }

    next()
}