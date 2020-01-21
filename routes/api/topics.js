const passport = require('passport');
const express = require('express');

const router = express.Router();

const Topic = require('../../models/Topic');
const User = require('../../models/User');

router.get('/all', (req, res) => {
  // send = [];
});

router.post('/create', (req, res) => {
  const newTopic = new Topic({
    description: req.body.description,
    name: req.body.name,
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

module.exports = router;
