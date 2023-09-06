import baseURL from "./baseURL"

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//Recuerdo de cuando tarde 4 días en conectar el Frontend y Backend

// const postSignUp = (firstName: string, lastName: string, email: string, password: string) => 

// baseURL.post(`/auth/signup`, {"firstName" : firstName,  "lastName" : lastName, "email": email, "password" : password});
//const postSignUp = (firstName: string, lastName: string, email: string, password: string) => baseURL.post(`/auth/signup`, {data: {firstName, lastName, email, password}});

// const postSignUp = (registerData: RegisterData) => 
// baseURL.post("/auth/signup", registerData);

// const postSignIn = (email:string, password: string) => 
// baseURL.post(`/auth/login`, {email ,password});


// const postSignUp = (firstName: string, lastName: string, email : string, password : string) => {
//     return baseURL.post(`/auth/signup`, { firstName, lastName, email, password });
//   };

// const postSignIn = (email:string, password:string) => {
//     return baseURL.post(`/auth/login`, {"email":email,"password":password});
//   };


const postSignUp = (firstName: string, lastName: string, email: string, password: string) => {
  console.log("postSignUp", firstName, lastName, email, password)
  return baseURL.post(`/auth/signup`, {
    firstName,
    lastName,
    email,
    password,
  })
}

const postSignIn = (email: string, password: string) => {
  console.log("postSignUp", email, password)
  return baseURL.post(`/auth/login`, {
  "email": email,
  "password": password,
})
}

const postPost = (title: string, content: string) => baseURL.post(`/post`, {title, content})

const getPosts = () => baseURL.get(`/post`)

const getUserMe = () => baseURL.get(`/user/me`) 

const getUser = (id: string) => baseURL.get(`/user/${id}`)


export {
  postSignUp,
  postSignIn,
  postPost,
  getPosts,
  getUserMe, 
  getUser
}