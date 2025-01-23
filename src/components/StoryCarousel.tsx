import React from "react"
import { Box, useMediaQuery, useTheme, Paper } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import StoryCard from "./StoryCard"

// Mock data for main stories

const imageUrl = "https://placehold.co/1200x600";
const mainStories = [
  { id: "1", title: "A Journey Through Time", image: imageUrl },
  { id: "2", title: "The Hidden City", image: imageUrl },
  { id: "3", title: "Echoes of the Past", image: imageUrl },
  { id: "4", title: "Whispers in the Wind", image: imageUrl },
  { id: "5", title: "The Last Frontier", image: imageUrl },
]

export default function StoryCarousel() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Paper elevation={3}>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 0,
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "20px",
            marginBottom: "20px",
          },
        }}
      >
        {mainStories.map((story) => (
          <Box key={story.id} sx={{ display: "flex", justifyContent: "center" }}>
            <StoryCard
              id={story.id}
              title={story.title}
              image={story.image}
              maxWidth={isSmallScreen ? "100%" : "1200px"}
            />
          </Box>
        ))}
      </Carousel>
    </Paper>
  )
}

