import { NavBar } from "../components/Navbar"
import { CreateForm } from "../components/createform"
import { Container, IconButton, Link, Paper, Box } from "@mui/material"

export default function CreatePage() {
  return (
    <Container 
      maxWidth="sm"
      sx={{ 
          flexGrow: 1,   
          justifyContent: "center",
          alignItems: "center", 
          padding: "40px"
      }}>
      <NavBar />
      <Box 
          sx={{ 
          flexGrow: 1,   
          justifyContent: "center",
          alignItems: "center", 
          mb:10,
          }}>
          <Paper elevation={3} sx={{ overflow:'hidden'}}>
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Story</h1>
          <CreateForm />
        
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; 2023 Linguini. All rights reserved.</p>
                </div>
            </footer>
      </Paper></Box>
    </Container>
  )
}