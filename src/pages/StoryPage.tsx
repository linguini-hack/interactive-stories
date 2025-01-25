"use client"

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import ChapterNode from "../interfaces/Chapter";
import ChapterCard from "../components/ChapterCard";

const delay = async (ms: number) => {
  await new Promise<void>(resolve => setTimeout(resolve, ms)).then(() => console.log("fired"));
};

export default function StoryPage() {
  const location = useLocation(); // Use the hook at the top level
  const paths = location.pathname.split('/');
  const storyIdFromPath = paths.pop(); // Extract storyId from the path

  const buildLoadingChapter = (key: string) => ({
    key: "loading-" + key,
    story: "",
    choices: [],
    ending: "",
    imageUrl: "",
    isLoading: true,
    isTyping: false,
  });

  const [chapterMap, setChapterMap] = useState<Map<String, ChapterNode>>(new Map());
  const [chapters, setChapters] = useState<ChapterNode[]>([buildLoadingChapter("0")]);
  const [storyId, setStoryId] = useState<string | null>(storyIdFromPath!); // Initialize with derived value

  useEffect(() => {
    if (storyIdFromPath !== storyId) {
      setStoryId(storyIdFromPath!); // Sync `storyId` state with URL if it changes
    }
  }, [storyIdFromPath]);

  useEffect(() => {
    if (!storyId) return;

    (async () => {
      setChapterMap(await fetchPosts(storyId));
    })();
  }, [storyId]);

  useEffect(() => {
    if (chapterMap.size === 0) {
      return;
    }
    (async () => await addChapter("0"))();
  }, [chapterMap]);

  const fetchPosts = async (storyId: string) => {
    const response = await fetch(`stories/${storyId}/story.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const dataList: ChapterNode[] = (await response.json());
    const nodeMap = new Map();
    for (const node of dataList) {
      node.imageUrl = `/stories/${storyId}/${node.key}.jpg`;
      nodeMap.set(node.key, node);
    }
    return nodeMap;
  };

  const addLoadingchapter = (key: string) => {
    const parentCards = chapters.filter((card) => card.key.length < key.length);
    parentCards.push(buildLoadingChapter(key));
    setChapters(parentCards);
  };

  const addChapter = async (key: string) => {
    if (key === "replay") {
      await addChapter("0");
      return;
    }
    if (!chapterMap.has(key)) {
      return;
    }
    addLoadingchapter(key);
    const fetchedChapterNode = chapterMap.get(key)!;
    const parentCards = chapters.filter((card) => !card.key.startsWith("loading-") && card.key.length < key.length).map(card => {
      card.isTyping = false;
      return card;
    });
    fetchedChapterNode.isTyping = true;
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
      {chapters.map((card) =>
        <ChapterCard
          key={card.key}
          isLoading={card.isLoading}
          isTyping={card.isTyping}
          chapterNode={card}
          onNextChapterSelect={(key) => addChapter(key)} />
      )}
    </Container>
  );
}
