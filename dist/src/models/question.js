import mongoose from "mongoose";
var Schema = mongoose.Schema, model = mongoose.model, models = mongoose.models;
var QuestionSchema = new Schema({
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
        enum: ["html", "css", "js", "sql", "mongodb"],
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"],
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
var Question = models.Question || model("Question", QuestionSchema);
export default Question;
