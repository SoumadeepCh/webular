import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface TopicCardProps {
  title: string;
  href: string;
}

export default function TopicCard({ title, href }: TopicCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Practice {title} questions</p>
        </CardContent>
      </Card>
    </Link>
  );
}
