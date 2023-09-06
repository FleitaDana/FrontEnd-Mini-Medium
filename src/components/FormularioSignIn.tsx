import React, { useState } from 'react';
import { Grid, Typography, Box, TextField, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from '../apis/apis';

const FormularioSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const navigate = useNavigate();

    //Librería de JavaScript que se utiliza para validar y manipular datos de entrada
    const validator = require('validator');

    const handleEmail = (e : any) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    
        // Validación del correo electrónico
        if (!validator.isEmail(emailValue)) {
            setEmailError('Invalid email');
            // Deshabilitar el botón si el correo electrónico es inválido
            setIsButtonDisabled(true);
        } else {
            setEmailError('');
            // Verificar si ambos campos son válidos para habilitar o deshabilitar el botón
            setIsButtonDisabled(!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }));
        }
    };

    const handlePassword = (e : any) => {
        const password = e.target.value;
        setPassword(password);
    

        if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            setPasswordError("Must contain at least 1 uppercase letter and 1 special character");
            setIsButtonDisabled(true);
        } else {
            setPasswordError(""); // Limpiamos el error si la contraseña es válida
            setIsButtonDisabled(!validator.isEmail(email));
        }
    };

    const handleSignIn = () => {
        postSignIn(email, password)
            .then((res) => {
                console.log('Server response:', res);
                window.sessionStorage.setItem('token', res.data.token);
                console.log('Stored token:', res.data.token);
                navigate('/Home');
            })
            .catch((error) => {
                console.error('Login on failure:', error);
            });
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };

    const handleClickShowPasswordOne = () => {
        setShowPasswordOne((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" p="20" height={'100vh'}>
            <Grid item justifyContent="center" alignItems="center" xs={10} md={10} lg={8}>
                <Box sx={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '400px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '550px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: 2, fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}>
                        Sign In with email
                    </Typography>
                    <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: 1, fontFamily: 'Bricolage Grotesque', fontWeight: 400 }}>
                        Enter the email and password of your account
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        color="info"
                        value={email}
                        onChange={handleEmail}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <FormControl
                        sx={{
                            width: '26ch',
                            color: passwordError ? 'red' : 'inherit', // Cambia el color del borde y el texto a rojo cuando hay un error
                        }}
                        variant="outlined"
                        margin="dense"
                        color="info"
                    >
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            sx={{
                                color: passwordError ? 'red' : 'inherit', // Cambia el color del texto a rojo cuando hay un error
                            }}
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordOne ? 'text' : 'password'}
                            value={password}
                            onChange={handlePassword}
                            error={!!passwordError}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordOne}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswordOne ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {passwordError && (
                            <Typography variant="body2" color="error">
                                {passwordError}
                            </Typography>
                        )}
                    </FormControl>
                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={handleSignIn}
                        disabled={isButtonDisabled} // Habilita o deshabilita el botón según la validación
                    >
                        Sign In
                    </Button>
                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle1" color="primary" align="center" sx={{ fontFamily: 'Bricolage Grotesque', fontWeight: 400 }}>
                            No account?
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleSignUp}
                            sx={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}
                        >
                            Create One
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default FormularioSignIn;
