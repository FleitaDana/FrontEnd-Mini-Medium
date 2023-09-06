import { Grid, Typography, Box, TextField, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button } from '@mui/material';
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { postSignUp } from '../apis/apis';

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [correctPassword, setCorrectPassword] = useState(false);

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmation, setErrorConfirmation] = useState('');
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    //Librería de JavaScript que se utiliza para validar y manipular datos de entrada
    const validator = require('validator');

    const handleFirstName = (e: any) => {
        const firstName = e.target.value;
        setFirstName(firstName);

        if (firstName.trim().length === 0) {
            setErrorFirstName("First Name is required");
        } else {
            setErrorFirstName("");
        }

        //Devolvemos true si al menos una de las condiciones es true
        setIsButtonDisabled(
            !validator.isLength(firstName.trim(), { min: 1 }) ||
            !validator.isLength(lastName.trim(), { min: 1 }) ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) ||
            password !== passwordConfirmation
        );
    };

    const handleLastName = (e: any) => {
        const lastName = e.target.value;
        setLastName(lastName);

        if (lastName.trim().length === 0) {
            setErrorLastName("Last Name is required");
        } else {
            setErrorLastName("");
        }

        setIsButtonDisabled(
            !validator.isLength(firstName.trim(), { min: 1 }) ||
            !validator.isLength(lastName.trim(), { min: 1 }) ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) ||
            password !== passwordConfirmation
        );
    };

    const handleEmail = (e: any) => {
        const email = e.target.value;
        setEmail(email);
        if (!isEmail(email)) {
            setErrorEmail("Email invalido");
        } else {
            setErrorEmail("");
        }

        setIsButtonDisabled(
            !validator.isLength(firstName.trim(), { min: 1 }) ||
            !validator.isLength(lastName.trim(), { min: 1 }) ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) ||
            password !== passwordConfirmation
        );
    };

    // const isStrongPassword = (password: string) => {
    //     // Verificamos que la contraseña tenga al menos 6 caracteres
    //     if (password.length < 6) {
    //         return false;
    //     }

    //     // Verificamos que la contraseña contenga al menos una letra mayúscula
    //     if (!/[A-Z]/.test(password)) {
    //         return false;
    //     }

    //     // Verificamos que la contraseña contenga al menos un carácter especial
    //     if (!/[$@$!%*?&]/.test(password)) {
    //         return false;
    //     }

    //     // Si pasa todas las comprobaciones, la contraseña es válida
    //     return true;
    // };

    const handlePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);

        if (password.length < 6) {
            setErrorPassword('Must be at least 6 characters long');
        } else if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            setErrorPassword('Must contain at least 1 uppercase letter and 1 special character');
        } else {
            setErrorPassword(''); 
        }

        setIsButtonDisabled(
            !validator.isLength(firstName.trim(), { min: 1 }) ||
            !validator.isLength(lastName.trim(), { min: 1 }) ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) ||
            password !== passwordConfirmation
        );
    };
    
    const handlePasswordConfirmation = (e: any) => {
        const passwordConfirmation = e.target.value;
        setPasswordConfirmation(passwordConfirmation);

        // Verificamos si las contraseñas coinciden
        if (password === passwordConfirmation) {
            setErrorConfirmation(""); // Limpiar el error si las contraseñas coinciden
        } else {
            setErrorConfirmation("Passwords do not match"); // Establecer el error si las contraseñas no coinciden
        }

        setIsButtonDisabled(
            !validator.isLength(firstName.trim(), { min: 1 }) ||
            !validator.isLength(lastName.trim(), { min: 1 }) ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) ||
            password !== passwordConfirmation
        );
    };

    const navigate = useNavigate();

    const handleSignUp = () => {
        if (password === passwordConfirmation) {
            // console.log("Datos a registrar:", firstName, lastName, email, password);
            postSignUp(firstName, lastName, email, password)
                .then((res) => {
                    console.log("Server response:", res);
                    window.sessionStorage.setItem("token", res.data.token); //Metodo para obtener el token
                    console.log("Stored token:", res.data.token);
                    navigate("/Home");
                })
                .catch((error) => {
                    console.error("Registration request failed:", error);
                });
        }
    }

    const handleSignIn = () => {
        navigate("/SignIn");
    }

    const [showPasswordOne, setShowPasswordOne] = React.useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);

    const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
    const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            p="20"
            height={'100vh'}
        >
            <Grid item
                justifyContent="center"
                alignItems="center"
                xs={10} md={10} lg={8}>

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
                    height: '570px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                }} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="600px">

                    <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: '10px', marginTop: '10px', fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}>
                        Sign Up
                    </Typography>

                    <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: '10px', fontFamily: 'Bricolage Grotesque', fontWeight: 400 }}>
                        Enter your data to create an account
                    </Typography>

                    <TextField id="outlined-basic" label="First Name" variant="outlined" margin="dense" color="info"
                        value={firstName}
                        onChange={handleFirstName}
                        error={!!errorFirstName} // Cambia el color del campo cuando hay un error
                        helperText={errorFirstName} />

                    <TextField id="outlined-basic" label="Last Name" variant="outlined" margin="dense" color="info"
                        value={lastName}
                        onChange={handleLastName}
                        error={!!errorLastName} 
                        helperText={errorLastName} />

                    <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" color="info"
                        value={email}
                        onChange={handleEmail}
                        error={!!errorEmail}
                        helperText={errorEmail} />

                    <FormControl
                        sx={{
                            width: '26ch',
                            color: errorPassword ? 'red' : 'inherit', // Cambia el color del borde y el texto a rojo cuando hay un error
                        }}
                        variant="outlined"
                        margin="dense"
                        color="info"
                    >
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            sx={{
                                color: errorPassword ? 'red' : 'inherit', // Cambia el color del texto a rojo cuando hay un error
                            }}
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordOne ? 'text' : 'password'}
                            value={password}
                            onChange={handlePassword}
                            error={!!errorPassword}
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
                        {errorPassword && (
                            <Typography variant="body2" color="error">
                                {errorPassword}
                            </Typography>
                        )}
                    </FormControl>

                    <FormControl
                        sx={{
                            width: '26ch',
                            color: errorConfirmation ? 'red' : 'info', 
                        }}
                        variant="outlined"
                        margin="dense"
                        color="info"
                    >
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            sx={{
                                color: errorConfirmation ? 'red' : 'inherit', 
                            }}
                        >
                            Confirmation Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordTwo ? 'text' : 'password'}
                            value={passwordConfirmation}
                            onChange={handlePasswordConfirmation}
                            error={!!errorConfirmation}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordTwo}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswordTwo ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirmation Password"
                        />
                        {errorConfirmation && (
                            <Typography variant="body2" color="error">
                                {errorConfirmation}
                            </Typography>
                        )}
                    </FormControl>

                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                        disabled={isButtonDisabled}
                    >
                        Sign Up
                    </Button>

                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle1" color="primary" align="center" sx={{ fontFamily: 'Bricolage Grotesque', fontWeight: 400 }}>
                            Already have an account?
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleSignIn}
                            sx={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600 }}
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
export default SignUp;