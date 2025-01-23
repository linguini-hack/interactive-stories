import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Yellow } from "./pages/Yellow";
import { Red } from './pages/Red';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Reading from './pages/Reading';
import StoryPage from './pages/StoryPage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';



const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function ButtonAppBar(element:any) {

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          // container={container}
          variant="temporary"
          open={true}
          onClose={handleDrawerToggle}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile.
          // }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {element}
    </Box>
  );
}

export default function App() {
  return (
    <HashRouter basename={"/"}>
      <Routes>
        <Route  path="/"  element={<Red/>} />

        <Route path="/story/:id" element={<StoryPage/>} /> 
        <Route path="/home" element={<Home/>} /> 
        <Route path="/yellow" element={ButtonAppBar(Yellow())} /> 
        <Route path="/red" element={ButtonAppBar(Red())} /> 
        <Route path="/landing" element={ButtonAppBar(Landing())} /> 
        <Route path="/reading" element={<Reading/>} /> 
      </Routes>
    </HashRouter>
  );
}