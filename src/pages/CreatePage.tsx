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

// Styled components
const Modal = styled("div")`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled("div")`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const GradientCircularProgress = () => (
  <>
    <svg width={0} height={0}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e01cd5" />
          <stop offset="100%" stopColor="#1CB5E0" />
        </linearGradient>
      </defs>
    </svg>
    <CircularProgress sx={{ "svg circle": { stroke: "url(#gradient)" } }} />
  </>
);

// Main component
export default function CreatePage() {
  const [storyType, setStoryType] = useState("");
  const [creating, setCreating] = useState(0);
  const [language, setLanguage] = useState("english"); // 0 -> English, 1 -> Hindi, 2 -> French, 3 -> Japanese
  const [chapterMap, setChapterMap] = useState<Map<string, ChapterNode>>(new Map());
  const [chapters, setChapters] = useState<ChapterNode[]>([]);

  const delay = async (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const buildLoadingChapter = (key: string): ChapterNode => ({
    key: `loading-${key}`,
    story: "",
    choices: [],
    ending: "",
    imageUrl: "",
    isLoading: true,
    isTyping: false,
  });

  const generateStory = async (prompt: string) => {
    setCreating(1);

    const chatGpt = new ChatGpt();
    const userStory = await chatGpt.generateStory(prompt, language);
    const storyGraph = JSON.parse(userStory.choices[0].message.content);
    const chaptersList: ChapterNode[] = storyGraph.graph;

    const nodeMap = new Map();
    chaptersList.forEach((node) => {
      node.key = node.key.split("").join(".");
      nodeMap.set(node.key, node);
    });

    setChapterMap(nodeMap);
    setCreating(2);
  };

  const addChapter = async (key: string) => {
    if (!chapterMap.has(key) || chapterMap.size === 0) return;

    const loadingChapter = buildLoadingChapter(key);
    setChapters((prev) => [...prev.filter((card) => !card.key.startsWith("loading-")), loadingChapter]);

    await delay(500);

    const fetchedChapter = chapterMap.get(key)!;
    setChapters((prev) =>
      prev
        .filter((card) => !card.key.startsWith("loading-"))
        .map((card) => ({ ...card, isTyping: false }))
        .concat({ ...fetchedChapter, isTyping: true })
    );
  };

  const handleSubmit = () => {
    console.log("Story Type:", storyType);
    generateStory(storyType);
  };

  const CreateForm = () => (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt:5,
        "& > *": {
          m: 1,
        },
      }}
    >
      <Typography variant="h5" align="center">
        What kind of story would you like to create?
      </Typography>
      <TextField
        placeholder="Enter story prompt"
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ mt: 4, mb: 1, width:"80%" }}
        value={storyType}
        onChange={(e) => creating === 0 && setStoryType(e.target.value)}
      />
      <Typography variant="subtitle2" align="center">
        Enter your prompt in 20 words
      </Typography>
      <ButtonGroup variant="outlined" disabled={creating !== 0}>
        {["English", "Hindi", "French", "Japanese"].map((lang, idx) => (
          <Button
            key={lang}
            startIcon={language.toLowerCase() === lang.toLowerCase() ? <DoneIcon /> : null}
            onClick={() => setLanguage(lang.toLowerCase())}
          >
            {lang}
          </Button>
        ))}
      </ButtonGroup>
      {creating === 1 && (
        <>
          <GradientCircularProgress />
          <Typography>Creating interactive story...</Typography>
        </>
      )}
      {creating === 0 && (
        <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={handleSubmit}>
          Submit Story
        </Button>
      )}
    </Box>
  );

  useEffect(() => {
    if (chapterMap.size > 0) addChapter("0");
  }, [chapterMap]);

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
      {creating !== 2 && CreateForm()}
      {chapters.map((card) => (
        <ChapterCard
          key={card.key}
          isLoading={card.isLoading}
          isTyping={card.isTyping}
          chapterNode={card}
          language={language}
          onNextChapterSelect={addChapter}
        />
      ))}
    </Container>
  );
}
