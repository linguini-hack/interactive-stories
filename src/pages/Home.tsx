"use client"

import React from "react"
import { Container, Typography, Box, Paper } from "@mui/material"
import SecondaryStories from "../components/SecondaryStories"
import {StoryCarousel} from "../components/StoryCarousel"
import { HeroSection } from "../components/HeroSection"
import { NavBar } from "../components/Navbar"
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import {  Button, IconButton, Link } from "@mui/material"




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
            color: "primary.light", // Equivalent to purple-300
          }}
        >
          Start Your Language Learning Journey Today
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
            sx={{ mt: 2 }}
            href="#/create"
          >
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
        <Typography>&copy; 2023 Linguini. All rights reserved.</Typography>
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
        py: 20,
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

