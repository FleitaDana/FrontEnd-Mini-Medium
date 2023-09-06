import React, { useEffect, useState } from 'react'; 
import {Typography } from '@mui/material';
import Divider from '@mui/material/Divider'; 
import Chip from '@mui/material/Chip'; 
import { Box, Stack, Grid } from '@mui/material'; 
import { styled } from '@mui/material/styles'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { getPosts, getUser } from '../apis/apis'; 
import { AxiosResponse } from 'axios'; 
/* import { format } from 'date-fns'; */
import { format } from 'date-fns-tz';
import { es } from 'date-fns/locale';

// Definimos el tipo de datos que se espera de getPosts()
interface PostData {
  id: string,
  authorId: string,
  content: string,
  createdAt: string,
  title: string
}

// Definimos el tipo de datos para los usuarios
interface UserData{
  id: string,
  firstName: string,
  lastName: string
}

// Define un componente Content con estilos personalizados
const Content = styled('div')({
  marginTop: '10px',
  marginLeft: '10px',
  marginRight: '10px',
});


function Post() {
  const [posts, setPosts] = useState<PostData[]>([]); // Declaramos un estado para almacenar datos de publicaciones
  const [users, setUsers] = useState<UserData[]>([]); 

  
  useEffect(() => {

// Obtenemos publicaciones
    getPosts()
      .then((res: AxiosResponse<PostData[]>) => {
        setPosts(res.data); // Actualizamos el estado 'posts' con los datos de las publicaciones
        const authorIds = res.data.map((post) => post.authorId); // Creamos un arreglo de IDs de autores de las publicaciones
        
// Obtenemos los datos de los usuarios por sus authorIds
        getUsersByAuthorIds(authorIds);
      })
      .catch((error) => {
        console.error("Error:", error); 
      });
  }, []); 


// Definimos una función para obtener datos de usuarios por sus authorIds
  const getUsersByAuthorIds = (authorIds: string[]) => {
    const promises = authorIds.map((authorId) => getUser(authorId)); // Creamos un arreglo de promesas con los usuarios autores 
    
// Esperamos a que todas las promesas se resuelvan
    Promise.all(promises)
    .then((responses) => {
      const userDataMap: Record<string, UserData> = {}; // Creamos un objeto para almacenar los datos de usuario sin duplicados
      responses.forEach((response) => {
        const user = response.data;
        userDataMap[user.id] = user; // Almacenamos los datos de usuario en el objeto utilizando el ID como clave
      });

      const uniqueUsers = Object.values(userDataMap); // Obtemos los datos de usuarios únicos del objeto
      setUsers(uniqueUsers); // Actualizamos el estado 'users' con los datos de usuario únicos
    })
    .catch((error) => {
      console.error("Error al obtener datos de usuario:", error); 
    });
  };


  return (
    <Box sx={{ width: '100%', backgroundColor: '#ffffff', borderRadius: '10px' }}>
      <Grid container flexDirection={"column"} p={4} gap={2}>
        {posts.map((post, index) => (
          <div key={index}>
            <Grid item container flexDirection={"column"} gap={1} >
              <Divider />
              <Stack direction="row" alignItems="center" spacing={1} >
                {/* Buscamos el usuario correspondiente por su authorId y muestra su nombre */}
            {users.map((user) => (
              user.id === post.authorId && (
                <>
                  <Chip icon={<AccountCircleIcon />} label={`${user.firstName} ${user.lastName}`} variant="outlined" />
                  <Typography variant="body2" color="textSecondary" component="span" style={{ marginLeft: '10px' }}>
                {format(new Date(post.createdAt), 'MMMM d', { locale: es })} {/* Formatea la fecha */}
              </Typography>
                </>
              )
            ))}
              </Stack>
              <Content sx={{ marginTop: 1, marginLeft: 2, marginRight: 2, fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: "20px" }}>
                {post.title}
              </Content>
              <Content sx={{ marginTop: 1, marginLeft: 2, marginRight: 2 }}>
                {post.content}
              </Content>
            </Grid>
          </div>
        ))}
      </Grid>
    </Box>
  );
}

export default Post;

