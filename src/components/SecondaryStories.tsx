import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, Chip, CardContent, CardMedia, Typography, useTheme } from "@mui/material"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';

// Mock data for secondary stories

const imageUrl = "https://placehold.co/300x200";
const secondaryStories = [
  { id: "6", title: "The Lost Artifact", image: imageUrl },
  { id: "7", title: "Mysteries of the Deep", image: imageUrl },
  { id: "8", title: "The Forgotten Kingdom", image: imageUrl },
  { id: "9", title: "Echoes of Eternity", image: imageUrl },
  { id: "10", title: "The Celestial Prophecy", image: imageUrl },
  { id: "11", title: "Whispers of the Ancients", image: imageUrl },
]




export default function SecondaryStories() {

  const theme = useTheme()



  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.grey[300],
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 3,
        },
      }}
    >
      {secondaryStories.map((story) => (
        <Card
          key={story.id}
          sx={{
            minWidth: 250,
            maxWidth: 250,
            mr: 2,
            mb: 2,
            flexShrink: 0,
            "&:last-child": { mr: 0 },
            "&:hover": {
              boxShadow: 6,
            },
            transition: "box-shadow 0.3s ease-in-out",
          }}
          component={Link}
          href={`#/story/${story.id}`}
        >
          <CardMedia component="img" height="140" image={story.image} alt={story.title} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {story.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

