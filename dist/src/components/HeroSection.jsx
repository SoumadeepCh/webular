import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function HeroSection() {
    return (<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-sans">
              Master Web Development with Interactive Challenges
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Practice HTML, CSS, JavaScript, SQL, and MongoDB with hands-on coding problems and instant feedback.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/css">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Start Practicing CSS</Button>
            </Link>
            <Link href="#topics">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">Explore Topics</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>);
}
