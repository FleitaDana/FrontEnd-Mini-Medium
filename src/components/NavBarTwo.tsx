import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { Menu, MenuItem, Stack } from '@mui/material';
import Face2Icon from '@mui/icons-material/Face2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';

function NavBarTwo() {
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleSignOut = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box sx={{ position: 'fixed', width: '100%', zIndex: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%', height: '70px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Logo />
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end" 
                        alignItems="center" 
                        flexGrow={1} 
                    >
                        <Link to="/CreatePost" style={{ textDecoration: 'none' }}>
                            <IconButton edge="start" aria-label="menu" sx={{ color: '#000', fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: '18px', "&:hover": {backgroundColor: "transparent" }}}>
                                <EditNoteIcon sx={{ mr: 1 }} />
                                Write
                            </IconButton>
                        </Link>
                        <Fab onClick={handleClick} size="small" aria-label="edit" sx={{ backgroundColor: '#ffffff', color: '#000', fontFamily: 'Bricolage Grotesque', fontWeight: 700 }}>
                            <Face2Icon sx={{ mr: 1, ml: 1 }} />
                        </Fab>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBarTwo;
