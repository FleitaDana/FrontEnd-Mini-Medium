import React from 'react';
import { Box, Grid } from '@mui/material';
import Landing from '../components/Landing';
import Logo from '../components/Logo';

const Home = () => {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Logo />
            <Grid container justifyContent="center" alignItems="center" style={{ flex: 1 }}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Landing />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
