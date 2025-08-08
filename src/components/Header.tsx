'use client'

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

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
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/profile">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Profile
                  </button>
                </Link>
                <p>Welcome, {session.user.name}</p>
                <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
