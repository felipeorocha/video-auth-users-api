const Usuario = require('../model/ModelUsuario');
const jwt = require('jwt-simple');
const moment = require('moment');
const segredo = 'seusegredodetoken';

module.exports = function(req, res) {
  const username = req.body.username || '';
  const password = req.body.password || '';

  if (username == '' || password == '') {
    return res.send(401);
  }

  Usuario.findOne({ username: username }, function (err, user) {
    if (err) {
      return res.json(401, err)
    }

    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + user.username);
        return res.send(401);
      }

    const expires = moment().add(7,'days').valueOf();
    const token = jwt.encode({
      iss: user.id,
      exp: expires
    }, segredo);

    return res.json({
      token : token,
      expires: expires,
      user: user.toJSON()
    });
    });
  });
};