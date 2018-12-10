const ModelVideo = require("../model/ModelVideo");

module.exports = {
  async index(req, res) {
    const videos = await ModelVideo.find({});

    return res.json(videos);
  },
  async store(req, res) {
    const videos = await ModelVideo.create(req.body);
    return res.json(videos);
  }
};
