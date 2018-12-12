const ModelVideo = require("../model/ModelVideo");
const auth = require(".././services/authService");


module.exports = {
  async index(req, res) {
    const user = auth.authUser(req);
    const videos = await ModelVideo.find({ user });

    return res.json(videos);
  },
  async store(req, res) {
    const user = auth.authUser(req);
    const videos = await ModelVideo.create({ ...req.body, user });

    return res.json(videos);
  }
};
