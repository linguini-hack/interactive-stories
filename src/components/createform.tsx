"use client"

import { useState } from "react"
import * as React from 'react';
import {
  Select as BaseSelect,
  selectClasses,
  SelectListboxSlotProps,
  SelectProps,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';
import Grid from '@mui/material/Grid2';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Typography, Container, Button, IconButton, Input, Link, Box } from "@mui/material"
import Chapter from "../interfaces/Chapter";
import ChatGpt from "./ChatGpt";
import ChapterNode from "../interfaces/Chapter";
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

interface FormState {
    onCreated:(stories:ChapterNode[]) => void;
  }

export function CreateForm({onCreated}:FormState) {
  const [storyType, setStoryType] = useState("")
  const [creating, setCreating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Story Type:", storyType)
    // Reset form fields
    generateStory(storyType);
  }

  const generateStory = async (prompt:string)=>{
    setCreating(1);
    const chatGpt = new ChatGpt();
    const userStory = await chatGpt.generateStory(prompt);
    const storyGraph = JSON.parse(userStory.choices[0].message.content);
    const userGeneratedList: ChapterNode[] = storyGraph["graph"];
    onCreated(userGeneratedList);
    setStoryType("")
    setCreating(2);
  }




  const BasicForm=()=>{
    return (<form onSubmit={handleSubmit} className="space-y-6">

        <Typography id="modal-modal-title" variant="h5" component="h5" align="center">
          What kind of story would you like to create?
        </Typography>
        <Input
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            id="storyType"
            value={storyType}
            onChange={(e) => setStoryType(e.target.value)}
            placeholder="e.g., Adventure, Romance, Mystery"
            required
        />
        <br/>
        <Grid container spacing={2}>
        <Grid size={{ xs: 4, md: 4 }}>
        <Button type="submit" >
            French
        </Button>
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
        <Button type="submit" >
            Spanish
        </Button>
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
        <Button type="submit" >
            Hindi
        </Button>
        </Grid>
        </Grid>
        <label htmlFor="storyContent" >
            Enter your prompt in 20 words
        </label>
        <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white">
            Submit Story
        </Button>
        </form>);
  }

  return (
    <Box
        sx={{ 
            flexGrow: 1,   
            justifyContent: "center",
            alignItems: "center", 
            mb:10,
            }}>
        {creating!=1 && <BasicForm/>}
        {creating==1 && (<span>Loading..</span>)}
    </Box>
  )
}