import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from "@mui/material"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const StoryMeaning = ({text}:{text:string}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);


  
  const Word=({id, word}:{id:string, word:string})=>{
    return(<Box
        sx={{
            display:'inline-block'
        }}
    >
        <a
            data-tooltip-id={id}
            data-tooltip-content={word}
            data-tooltip-place="top">
            {word}&nbsp;
        </a>
        <Tooltip id={id}  style={{
            color: "red",
            background: "white"
        }}/>
    </Box>);
  };

  const words = text.split(' ').map(
    (word,index)=>{
        return (<Word 
            key={"word-"+index}
            id={"word-"+index}
            word={word}
        />)
    }
  )


  return <>{words}</>;
};

export default StoryMeaning;