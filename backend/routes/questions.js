const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get questions by category
router.get('/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  const question = new Question({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    difficulty: req.body.difficulty,
    testCases: req.body.testCases,
    image: req.body.image,
    baseCode: req.body.baseCode,
    answerCode: req.body.answerCode,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single question by ID
router.get('/id/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: 'Cannot find question' });
    }
    res.json(question);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/api/analyze', async (req, res) => {
  const { title, description, code } = req.body;

  try {
    const question = await Question.findOne({ title, description });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (code === question.answerCode) {
      res.json({ analysis: 'Correct' });
    } else {
      res.json({ analysis: 'Incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing code' });
  }
});

module.exports = router;
