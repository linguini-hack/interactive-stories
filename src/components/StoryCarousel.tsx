"use client"

import { useState } from "react"
import { Card, Button, Container, IconButton, Link, CardContent } from "@mui/material"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"
import Grid from '@mui/material/Grid2';

const stories = [
  { id: 1, title: "The Lost Case", language: "English", image: "/stories/1/0.jpg" },
  { id: 2, title: "Superman in chennai", language: "Tamil", image: "/stories/2/0.jpg" },
  { id: 3, title: "The Magic Wand", language: "Japanese", image: "/stories/3/0.jpg" },
]

export function StoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex overflow-hidden">
        {stories.slice(currentIndex, currentIndex + 3).map((story) => (
          <Card key={story.id} className="w-1/3 mx-2 flex-shrink-0 bg-gray-800 text-gray-100">
            <CardContent className="p-4">
              <img
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                width={150}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-lg text-purple-300">{story.title}</h3>
              <p className="text-sm text-gray-400">{story.language}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <Button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-gray-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
    
      </Button>
      <Button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-gray-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button> */}
    </div>
  )
}