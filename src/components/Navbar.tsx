// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { BookOpen, PenTool } from "lucide-react"
import { Container, IconButton, Link } from "@mui/material"

export function NavBar() {
  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-2xl text-purple-400">
              Linguini
            </Link>
          </div>
          {/* <div className="flex-grow flex justify-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
              <Link href="/">
                <BookOpen className="mr-2 h-4 w-4" /> Read
              </Link>
            </Button>
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
              <Link href="/create">
                <PenTool className="mr-2 h-4 w-4" /> Create
              </Link>
            </Button>
          </div> */}
          <div className="flex-shrink-0 w-24">{/* This empty div balances the layout */}</div>
        </div>
      </div>
    </nav>
  )
}