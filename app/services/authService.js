const jwt = require('jwt-simple');

module.exports = {
  authUser: function(req, res) {
    const { authorization } = req.headers;
    const { iss: user } = jwt.decode(authorization, 'seusegredodetoken');

    return user;
  }
};
