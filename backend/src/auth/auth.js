const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = JSON.parse(JSON.parse(user))
        next(err)
    })
}

function authenticate(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    return accessToken
}

module.exports = {authenticate, authorize}