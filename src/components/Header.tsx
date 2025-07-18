import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-sans cursor-pointer">
            Webular
          </h1>
        </Link>
      </div>
    </header>
  );
}
