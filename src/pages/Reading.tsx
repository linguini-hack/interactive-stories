import React, { useState, useRef, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ProTip from '../ProTip';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


interface StoryNode {
  key: string
  story: string
  choices: string[]
  ending: string
}


interface PostsPageState {
  posts: Map<string, StoryNode>
  isLoading: boolean
  error: string | null
}

function Reading() {
  const [posts, setPosts] = useState<Map<String,StoryNode>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const [cards, setCards] = useState<StoryNode[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("stories/homes.json")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const dataList: StoryNode[] = await response.json()
        const nodeMap = new Map();
        dataList.forEach((node)=>{
          nodeMap.set(node.key, node);
        })
        setPosts(nodeMap);
        setCards([nodeMap.get("0")]);
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
  }, [cards]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addCard = (key:string) => {
    setCards([...cards, posts.get(key)!]);
  };

  const StoryCard = ( {storyNode}:{storyNode:StoryNode} ) =>{
    return (
      <Box sx={{ 
        flexGrow: 1,   
        justifyContent: "center",
        alignItems: "center", 
    }}>
      <div ref={messagesEndRef} />
      <Card sx={{ 
        maxWidth: 512, 
        margin: "10px" 
      }}>
          <img 
            src={"https://placehold.co/512x512"} 
            width="100%"
          />
          <CardContent>
            {/* <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography> */}
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {storyNode.story}
            </Typography>
            <br/>
            { storyNode.ending && (
              <Typography gutterBottom variant="h5" component="div">
                {storyNode.ending}
              </Typography>) 
            }
            { storyNode.choices && (
              <Typography variant="subtitle1" align="center" sx={{ color: 'text.primary', padding: "10px" }}>
                What should happen next?
              </Typography>
            )}

            <Box sx={{ 
                flexGrow: 1,   
                justifyContent: "center",
                alignItems: "center", 
                padding: "10px",
            }}>
              <Grid
              spacing={1}
              container
              direction="column"
              sx={{
                  justifyContent: "center",
                  alignItems: "center",
              }}> 
              { storyNode.choices && storyNode.choices.map(
                  (choice, index) => <Chip 
                  label={choice} 
                  variant="outlined" 
                  sx={{ color: 'text.primary' }}
                  onClick={()=>addCard(storyNode.key+"."+index)}
                />
              )}
              </Grid>
            </Box>
          </CardContent>
      </Card>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm"
      sx={{ 
          flexGrow: 1,   
          justifyContent: "center",
          alignItems: "center", 
          padding: "40px"
      }}
    >
      <Box sx={{ 
            flexGrow: 1,   
            justifyContent: "center",
            alignItems: "center", 
        }}>
        <Grid
            spacing={2}
            container
            direction="column"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
        {cards.map(
          (card, index) => <StoryCard key={index}
            storyNode={card} />
        )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Reading;