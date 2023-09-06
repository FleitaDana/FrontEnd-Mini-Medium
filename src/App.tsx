import './App.css';
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUp from './pages/SignUp';
import AuthRoute from './Route/AuthRoute';
import Home from './pages/Home';

import Landing from './pages/Landing';
import CreatePosts from './pages/CreatePost';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>

        <Routes>
        <Route path='/' element={<Landing/>}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/SignIn' element={<SignIn />}></Route>

          <Route element={<AuthRoute />}>
            <Route
              path='/Home'
              element={<Home />}
            />
            <Route
              path='/CreatePost'
              element={<CreatePosts />}
            />
          </Route>
        </Routes>
      
    </ThemeProvider>
  );
}

export default App;
