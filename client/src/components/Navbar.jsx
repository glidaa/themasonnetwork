import React from 'react'
import {AppBar , Toolbar , Typography} from '@mui/material'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav>
            <AppBar position="static" sx={{backgroundColor:"#03C988"}}>
                <Toolbar>
                    <Typography variant="h4" align='center' sx={{ flexGrow: 1,fontWeight:"bold" }} >
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>
                            The Mason Network
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </nav>
    )
}

export default Navbar