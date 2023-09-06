import { Box, Button, FormControl, InputAdornment, InputLabel, Typography, OutlinedInput, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import { postPost } from '../apis/apis';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };

    const handleContent = (e: any) => {
        setContent(e.target.value);
    };

    const navigate = useNavigate();
    
    const handleCreatePost = () => {
        console.log("Datos a registrar:", title, content);
        postPost(title, content)
            .then((res) => {
                console.log("Respuesta del servidor:", res);
                navigate('/Home');
            })
            .catch((error) => {
                console.error("Error en la solicitud de registro:", error);
            });
    };

    const handleCancel = () => {
        navigate('/Home');
    };

    return (

        <Box sx={{
            backgroundColor: '#ffffff',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '10px',
            width: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="600px">

            <Typography variant="h3" color="primary" align="center" style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}>
                New Post
            </Typography>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    value={title} 
                    onChange={handleTitle} 
                    label="Title"
                    multiline
                    rows={3}
                />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Content</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    value={content} 
                    onChange={handleContent} 
                    label="Content"
                    multiline
                    rows={7}
                />
            </FormControl>

            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <Button variant="contained" color="success" onClick={handleCreatePost}>Publish</Button>
                <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Box>

    );
}

export default CreatePost;