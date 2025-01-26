"use client"

import { useState } from "react"
import { Card, Button, Container, IconButton, Link, CardContent } from "@mui/material"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";


const stories = [
  { id: "1", title: "The Lost Case", language: "English", image: "/stories/1/0.jpg" },
  { id: "2", title: "Superman in chennai", language: "Tamil", image: "/stories/2/0.jpg" },
  { id: "3", title: "The Magic Wand", language: "Japanese", image: "/stories/3/0.jpg" },
]

function ActionAreaCard({id, title, language, onClick}:{
  id:string, title:string, language:string, onClick:Function}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => onClick(id)}
      >
        <CardMedia
          component="img"
          height="140"
          image={`/stories/${id}/0.jpg`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color:'oklch(0.827 0.119 306.383)'
          }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {language}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function StoryCarousel() {
  const history = useNavigate()
  return (
    <Grid
            spacing={4}
            container
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}> 
{stories.map((story) => (
  <Grid size={3}>
          <ActionAreaCard
            key={story.id}
            id={story.id}
            title={story.title}
            language={story.language}
            onClick={(id:string)=>{history(`/story/${id}`)}}
          />
          </Grid>
        ))}
            </Grid>
    
      
  )
}