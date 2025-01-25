"use client"

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Link, Typography, Box, Button } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useLocation } from 'react-router-dom';
import ChapterNode from "../interfaces/Chapter";
import NewChapterCard from "../components/NewChapterCard";
import ChatGpt from "../components/ChatGpt";
import SecondaryStories from "../components/SecondaryStories"
import {StoryCarousel} from "../components/StoryCarousel"
import { HeroSection } from "../components/HeroSection"
import { NavBar } from "../components/Navbar"
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { CreateForm }from '../components/createform';

const delay = async (ms: number) =>{
  await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

export default function CreatePage() {

    const Backdrop = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }>((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  
    const blue = {
      200: '#99CCFF',
      300: '#66B2FF',
      400: '#3399FF',
      500: '#007FFF',
      600: '#0072E5',
      700: '#0066CC',
    };
  
    const grey = {
      50: '#F3F6F9',
      100: '#E5EAF2',
      200: '#DAE2ED',
      300: '#C7D0DD',
      400: '#B0B8C4',
      500: '#9DA8B7',
      600: '#6B7A90',
      700: '#434D5B',
      800: '#303740',
      900: '#1C2025',
    };
  
    const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  
  const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
  );
  
  
  
  const TriggerButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
  );
  
  const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
  );

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    function BasicFormControl() {
      return (
        <CreateForm
            onCreated={(userGeneratedList)=>{
                console.log("prompt", userGeneratedList);
                const nodeMap = new Map();
                for (const node of userGeneratedList) {
                //   node.imageUrl = `/stories/homes/${node.key}.jpg`; //await fetchImage(`/stories/homes/${node.key}.jpg`);
                  nodeMap.set(node.key, node);
                }
                setChapterMap(nodeMap);
                handleClose();
            }}
        />
      );
    }

  const buildLoadingChapter = (key:string) =>{
    return {
      key:"loading-"+key,
      story:"", 
      choices:[], 
      ending:"", 
      imageUrl:"", 
      isLoading:true,
      isTyping:false
    }
  };

  const [chapterMap, setChapterMap] = useState<Map<String,ChapterNode>>(new Map());
  const [chapters, setChapters] = useState<ChapterNode[]>([]);


  useEffect(() => {
    if(chapterMap.size==0){
      return;
    }
    (async () => await addChapter("0"))();
  }, [chapterMap]);


  const addLoadingchapter = (key:string)=>{
    const parentCards = chapters.filter((card)=> card.key.length<key.length);
    parentCards.push(buildLoadingChapter(key));
    setChapters(parentCards);
  }

  const addLastChapter = async (key:string) => {
    addLoadingchapter(key);
    // await delay(500);
    const fetchedChapterNode = chapterMap.get(key)!
    const parentCards = chapters.filter((card)=> !card.key.startsWith("loading-") && card.key.length<key.length).map(card=>{
      card.isTyping=false;
      return card;
    });
    fetchedChapterNode.isTyping=true;
    // fetchedChapterNode.imageUrl = await fetchImage(fetchedChapterNode.imageUrl);
    parentCards.push(fetchedChapterNode);
    setChapters(parentCards);
  };

  const addChapter = async (key:string) => {
    if(key=="replay"){
      await addChapter("0");
      return;
    }
    if(!chapterMap.has(key) || chapterMap.size==0){
      return;
    }
    addLoadingchapter(key);
    // await delay(500);
    const fetchedChapterNode = chapterMap.get(key)!
    const parentCards = chapters.filter((card)=> !card.key.startsWith("loading-") && card.key.length<key.length).map(card=>{
      card.isTyping=false;
      return card;
    });
    fetchedChapterNode.isTyping=true;
    // fetchedChapterNode.imageUrl = await fetchImage(fetchedChapterNode.imageUrl);
    parentCards.push(fetchedChapterNode);
    setChapters(parentCards);
  };

  return (
    <Container 
      maxWidth="sm"
      sx={{ 
          flexGrow: 1,   
          justifyContent: "center",
          alignItems: "center", 
          padding: "40px"
      }}>
      <Link href="#/home" underline="none">
        <IconButton sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
      </Link>
      {chapterMap.size==0 && <BasicFormControl/>}
      {chapters.map((card, index) => 
        <NewChapterCard 
          key={card.key}
          isLoading={card.isLoading}
          isTyping={card.isTyping}
          chapterNode={card}
          onNextChapterSelect={(key)=>addChapter(key)} />
      )}
    </Container>
  )
}

