import mongoose from 'mongoose'

const SolvedQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  acceptedAnswer: {
    type: String,
    required: true,
  },
})

export default mongoose.models.SolvedQuestion || mongoose.model('SolvedQuestion', SolvedQuestionSchema)
