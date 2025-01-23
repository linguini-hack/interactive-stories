import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from '../ProTip';
import StoryCard from './StoryCard';
import Grid from '@mui/material/Grid2';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function Landing() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
            <Grid size={6}>
              <StoryCard />
            </Grid>
            <Grid size={6}>
              <StoryCard />
            </Grid>
            <Grid size={6}>
              <StoryCard />
            </Grid>
            <Grid size={6}>
              <StoryCard />
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}