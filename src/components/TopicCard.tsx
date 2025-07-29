import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface TopicCardProps {
  title: string;
  href: string;
  loading?: boolean;
  questionCount?: number;
}

export default function TopicCard({ title, href, loading, questionCount }: TopicCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="dark:text-gray-400">Practice {title} questions ({questionCount})</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
