

"use client";

import { useState } from "react";
import * as React from "react";
import {
  Select as BaseSelect,
  selectClasses,
  SelectListboxSlotProps,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import { Toggle } from "@base-ui-components/react/toggle";
import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { FormControl } from "@mui/material";

import {
  Typography,
  Container,
  Button,
  IconButton,
  Input,
  Link,
  Box,
} from "@mui/material";
import Chapter from "../interfaces/Chapter";
import ChapterNode from "../interfaces/Chapter";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";

interface FormState {
  onCreated: (stories: ChapterNode[]) => void;
}

export function CreateForm({ onCreated }: FormState) {
  const [storyType, setStoryType] = useState("");
  const [creating, setCreating] = useState(0);
  const [language, setLanguage] = useState(0); // 0->English 1->HINDI 2->FRENCH -> 3->JAPANESE

  // const handleSubmit = () => {
  //   // Here you would typically send the data to your backend
  //   console.log("Story Type:", storyType);
  //   // Reset form fields
  //   generateStory(storyType);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Story Type:", storyType)
    // Reset form fields
    generateStory(storyType);
  }


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    setStoryType(e.target.value); 
}; 

  const generateStory = async (prompt: string) => {
    setCreating(1);
    // Simulate API call
       // const chatGpt = new ChatGpt();
    // const userStory = await chatGpt.generateStory(prompt);
    // const storyGraph = JSON.parse(userStory.choices[0].message.content);
    // const userGeneratedList: ChapterNode[] = storyGraph["graph"];
    // onCreated(userGeneratedList);
    // setStoryType("")
    setTimeout(() => {
      setCreating(2);
      onCreated([]);
    }, 2000);
  };

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    );
  }

  const BasicForm = () => {
    return (
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6"> 
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h5"
          align="center"
        >
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
        <Typography sx={{ mb: 2 }} variant="subtitle2" component="h6" align="center">
          Enter your prompt in 20 words
        </Typography>

        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          disabled={creating !== 0}
        >
          <Button startIcon={language === 1 && <DoneIcon />} onClick={() => setLanguage(1)}>
            Hindi
          </Button>
          <Button startIcon={language === 2 && <DoneIcon />} onClick={() => setLanguage(2)}>
            French
          </Button>
          <Button startIcon={language === 3 && <DoneIcon />} onClick={() => setLanguage(3)}>
            Japanese
          </Button>
        </ButtonGroup>
        <Button
          sx={{ mt: 4 }}
          type="submit"
          size="large"
          variant="contained"
        >
          Submit Story
        </Button></form>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        mt: 4,
        mb: 4,
      }}
    >
      {creating === 1 ? (
        <>
          <GradientCircularProgress />
          <br />
          <span>Creating interactive story...</span>
        </>
      ) : (
        <BasicForm />
      )}
    </Box>
  );
}