import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Webular
            </h1>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
