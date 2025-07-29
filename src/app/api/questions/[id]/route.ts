import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/question";

export async function GET(
  request: Request
) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ message: "Question ID not provided" }, { status: 400 });
    }
    const question = await Question.findById(id);
    if (question == null) {
      return NextResponse.json(
        { message: "Cannot find question" },
        { status: 404 }
      );
    }
    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}