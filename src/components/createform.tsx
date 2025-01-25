"use client"

import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Typography, Container, Button, IconButton, Input, Link, Box } from "@mui/material"

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
    <Box> 
    <form onSubmit={handleSubmit} className="space-y-6">
        <Box
        
        sx={{ 
            flexGrow: 1,   
            justifyContent: "center",
            alignItems: "center", 
            mb:10,
            }}
        >
            <Typography id="modal-modal-title" variant="h5" component="h5" align="center">
              What kind of story would you like to create?
            </Typography>
            <br/>
            <Input
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                id="storyType"
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
                placeholder="e.g., Adventure, Romance, Mystery"
                required
            />
        </Box>
        <div>
        <label htmlFor="storyContent" >
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
    </Box>
  )
}