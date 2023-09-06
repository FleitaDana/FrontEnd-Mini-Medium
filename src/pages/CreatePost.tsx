import React from 'react'
import { Grid, Box } from '@mui/material';
import CreatePost from '../components/CreatePost';
import Logo from '../components/Logo';

const CreatePosts = () => {

    return (
        <Box height="100vh" display="flex" flexDirection="column">
        <Logo />
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CreatePost />

        </Grid>
        </Box>
 
    );
}
export default CreatePosts;