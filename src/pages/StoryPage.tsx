"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Container, IconButton, Link, Box } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useLocation } from 'react-router-dom';
import ChapterNode from "../interfaces/Chapter";
import ChapterCard from "../components/ChapterCard";


import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";

const delay = async (ms: number) =>{
  await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

export default function StoryPage() {

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
  const [chapters, setChapters] = useState<ChapterNode[]>([buildLoadingChapter("0")]);

  useEffect(() => {
    (async () => setChapterMap(await fetchPosts()))();
  }, []);

  useEffect(() => {
    if(chapterMap.size==0){
      return;
    }
    (async () => await addChapter("0"))();
  }, [chapterMap]);


  const fetchPosts = async ()=>{
    await delay(2000);
    const response = await fetch("stories/homes/story.json")
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const dataList: ChapterNode[] = await response.json()
    const nodeMap = new Map();
    for (const node of dataList) {
      node.imageUrl = `/stories/homes/${node.key}.jpg`; //await fetchImage(`/stories/homes/${node.key}.jpg`);
      nodeMap.set(node.key, node);
    }
    return nodeMap;
  }

  const fetchImage = async (imageUrl:string) => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    return URL.createObjectURL(imageBlob);
  };

  const addLoadingchapter = (key:string)=>{
    const parentCards = chapters.filter((card)=> card.key.length<key.length);
    parentCards.push(buildLoadingChapter(key));
    setChapters(parentCards);
  }

  const addChapter = async (key:string) => {
    addLoadingchapter(key);
    await delay(2000);
    const fetchedChapterNode = chapterMap.get(key)!
    const parentCards = chapters.filter((card)=> !card.key.startsWith("loading-") && card.key.length<key.length).map(card=>{
      card.isTyping=false;
      return card;
    });
    fetchedChapterNode.isTyping=true;
    fetchedChapterNode.imageUrl = await fetchImage(fetchedChapterNode.imageUrl);
    parentCards.push(fetchedChapterNode);
    setChapters(parentCards);
    // await handleSaveDataClick();
  };

  // const hiddenDataContentRef = useRef<null | HTMLElement>(null);
  // const handleSaveDataClick = async () => {
  //   const canvas = await html2canvas(hiddenDataContentRef.current!, {
  //     onclone: (clonedDoc) => {
  //       clonedDoc.getElementById("hidden-container")!.style.display = "block";
  //     }
  //   });
  //   const tempImage = canvas.toDataURL("image/jpeg");
  //   console.log(tempImage);
  //   // saveAs(tempImage, "data.jpg");
  // };

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
      <Box
          // id="hidden-container"
          // className="data-container-hidden"
          // ref={hiddenDataContentRef}
        >
      {chapters.map((card, index) => 
        <ChapterCard 
          key={card.key}
          isLoading={card.isLoading}
          isTyping={card.isTyping}
          chapterNode={card}
          onNextChapterSelect={(key)=>addChapter(key)} />
      )}
      </Box>
    </Container>
  )
}

