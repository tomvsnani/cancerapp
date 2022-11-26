import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginComponent from "./LoginComponent";
import { useState } from "react";

import {Link , useNavigate} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

import {toggleLoginRegister ,error} from './loginReducer'








function App() {


  const {isInLoginPage,errorMessage} = useSelector(state=>state.login);

  

  // console.log("is In login page :"+ JSON.stringify(isInLoginPage))

  // console.log(" errorMessage :"+ JSON.stringify(errorMessage))

  // console.log('use selectror : '+JSON.stringify(s)+" ,"+isInLoginPage)

  const dispatch =useDispatch()



  const navigate=useNavigate()


  function loginSubmitClicked() {

    navigate('/homepage')
  
  }


  function elementsChanged( e) {
    let name = e.target.name;

    let value=e.target.value
  
    switch (name) {
      case "email":if(value.length>0 && !value.includes('@')) dispatch(error("Please enter valid email")) ; else dispatch(error(''))
        
        break;
      case "username":
        if(value.length>0 && value.length<6) dispatch(error("Username Should be atleast 6 characters")); else dispatch(error(''))
        break;
      case "fullname":
        if(value.length>0 && value.length<6) dispatch(error("fullname Should be atleast 6 characters")); else dispatch(error(''))
        break;
      case "password":
        if(value.length>0 && value.length<6) dispatch(error("password Should be atleast 6 characters")); else dispatch(error(''))
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
      ></LoginComponent>
    </div>
  );
}

export default App;
