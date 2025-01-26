import React from "react";
import { Box, Typography } from "@mui/material";

export function HeroSection() {
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
          }}
        >
          Learn Languages Through Interactive Stories
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            mb: 0,
            color: "#E0E7FF",
          }}
        >
          Immerse yourself in interactive non-native language stories. Create
          your own plot.
        </Typography>
      </Box>
    </Box>
  );
}
