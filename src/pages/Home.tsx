"use client"

import React from "react"
import { Container, Typography, Box } from "@mui/material"
import StoryCarousel from "../components/StoryCarousel"
import SecondaryStories from "../components/SecondaryStories"

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 2 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Featured Stories
      </Typography>
      <StoryCarousel />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          More Stories
        </Typography>
        <SecondaryStories />
      </Box>
    </Container>
  )
}

