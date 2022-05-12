const sauce = require('../models/sauce')
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new sauce({
      _id: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked
      });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

  exports.getOneSauce = (req, res, next) => {
    sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.modifySauce = (req, res, next) => {
    let sause = new sauce({ _id: req.params._id});
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: req.body.sauce.mainPepper,
        usersLiked: req.body.sauce.usersLiked,
        usersDisliked: req.body.sauce.usersDisliked
      };
    }else{
      sauce = {
        _id: req.params.id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        imageUrl: req.body.imageUrl,
        mainPepper: req.body.mainPepper,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked
    };
    }

    sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.deleteSauce = (req, res, next) => {
    sauce.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          sauce.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  };

  exports.getAllSauces = (req, res, next) => {
    sauce.find().then(
        (sauce) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
 };

 exports.likeSauce = (req, res, next) => {
  req.body = req.body;
  Sauce.findOne({
    _id: req.params.id,
  }).then((sauce) => {
    if (req.body.like == 1) {
      sauce.usersLiked.push(req.body.userId);
      sauce.likes += req.body.like;
    } else if (
      req.body.like == 0 &&
      sauce.usersLiked.includes(req.body.userId)
    ) {
      sauce.usersLiked.remove(req.body.userId);
      sauce.likes -= 1;
    } else if (req.body.like == -1) {
      sauce.usersDisliked.push(req.body.userId);
      sauce.dislikes += 1;
    } else if (
      req.body.like == 0 &&
      sauce.usersDisliked.includes(req.body.userId)
    ) {
      sauce.usersDisliked.remove(req.body.userId);
      sauce.dislikes -= 1;
    }
    sauce
      .save()
      .then(() => {
        res.status(201).json({
          message: "Feedback is given",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};