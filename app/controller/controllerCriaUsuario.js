const Model = require('../model/ModelUsuario');

module.exports = function(req, res){
  const data = new Model({
    username: req.body.username,
    password: req.body.password
  });
  data.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Novo Usuário', data: data });
  });
};