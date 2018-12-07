const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UsuarioSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err)
        return next(err);
      user.password = hash;
      next();
    });
  });
});

UsuarioSchema.methods.verificaSenha = function(password, next) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err)
      return next(err);
    next(isMatch);
  });
};
module.exports = mongoose.model('Usuario', UsuarioSchema);