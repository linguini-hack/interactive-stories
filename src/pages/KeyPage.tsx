"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Link,
  Typography,
  Box,
  Button,
  TextField,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, Done as DoneIcon } from "@mui/icons-material";
import { styled, css } from "@mui/system";
import clsx from "clsx";
import ChapterNode from "../interfaces/Chapter";
import ChapterCard from "../components/ChapterCard";
import ChatGpt from "../components/ChatGpt";

 interface Key {
    gptKey: string
    elevenLabKey: string
}

// Main component
export default function CreatePage() {
  const [gptKey, setGptKey] = useState<string|null>(null);
  const [elevenLabKey, setElevenLabKey] = useState<string|null>(null);

  useEffect(() => {
    setGptKey(localStorage.getItem('gptKey'));
    setElevenLabKey(localStorage.getItem('11LabKey'));
  }, []);

  useEffect(() => {
    if(gptKey!=null){
        localStorage.setItem('gptKey', gptKey);
    }
    if(elevenLabKey!=null){
        localStorage.setItem('11LabKey', elevenLabKey);
    }
  }, [gptKey, elevenLabKey]);

  
  const handleSubmit = () => {
    console.log("gptKey:", gptKey);
    console.log("11LabKey:", elevenLabKey);
  };

  const CreateForm = () => (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt:5,
        "& > *": {
          m: 2,
        },
      }}
    >
      <Typography variant="h5" align="center">
        Setup keys
      </Typography>
      <TextField
        placeholder="Chat Gpt Key"
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ mt: 4, mb: 1, width:"80%" }}
        value={gptKey}
        onChange={(e) =>  setGptKey(e.target.value)}
      />
          <TextField
        placeholder="11 Labs Key"
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ mt: 4, mb: 1, width:"80%" }}
        value={elevenLabKey}
        onChange={(e) => setElevenLabKey(e.target.value)}
      />
      
    <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={handleSubmit}>
        Save Keys
    </Button>
      
    </Box>
  );


  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 4,
      }}
    >
      <Link href="#/home" underline="none">
        <IconButton>
          <ArrowBack />
        </IconButton>
      </Link>
      {CreateForm()}
    </Container>
  );
}
