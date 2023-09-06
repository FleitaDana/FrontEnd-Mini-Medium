import React from 'react'
import { Grid, Box } from '@mui/material';
import FormularioSignIn from '../components/FormularioSignIn';
import { useState } from 'react';

const SignIn = () => {

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ flex: 1 }} height="100vh">
            <Grid item xs={12} md={12} lg={12}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <FormularioSignIn />
                </Box>
            </Grid>
        </Grid>
    );
}
export default SignIn;