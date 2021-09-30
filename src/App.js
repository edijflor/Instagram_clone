import './App.css';
import Post from './post';
import React, { useEffect, useState } from "react";
import { db, auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([
    // hardcode example
    // {
    //   username:"Edison",
    //   caption:"cap",
    //   imageUrl:"https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
    // },
  ]);

  //authentification modale, pop up
  const [open,setOpen] = useState(false);
  // firebase database
  // useEffect runs a piece of code based on a specific condition

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() =>{
    auth.onAuthStateChanged((authUser) =>{
      if (authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displaName){
          //dont update username
        }else{
          //if we just created someone
          return authUser.updateProfile({
            displayName: username,
          })
        }
      }
      else{
        //user has logged out
        setUser(null);
      }
    })
  }, [user, username]);

  useEffect(() =>{
    //here code
    //snapshot listener, everytime a change in db happens fires this code
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map( doc => ({
        id: doc.id, 
        post: doc.data()})))
    })
  }, [posts])


  const signUp = (event) =>{
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    
  }
// App
  return (
    <div className="app">
      {/* Authentification */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
           <center>
             <img className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
             alt=""/>
           </center>
           <Input
           placeholder="username"
           type="text"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           />
           <Input
           placeholder="email"
           type="text"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
           <Input
           placeholder="password"
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
           <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>

      {/*Header*/}
      <div className="app_header">
        <img className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""/>
      </div>
      <Button onClick={() => setOpen(true)}>Sign up</Button>

      <h1>hello</h1>

      {/*Post*/}
      {posts.map(({id, post}) => (
        <Post username={post.username} caption={post.caption}
        imageUrl={post.imageUrl}/>
      ))}
    </div>
  );
}

export default App;