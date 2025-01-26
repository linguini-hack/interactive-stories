"use client"

import { Card, CardContent } from "@mui/material"
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";


const stories = [
  { id: "1", title: "The Lost Case", language: "English", image: "/stories/1/0.jpg" },
  { id: "2", title: "Spiderman in chennai", language: "Tamil", image: "/stories/2/0.jpg" },
  { id: "3", title: "The Magic Wand", language: "Japanese", image: "/stories/3/0.jpg" },
]

function ActionAreaCard({id, title, language, onClick}:{
  id:string, title:string, language:string, onClick:Function}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => onClick(id)}>
        <CardMedia
          component="img"
          height="auto"
          image={`stories/${id}/0.jpg`}
          alt="green iguana"
          sx={{
            objectFit: "cover",
            aspectRatio:1,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" 
            sx={{color:'oklch(0.827 0.119 306.383)'
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
              display:"flex"
            }}> 
{stories.map((story) => (
  <Grid size={{ xs: 6, md: 3 }} sx={{
    justifyContent: "center",
    alignItems: "center",
    display:"flex",
    m:2
  }}>
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
