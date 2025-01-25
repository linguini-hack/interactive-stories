import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from "@mui/material"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const StoryMeaning = ({text, wordMeaning}:{text:string, wordMeaning:Map<string,string>}) => {
  console.log("wordMeaning", wordMeaning);

  const Word=({id, word}:{id:string, word:string})=>{
    if(!wordMeaning.has(word)){
        return (<Box
            sx={{
                display:'inline-block'
            }}>
                <span>{word}&nbsp;</span>
        </Box>);
    }
    return(<Box
        sx={{
            display:'inline-block'
        }}>
        <a
            data-tooltip-id={id}
            data-tooltip-content={wordMeaning.get(word)}
            data-tooltip-place="top">
            {word}&nbsp;
        </a>
        <Tooltip id={id}  
        opacity={1} 
        style={{
            color: "red",
            background: "white",
            
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