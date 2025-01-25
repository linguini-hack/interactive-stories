"use client"

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Link } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useLocation } from 'react-router-dom';
import ChapterNode from "../interfaces/Chapter";
import ChapterCard from "../components/ChapterCard";
import ChatGpt from "../components/ChatGpt";

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
    // await delay(500);
    const chatGpt = new ChatGpt();
    const userStory = await chatGpt.generateStory("SiderMan in india");
    const storyGraph = JSON.parse(userStory.choices[0].message.content);

    const userGeneratedList: ChapterNode[] = storyGraph["graph"];
    console.log("userGeneratedList", userGeneratedList, "storyGraph", JSON.stringify(userGeneratedList));

    const response = await fetch("stories/superman/story.json")
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const dataList: ChapterNode[] = (await response.json())["graph"]
    const nodeMap = new Map();
    for (const node of userGeneratedList) {
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
      {chapters.map((card, index) => 
        <ChapterCard 
          key={card.key}
          isLoading={card.isLoading}
          isTyping={card.isTyping}
          chapterNode={card}
          onNextChapterSelect={(key)=>addChapter(key)} />
      )}
    </Container>
  )
}

