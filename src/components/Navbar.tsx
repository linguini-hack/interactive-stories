import React from "react";
import { Button, Container, IconButton, Link, Box } from "@mui/material";
import { BookOpen, PenTool } from "lucide-react";

export function NavBar() {
  return (
    <Box
      sx={{
        backgroundColor: "gray.800",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <Link href="/" sx={{ fontWeight: "bold", fontSize: "2xl", color: "purple.400" }}>
              Linguini
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
           
            <Button
              variant="text"
              sx={{
                color: "gray.300",
                "&:hover": {
                  color: "white",
                  backgroundColor: "gray.700",
                },
              }}
              startIcon={<PenTool />}
              component={Link}
              href="/#/create"
            >
              Create
            </Button>
          </Box>
          <Box sx={{ flexShrink: 0, width: "6rem" }} />
        </Box>
      </Container>
    </Box>
  );
}
