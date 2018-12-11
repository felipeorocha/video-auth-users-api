const ModelVideo = require("../model/ModelVideo");
var jwt = require('jwt-simple');

module.exports = {
  async index(req, res) {
    const { authorization } = req.headers;

    const { iss: user } = jwt.decode(authorization, 'seusegredodetoken');

    const videos = await ModelVideo.find({ user });

    return res.json(videos);
  },
  async store(req, res) {
    const { authorization } = req.headers;

    const { iss: user } = jwt.decode(authorization, 'seusegredodetoken');

    const videos = await ModelVideo.create({ ...req.body, user });
    return res.json(videos);
  }
};
