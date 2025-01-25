"use client"

import React from "react"
import { Container, Typography, Box } from "@mui/material"
import SecondaryStories from "../components/SecondaryStories"
import {StoryCarousel} from "../components/StoryCarousel"
import { HeroSection } from "../components/HeroSection"
import { NavBar } from "../components/Navbar"
import { CallToAction } from "../components/action"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <section className="py-16 bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">Explore Popular Stories</h2>
          <StoryCarousel />
        </section>
        <CallToAction />
      </main>
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 Linguini. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

