import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/question";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = {};
    if (category) {
      query = { category: { $regex: new RegExp(category, "i") } };
    }

    const questions = await Question.find(query);

    console.log(`Found ${questions.length} questions for category: ${category}`);

    return NextResponse.json(questions);
  } catch (e) {
    console.error("Error fetching questions:", e);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const question = new Question({
      title: body.title,
      description: body.description,
      category: body.category,
      difficulty: body.difficulty,
      testCases: body.testCases,
      image: body.image,
      baseCode: body.baseCode,
      answerCode: body.answerCode,
    });

    const newQuestion = await question.save();
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}