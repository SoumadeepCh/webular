'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Question {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
}

export default function JavascriptQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/questions/js');
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 font-sans">JavaScript Questions</h1>
      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => (
          <Link key={question._id} href={`/questions/${question._id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {question.title}
                  <Badge variant="outline">{question.difficulty}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{question.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
