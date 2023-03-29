import React from 'react'
import { Box,Typography } from '@mui/material'

const Footer = () => {
    return (
        <Box sx={{position:"fixed",left:0,bottom:0,width:"100%",backgroundColor:"black",p:"0.4rem"}}>
            <Typography sx={{color:"white",textAlign:"center"}}>
                ©2023 Michael Castleman
            </Typography>
        </Box>
    )
}

export default Footer