import React from "react"
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material"
import Link from '@mui/material/Link';

interface StoryCardProps {
  id: string
  title: string
  image: string
  maxWidth: string
}

export default function StoryCard({ id, title, image, maxWidth }: StoryCardProps) {
  return (
    <Card
      sx={{
        maxWidth,
        width: "100%",
        position: "relative",
        "&:hover": {
          boxShadow: 6,
        },
        transition: "box-shadow 0.3s ease-in-out",
      }}
      component={Link}
      href={`#/story/${id}`}
    >
      <CardMedia component="img" height="600" image={image} alt={title} />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: 2,
        }}
      >
        <Typography variant="h4" component="div">
          {title}
        </Typography>
      </Box>
    </Card>
  )
}

