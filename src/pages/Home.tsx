"use client"

import React from "react"
import { Container, Typography, Box } from "@mui/material"
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




export default function Home() {

//   const Backdrop = React.forwardRef<
//   HTMLDivElement,
//   { open?: boolean; className: string }>((props, ref) => {
//   const { open, className, ...other } = props;
//   return (
//     <div
//       className={clsx({ 'base-Backdrop-open': open }, className)}
//       ref={ref}
//       {...other}
//     />
//   );
// });

//   const blue = {
//     200: '#99CCFF',
//     300: '#66B2FF',
//     400: '#3399FF',
//     500: '#007FFF',
//     600: '#0072E5',
//     700: '#0066CC',
//   };

//   const grey = {
//     50: '#F3F6F9',
//     100: '#E5EAF2',
//     200: '#DAE2ED',
//     300: '#C7D0DD',
//     400: '#B0B8C4',
//     500: '#9DA8B7',
//     600: '#6B7A90',
//     700: '#434D5B',
//     800: '#303740',
//     900: '#1C2025',
//   };

//   const Modal = styled(BaseModal)`
//   position: fixed;
//   z-index: 1300;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledBackdrop = styled(Backdrop)`
//   z-index: -1;
//   position: fixed;
//   inset: 0;
//   background-color: rgb(0 0 0 / 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;


// const ModalContent = styled('div')(
//   ({ theme }) => css`
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 500;
//     text-align: start;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     overflow: hidden;
//     background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border-radius: 8px;
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     box-shadow: 0 4px 12px
//       ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
//     padding: 24px;
//     color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

//     & .modal-title {
//       margin: 0;
//       line-height: 1.5rem;
//       margin-bottom: 8px;
//     }

//     & .modal-description {
//       margin: 0;
//       line-height: 1.5rem;
//       font-weight: 400;
//       color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
//       margin-bottom: 4px;
//     }
//   `,
// );



// const TriggerButton = styled('button')(
//   ({ theme }) => css`
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     padding: 8px 16px;
//     border-radius: 8px;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//     &:hover {
//       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }

//     &:active {
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//     }

//     &:focus-visible {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }
//   `,
// );

// const StyledInput = styled(Input)(
//   ({ theme }) => `

//   .${inputClasses.input} {
//     width: 320px;
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     font-weight: 400;
//     line-height: 1.5;
//     padding: 8px 12px;
//     border-radius: 8px;
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

//     &:hover {
//       border-color: ${blue[400]};
//     }

//     &:focus {
//       outline: 0;
//       border-color: ${blue[400]};
//       box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
//     }
//   }
// `,
// );

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // function BasicFormControl() {
  //   return (
  //     <CreateForm/>
  //   );
  // }

  function CallToAction() {
    return (
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Start Your Language Learning Journey Today</h2>
          <div className="flex justify-center space-x-4">
          <Button variant="contained" size="large" sx={{ mt: 4 }} href="#/create">
            Create Story
          </Button>
          </div>
        </div>
      </div>
    )
  }

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

