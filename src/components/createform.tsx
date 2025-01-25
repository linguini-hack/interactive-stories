"use client"

import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Container, Button, IconButton, Input, Link } from "@mui/material"

export function CreateForm() {
  const [storyType, setStoryType] = useState("")
  const [storyContent, setStoryContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Story Type:", storyType)
    console.log("Story Content:", storyContent)
    // Reset form fields
    setStoryType("")
    setStoryContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="storyType" className="block text-sm font-medium text-gray-300 mb-1">
          What kind of story would you like to create?
        </label>
        <Input
          id="storyType"
          value={storyType}
          onChange={(e) => setStoryType(e.target.value)}
          placeholder="e.g., Adventure, Romance, Mystery"
          required
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-purple-500"
        />
      </div>
      <div>
        <label htmlFor="storyContent" className="block text-sm font-medium text-gray-300 mb-1">
          Enter your prompt in 20 words
        </label>
        {/* <Textarea
          id="storyContent"
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
          placeholder="Once upon a time..."
          rows={6}
          required
          className="bg-gray-700 text-gray-100 border-gray-600 focus:border-purple-500"
        /> */}
      </div>
      <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white">
        Submit Story
      </Button>
    </form>
  )
}