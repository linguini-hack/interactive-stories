import React, { useState, useRef, useEffect } from 'react';
import { Typography, Box, Button, Paper, Modal } from "@mui/material"
import { Chip } from "@mui/material"
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Typewriter from "./Typewriter";
import Chapter from "../interfaces/Chapter";
import { Tooltip } from 'react-tooltip'
import StoryMeaning from './StoryMeaning';
import TextToSpeech from './TextToSpeech';

interface ChapterCardState {
  chapterNode:Chapter
  isLoading:boolean
  isTyping:boolean
  language:string
  onNextChapterSelect:(key:string) => void;
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  objectFit: "cover",
  aspectRatio:1,
  flexGrow: 1,   
  justifyContent: "center",
  alignItems: "center", 
};

const getNextText = (language:string)=>{
  if(language==="english"){
    return "What should happen next?";
  } else    if(language==="tamil"){
    return "அடுத்ததாக என்ன நடக்க வேண்டும்?";
  } else    if(language==="hindi"){
    return "आगे क्या होना चाहिए?";
  } else    if(language==="japanese"){
    return "次に何が起こるべきですか？";
  }else    if(language==="french"){
    return "Que devrait-il se passer ensuite?";
  }
  return "What should happen next?";
}

const ChapterCard = ({
  chapterNode, 
  isLoading, 
  isTyping, 
  language,
  onNextChapterSelect
}:ChapterCardState) => {

  const nextText = getNextText(language)
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textToSpeech = new TextToSpeech();

  const [typingDone, setTypingDone] = useState<boolean>(isTyping?false:true);
  const [play, setPlay] = useState<boolean>(false);
  const [storyAudio, setStoryAudio] = useState<HTMLAudioElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const togglePlay = () => {
    if (!storyAudio) return; // Ensure audio is not null
    setPlay((prev) => {
      if (!prev) {
        storyAudio.play();
      } else {
        storyAudio.pause();
      }
      return !prev;
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setTypingDone(isTyping?false:true);
    textToSpeech.fetchAudio(chapterNode.story + " What should happen next?").then((audioBase64)=>{
      console.log("fetchAudio", audioBase64);
      const newAudio = new Audio("data:audio/mp3;base64," + audioBase64);
      setStoryAudio(newAudio); // Set the audio in state
    });
  }, []);
    
  useEffect(() => {
    scrollToBottom()
  }, [typingDone, isTyping]);

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

  console.log(chapterNode.key, "isTyping", isTyping);
  console.log(chapterNode.key, "typingDone", typingDone);

  const endModal = ()=>{
    return (<Box>
    <Chip
        key={"choice-end-story"}
        label={'End Story'} 
        variant="outlined" 
        sx={{ color: 'text.primary' }}
        onClick={()=>handleOpen()}/>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
          Fin.
        </Typography>
        <Typography id="modal-modal-description"   
              variant="h4" 
              component="h4"
              align="center"  sx={{ mt: 2 }}>
          You learnt <b>126</b> words today.
        </Typography>
        <Box sx={{
          alignItems: "center",
          display: 'flex',
          justifyContent: 'center',
          mt:5,
          mb:10
        }}>
          <Button variant="contained"
          onClick={()=>{
            handleClose();
            onNextChapterSelect('replay');
          }}
          >Replay</Button>
        </Box>
      </Box>
    </Modal></Box>);
  }
  
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

  const ending = choices==null? endModal():null;
    
  return (
    <Box 
      sx={{ 
      flexGrow: 1,   
      justifyContent: "center",
      alignItems: "center", 
      mb:10,
    }}>
      <Paper elevation={3} sx={{borderRadius:'12px', overflow:'hidden'}}>
        {chapterNode.imageUrl && (<Box
          component="img"
          sx={{
            width: "100%",
            objectFit: "cover",
            aspectRatio:1.5,
          }}
          src={chapterNode.imageUrl}
          alt={chapterNode.key}
        />)}
        {storyAudio && <button onClick={togglePlay}>{play ? 'Pause' : 'Play'}</button>}
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {typingDone && (<StoryMeaning text={chapterNode.story} />)}
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
                transition: "all 5s",
                visibility: !typingDone ? "hidden" : "visible",
              }}>
              {nextText}
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
            {ending}
            {choices}
          </Grid>
        </Box>
      </Paper>
      <div ref={messagesEndRef} ></div>
    </Box>
  );
};

export default ChapterCard;