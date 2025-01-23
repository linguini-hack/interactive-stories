"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Paper, IconButton, Link } from "@mui/material"
import { Card, Chip, CardContent, CardMedia, useTheme } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface StoryNode {
  key: string
  story: string
  choices: string[]
  ending: string
  imageUrl: string
  isLoading: boolean
}

interface PostsPageState {
  posts: Map<string, StoryNode>
  isLoading: boolean
  error: string | null
}

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

  const [posts, setPosts] = useState<Map<String,StoryNode>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chapters, setChapters] = useState<StoryNode[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const delay = async (ms: number) =>{
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  useEffect(() => {
    const fetchPosts = async () => {
      await delay(2000);
      try {
        const response = await fetch("stories/homes/story.json")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const dataList: StoryNode[] = await response.json()
        const nodeMap = new Map();
        for (const node of dataList) {
          node.imageUrl = `/stories/homes/${node.key}.jpg`; //await fetchImage(`/stories/homes/${node.key}.jpg`);
          console.log(node);
          nodeMap.set(node.key, node);
        }

        console.log(nodeMap);
        setPosts(nodeMap);
        setChapters([buildLoadingChapter("0")]);
        await delay(2000);
        setChapters([nodeMap.get("0")]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [chapters]);

  const scrollToBottom = () => {
    console.log(messagesEndRef.current);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [])

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
    const fetchedStoryNode = posts.get(key)!
    const parentCards = chapters.filter((card)=> card.key.length<key.length);
    parentCards.push(fetchedStoryNode);
    setChapters(parentCards);
  };

  const renderLoadingChapter = (key:string)=>{
    return (
      <Box 
        sx={{ 
        flexGrow: 1,   
        justifyContent: "center",
        alignItems: "center", 
        mb:10,
      }}>
        <Paper elevation={3} sx={{borderRadius:'12px', overflow:'hidden'}}>
          <Skeleton variant="rectangular" 
            width={"100%"} 
            height={300}
          />
          <Box sx={{ p: 3 }}>
            <Skeleton sx={{ mb: 1 }} animation="wave" variant="rectangular" width={"100%"} />
            <Skeleton sx={{ mb: 1 }} animation="wave" variant="rectangular" width={"100%"} />
            <Skeleton sx={{ mb: 1 }} animation="wave" variant="rectangular" width={"100%"} />
          </Box>
        </Paper>
        <div ref={messagesEndRef} ></div>
      </Box>);
  }

  const ChapterCard = ( {storyNode}:{storyNode:StoryNode} ) =>{
    if(storyNode.isLoading){
      return renderLoadingChapter(storyNode.key);
    }
    const choices = (storyNode.choices && storyNode.choices.length>0)?
    storyNode.choices.map((choice, index) => 
      <Chip
        key={"choice-"+index}
        label={choice} 
        variant="outlined" 
        sx={{ color: 'text.primary' }}
        onClick={()=>addChapter(storyNode.key+"."+index)}/>):
      null;

    return (
      <Box 
        sx={{ 
        flexGrow: 1,   
        justifyContent: "center",
        alignItems: "center", 
        mb:10,
      }}>
        <Paper elevation={3} sx={{borderRadius:'12px', overflow:'hidden'}}>
          <Box
            component="img"
            sx={{
              width: "100%",
              objectFit: "cover",
              aspectRatio:1.5,
            }}
            src={storyNode.imageUrl}
            alt={storyNode.key}
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              {storyNode.story}
            </Typography>

            { choices && (
              <Typography variant="subtitle1" align="center" sx={{ color: 'text.primary', padding: "10px" }}>
                What should happen next?
              </Typography>
            )}
            <Grid
              spacing={1}
              container
              direction="column"
              sx={{
                  justifyContent: "center",
                  alignItems: "center",
              }}> 
            {choices}
            </Grid>
          </Box>
        </Paper>
        <div ref={messagesEndRef} ></div>
      </Box>
    );
  }

  // const pathname = useLocation().pathname;
  // const splits = pathname.split('/');
  // const id = splits.pop();

  // if (!story) {
  //   return <Typography>Story not found</Typography>
  // }

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
      {chapters.map(
          (card, index) => 
          <ChapterCard 
            key={index+""}
            storyNode={card} />
        )}
    </Container>
  )
}

