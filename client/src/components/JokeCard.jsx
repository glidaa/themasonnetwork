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
        <Box sx={{maxWidth:"600px", m:"4rem auto",p:"2rem 3rem", backgroundColor:"rgb(255,255,255,0.95)",borderRadius:"15px"}}>
            <Typography variant='h6' sx={{color:"black"}}>{joke?.title}.</Typography>
            <Typography variant='body1' sx={{color:"black",pt:"1rem"}}>{joke?.joke}{joke?.joke[joke.joke.length -1] ==='"' ? null : '"'}</Typography>
            <Box sx={{display:"flex",justifyContent:"space-between",pt:"1.5rem"}}>
                <KeyboardDoubleArrowLeftIcon onClick={currentJoke !=0 ? getPrevJoke : null} sx={currentJoke !=0 ? {color:"black",cursor:"pointer"} : {color:"#A9A9A9", cursor:"default"}}/>
                <a href={joke?.url} style={{color:"white",backgroundColor:"#03C988",padding:"15px",borderRadius:"30px",textDecoration:"none"}} target="_blank" >Article Link</a>
                <KeyboardDoubleArrowRightIcon onClick={currentJoke != maxJokes - 1 ? getNextJoke : null} sx={currentJoke != maxJokes-1 ? {color:"black",cursor:"pointer"} : {color:"#A9A9A9", cursor:"default"}}/>
            </Box>
        </Box >
    )
}

export default JokeCard