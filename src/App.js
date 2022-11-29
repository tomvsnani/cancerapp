import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginComponent from "./LoginComponent";
import { useState } from "react";

import {Link , useNavigate} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

import {toggleLoginRegister ,error,setUserDetails} from './loginReducer'



function App() {


  const {isInLoginPage,errorMessage} = useSelector(state=>state.login);

  const [username,setUsername] = useState('')

  const [password,setPasswprd] = useState('')

  const [fullname,setFullname] = useState('')

  const [email,setEmail] = useState('')

  

  // console.log("is In login page :"+ JSON.stringify(isInLoginPage))

  // console.log(" errorMessage :"+ JSON.stringify(errorMessage))

  // console.log('use selectror : '+JSON.stringify(s)+" ,"+isInLoginPage)

  const dispatch =useDispatch()



  const navigate=useNavigate()


  function loginSubmitClicked() {

    if(isInLoginPage)

   fetch('http://aki-pinky-backend.herokuapp.com/login',{
    method:'POST',
    body:
      JSON.stringify({username:username,
        password:password,})
      

    ,
    headers:{'Content-Type': 'application/json'}
   }).then((response)=>response.json())
   .then((data)=>{
    if(data && data.code===1){
    navigate('/homepage')
    dispatch(setUserDetails(data.data))
    }
    else
    dispatch(error(data.message))
   })

   else

   {

    fetch('http://aki-pinky-backend.herokuapp.com/signup',{
    method:'POST',
    body:
      JSON.stringify({username:username,
        password:password,
        email:email,
        fullname:fullname
      })
      

    ,
    headers:{'Content-Type': 'application/json'}
   }).then((response)=>response.json())
   .then((data)=>{
    console.log(data)
    if(data && data.code==1)
    navigate('/homepage')
    else
    dispatch(error(data.message))
   })

   }
  
  }


  function elementsChanged( e) {

    let name = e.target.name;

    let value=e.target.value
  
    switch (name) {
      case "email":if(value.length>0 && !value.includes('@')) dispatch(error("Please enter valid email")) ; else dispatch(error(''))
      setEmail(value)
        
        break;
      case "username":
        if(value.length>0 && value.length<3) dispatch(error("Username Should be atleast 3 characters")); else dispatch(error(''))
        setUsername(value)
        break;
      case "fullname":
        if(value.length>0 && value.length<3) dispatch(error("fullname Should be atleast 3 characters")); else dispatch(error(''))
        setFullname(value)
        break;
      case "password":
        if(value.length>0 && value.length<3) dispatch(error("password Should be atleast 3 characters")); else dispatch(error(''))
        setPasswprd(value)
        break;
      default:
        console.log("wrong event");
    }
  }

  console.log("rendered");

  return (
    <div className="container p-5">
      <LoginComponent
        isInLoginPage={isInLoginPage}
        elementsChanged={(e) => {
          elementsChanged( e);
        }}
        loginSubmitClicked={loginSubmitClicked}
        toggleLoginRegister={() => {
          console.log("login clicked");
          dispatch(toggleLoginRegister(!isInLoginPage));
        }}
        errormessage={errorMessage}
        username={username}
        password={password}
        email={email}
        fullname={fullname}
      ></LoginComponent>
    </div>
  );
}

export default App;
