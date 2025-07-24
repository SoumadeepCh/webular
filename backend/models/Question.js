const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js', 'sql', 'mongodb'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
  },
  image: {
    type: String,
  },
  baseCode: {
    type: String,
  },
  answerCode: {
    type: String,
  },
  testCases: [
    {
      input: String,
      output: String,
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
