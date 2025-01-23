import React, { useState, useRef, useEffect } from 'react';
import { Typography, Box, Paper } from "@mui/material"
import { Chip } from "@mui/material"
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Typewriter from "./Typewriter";
import Chapter from "../interfaces/Chapter";

interface ChapterCardState {
  chapterNode:Chapter
  isLoading:boolean
  isTyping:boolean
  onNextChapterSelect:(key:string) => void;
}

const ChapterCard = ({
  chapterNode, 
  isLoading, 
  isTyping, 
  onNextChapterSelect
}:ChapterCardState) => {

  const [typingDone, setTypingDone] = useState<boolean>(isTyping?false:true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
    
  useEffect(() => {
    scrollToBottom()
  }, [typingDone]);

  const renderLoadingChapter = (
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
      </Box>
  );
  
  if(isLoading){
      return renderLoadingChapter;
  }

  const choices = (chapterNode.choices && chapterNode.choices.length>0)?
    chapterNode.choices.map((choice, index) => 
      <Chip
        key={"choice-"+index}
        label={choice} 
        variant="outlined" 
        sx={{ color: 'text.primary' }}
        onClick={()=>onNextChapterSelect(chapterNode.key+"."+index)}/>):
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
          src={chapterNode.imageUrl}
          alt={chapterNode.key}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {typingDone && (<span>{chapterNode.story}</span>)}
            {!typingDone && (
              <Typewriter 
                text={chapterNode.story}
                onDone={()=> setTypingDone(true)}/>
            )}
          </Typography>
          {choices && (
            <Typography 
              variant="subtitle1" 
              align="center" 
              sx={{ 
                color: 'text.primary', 
                padding: "10px",
                opacity: !typingDone ? "0" : "1",
                transition: "all 2s",
                visibility: !typingDone ? "hidden" : "visible",
              }}>
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
              opacity: !typingDone ? "0" : "1",
              transition: "all 5s",
              visibility: !typingDone ? "hidden" : "visible",
            }}> 
            {choices}
          </Grid>
        </Box>
      </Paper>
      <div ref={messagesEndRef} ></div>
    </Box>
  );
};

export default ChapterCard;