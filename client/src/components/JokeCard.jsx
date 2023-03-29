import React from 'react'
import {Box, Typography} from "@mui/material"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const JokeCard = ({joke,setCurrentJoke,currentJoke,maxJokes}) => {

    const getNextJoke = () => {
        setCurrentJoke(currentJoke + 1);
    }

    const getPrevJoke = () => {
        setCurrentJoke(currentJoke - 1);
    }
    

    return (
        <Box sx={{maxWidth:"800px", m:"4rem auto",p:"2rem 3rem", backgroundColor:"rgb(255,255,255,0.95)",borderRadius:"15px"}}>
            <Typography variant='h4' sx={{color:"black"}}>{joke?.title}.</Typography>
            <Typography variant='h5' sx={{color:"black",pt:"1rem"}}>{joke?.joke}{joke?.joke[joke.joke.length -1] ==='"' ? null : '"'}</Typography>
            <Box sx={{display:"flex",justifyContent:"space-between",pt:"1.5rem",alignItems:"center"}}>
                <KeyboardDoubleArrowLeftIcon onClick={currentJoke !=0 ? getPrevJoke : null} sx={currentJoke !=0 ? {color:"black",cursor:"pointer",fontSize:"2.5em"} : {color:"#A9A9A9", cursor:"default",fontSize:"2.5em"}}/>
                <a href={joke?.url} style={{color:"white",backgroundColor:"#03C988",padding:"1.5rem",borderRadius:"30px",textDecoration:"none",fontSize:"1.5em"}} target="_blank" >Article Link</a>
                <KeyboardDoubleArrowRightIcon onClick={currentJoke != maxJokes - 1 ? getNextJoke : null} sx={currentJoke != maxJokes-1 ? {color:"black",cursor:"pointer",fontSize:"2.5em"} : {color:"#A9A9A9", cursor:"default",fontSize:"2.5em"}}/>
            </Box>
        </Box >
    )
}

export default JokeCard