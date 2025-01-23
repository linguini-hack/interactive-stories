"use client"

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Link } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useLocation } from 'react-router-dom';
import StoryNode from "../interfaces/Chapter";
import ChapterCard from "../components/ChapterCard";

export default function StoryPage() {

  const buildLoadingChapter = (key:string) =>{
    return {
      key:key,
      story:"", 
      choices:[], 
      ending:"", 
      imageUrl:"", 
      isLoading:true
    }
  };

  const [chapterMap, setChapterMap] = useState<Map<String,StoryNode>>(new Map());
  const [chapters, setChapters] = useState<StoryNode[]>([]);

  const delay = async (ms: number) =>{
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  useEffect(() => {
    const fetchPosts = async () => {
      await delay(2000);
      const response = await fetch("stories/homes/story.json")
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      const dataList: StoryNode[] = await response.json()
      const nodeMap = new Map();
      for (const node of dataList) {
        node.imageUrl = `/stories/homes/${node.key}.jpg`; //await fetchImage(`/stories/homes/${node.key}.jpg`);
        nodeMap.set(node.key, node);
      }

      setChapterMap(nodeMap);
      setChapters([buildLoadingChapter("0")]);
      await delay(2000);
      setChapters([nodeMap.get("0")]);
    }

    fetchPosts()
  }, []);

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
    const fetchedStoryNode = chapterMap.get(key)!
    const parentCards = chapters.filter((card)=> card.key.length<key.length);
    parentCards.push(fetchedStoryNode);
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
      {chapters.map((card, index) => 
        <ChapterCard 
          key={index+""}
          isLoading={card.isLoading}
          isTyping={true}
          chapterNode={card}
          onNextChapterSelect={(key)=>addChapter(key)} />
      )}
    </Container>
  )
}

