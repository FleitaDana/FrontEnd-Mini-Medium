import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function Main() {

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="h1" color="primary" component="h1" style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: '100px' }}>
                Join our blog!
            </Typography>
            <Typography variant="subtitle1" color="primary" style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 400, fontSize: '40px' }}>
                Limitless inspiration for curious minds
            </Typography>
            <Link to="/SignUp">
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{ marginTop: '10px', fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}
                >
                    Sign Up
                </Button>
            </Link>

            <Link to="/SignIn">
                <Button
                    variant="contained"
                    size="large"
                    sx={{ marginTop: '10px', paddingLeft: '25px', paddingRight: '25px', fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}
                >
                    Sign In
                </Button>
            </Link>
        </Box>
    );
}
export default Main;