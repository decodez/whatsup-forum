const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TopicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],
});

module.exports = Topic = mongoose.model('topic', TopicSchema);
