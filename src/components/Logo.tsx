import * as React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import img from '../assets/logoSirius.png';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                padding="16px" // Ajusta el espaciado según tus necesidades
            >
                <Avatar alt="Logo" src={img} style={{ marginRight: '8px' }} /> {/* Ajusta el margen derecho según tus necesidades */}
                <Typography
                    variant="h6"
                    color="primary"
                    style={{
                        fontFamily: 'Bricolage Grotesque',
                        fontWeight: 600,
                        fontSize: '19px',
                    }}
                >
                    Project Midi-Medium
                </Typography>
            </Box>
        </Link>
    );
}

export default Logo;






