const Model = require('../model/ModelVideo');

module.exports = function(req, res){
  const videos = new Model({
    videos: req.body.videos
  });
  videos.save(function(err) {
    if (err)
      res.send(err);
    res.json({ videos: videos });
  });
};