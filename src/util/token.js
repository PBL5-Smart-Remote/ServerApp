const jwt = require('jsonwebtoken')
const User = require('../app/models/User');

class TokenAuth {
    static async generateToken(claim) {
        return jwt.sign(JSON.stringify({ claim: claim }), process.env.SECRET_KEY)
    }

    static async checkToken(token) {
        var user = null
        await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            user = err ? null : await User.getUser(decoded.claim)
        });
        return user
    }

    static async verifyToken(token) {
        var user = await TokenAuth.checkToken(token)
        var newToken = user ? await TokenAuth.generateToken(user._id) : null
        return newToken
    }
}


module.exports = {
    getUserByToken: TokenAuth.checkToken,
    generateToken: TokenAuth.generateToken,
    verifyToken: TokenAuth.verifyToken,
};


