const passport = require('passport');
const express = require('express');

const router = express.Router();

const Topic = require('../../models/Topic');
const User = require('../../models/User');

router.get('/all', (req, res) => {
  Topic.find()
    .sort({ date: -1 })
    .then(topics => {
      res.json(topics);
    })
    .catch(err => res.status(404).json({ nopostsfound: 'No topics found' }));
});

router.post('/single', (req, res) => {
  Topic.findById(req.body.id)
    .then(topic => {
      res.json(topic);
    })
    .catch(err => res.status(404).json({ notopicsfound: 'No topics found' }));
});

router.post('/create', (req, res) => {
  const newTopic = new Topic({
    description: req.body.description,
    name: req.user.name,
    user: req.user.id,
    title: req.body.title,
  });
  newTopic
    .save()
    .then(topic => res.json(topic))
    .catch(err => {
      console.log(err);
      res.send(404);
    });
});

router.post('/comment/create', (req, res) => {
  var comment = {
    name: req.body.name,
    text: req.body.text,
  };
  Topic.updateupdate(
    { _id: req.body.id },
    { $push: { comments: comment } }
  ).catch(err => res.status(404).json({ notopicsfound: 'No topics found' }));
});

module.exports = router;
