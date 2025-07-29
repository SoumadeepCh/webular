
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/question";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { title, description, code } = await request.json();

    const question = await Question.findOne({ title, description });

    if (!question) {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    if (code === question.answerCode) {
      return NextResponse.json({ analysis: "Correct" });
    } else {
      return NextResponse.json({ analysis: "Incorrect" });
    }
  } catch (error: any) {
    console.error("Error analyzing code:", error);
    return NextResponse.json(
      { message: "Error analyzing code", error: error.message },
      { status: 500 }
    );
  }
}
