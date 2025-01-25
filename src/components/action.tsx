// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { BookOpen, PenTool } from "lucide-react"
import { Container, Button, IconButton, Link } from "@mui/material"

export function CallToAction() {
  return (
    <div className="bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-purple-300">Start Your Language Learning Journey Today</h2>
        <div className="flex justify-center space-x-4">
          <Button className="bg-purple-700 hover:bg-purple-800 text-white" >
            <Link href="/">
              
               Read Now
            </Link>
          </Button>
          <Button
            className="border-indigo-600 text-indigo-300 hover:bg-indigo-700 hover:text-white"
          >
            <Link href="/create">
              Create Story
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}