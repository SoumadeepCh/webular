import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function TopicCard(_a) {
    var title = _a.title, href = _a.href;
    return (<Link href={href}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Practice {title} questions</p>
        </CardContent>
      </Card>
    </Link>);
}
