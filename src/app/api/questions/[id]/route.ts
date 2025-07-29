
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/question";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const question = await Question.findById(params.id);
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
