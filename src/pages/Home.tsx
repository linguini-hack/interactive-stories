"use client"

import React from "react"
import { Container, Typography, Box, Paper } from "@mui/material"
import { StoryCarousel } from "../components/StoryCarousel"
import { NavBar } from "../components/Navbar"
import { Button } from "@mui/material"


function HeroSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #5b21b6, #4338ca, #1d4ed8)",
        color: "white",
        py: 8,
        px: { xs: 2, sm: 6, lg: 8 },
        textAlign: "center",
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: "bold",
            mb: 2,
            color: "#DDD6FE",
          }}>
          Step into story-driven multi-lingual journeys
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            mb: 0,
            color: "#E0E7FF",
          }}>
          Immerse yourself in interactive non-native language stories.<br/>Create
          your own plot.
        </Typography>
      </Box>
    </Box>
  );
}

function CallToAction() {
  return (
    <Box
      sx={{
        backgroundColor: "grey.900",
        py: 8,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: { xs: 2, sm: 6, lg: 8 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            fontWeight: "bold",
            mb: 4,
            color: 'oklch(0.827 0.119 306.383)',
            // color: "primary.light", // Equivalent to purple-300
          }}
        >
          Step into story-driven multi-lingual journeys
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, 
              color:"black",
              backgroundColor:'oklch(0.827 0.119 306.383)' }}
            href="#/create">
            Create Story
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "grey.900",
        color: "gray.300",
        py: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "7xl",
          mx: "auto",
          px: { xs: 2, sm: 6, lg: 8 },
        }}
      >
        <Typography>&copy; 2025 Linguini. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <Box
      sx={{
        py: 10,
        backgroundColor: "gray.900",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.25rem" },
          fontWeight: "bold",
          mb: 4,
          color: 'oklch(0.827 0.119 306.383)', // Equivalent to purple-300
        }}
      >
        Explore Popular Stories
      </Typography>
      <StoryCarousel />
    </Box>
        <CallToAction />
      </main>
      <Footer/>
    </div>
  )


 
}

