require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const sampleQuestions = [
  {
    title: 'Basic HTML Structure',
    description: 'What are the essential tags for a basic HTML document?',
    category: 'html',
    difficulty: 'easy',
    testCases: [],
  },
  {
    title: 'CSS Box Model',
    description: 'Explain the components of the CSS box model.',
    category: 'css',
    difficulty: 'easy',
    testCases: [],
  },
  {
    title: 'Center a Div',
    description: 'How do you center a div element both horizontally and vertically using Flexbox?',
    category: 'css',
    difficulty: 'medium',
    testCases: [],
  },
  {
    title: 'JavaScript Data Types',
    description: 'What are the primitive data types in JavaScript?',
    category: 'js',
    difficulty: 'easy',
    testCases: [],
  },
  
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();
