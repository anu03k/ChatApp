import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import gradBg from "../assets/gradBg.jpg"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../ApiRoutes';


function Login() {

  const navigate =useNavigate();

  // ------------ STATES -----------

   const [values, setValues]= useState({
    username : '',
    
    password : '',
  

   })

   const toastOpt = 
    { 
      position : "bottom-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
      
    
    }
// useEffect(<function>, <dependency>) runs on every render so that empty array ensure runs on only first render


    useEffect(()=>{
      if(localStorage.getItem('chatAppUser')){
        navigate('/chat')
      }
    },[])
   


  //--- ANDLE SUBMIT------
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (handleValidation()) {
      console.log("validating");
      console.log('in validation', loginRoute)
  
      // form data is extracted from the state
      const { password, username } = values;
  
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg || "Invalid username or password", toastOpt);
        } else if (data.status === true) {
          localStorage.setItem('chatAppUser', JSON.stringify(data.user));
          navigate('/chat');
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("An error occurred during login. Please try again.", toastOpt);
      }
    }
  };

   const handleValidation =()=>{
    const {password, username,} =values;
     if(password === " "){
      toast.error(" email or username and password required" ,toastOpt)
      return false; 
     }
      
       if (username.length ===" "){
        toast.error(" email or username and password required" ,toastOpt)
          return false;
      }
      
      return true;
    
   }

   //---------HANDLE CHANGE ----

   const handleChange = (event)=>{
    // instead of mutating like form.name = ' ' , replace the whole obj by creating a new

    setValues({...values, [event.target.name]:event.target.value})
   }




  return (
    <>



    <FormContainer>
      <form onSubmit={(event)=>handleSubmit(event)}> 
      {/* onsubmit capyure event and pass to our custom event handler */}
        <div className='brand'>
           <img src="./assests/react." alt="" srcset="" />
           <h1>ChatterBox</h1>
       </div>

        <input 
        type="text" name="username" id="" 
        placeholder='Enter your name '  
        onChange={(e)=>handleChange(e)}  />

               
         
         <input 
        type="password" name="password" id="" 
        placeholder='Enter your password '  
        onChange={(e)=>handleChange(e)}  />

       

        <button type='submit '> Login </button>
        <span> Dont have an account ?  <Link to="/register" >Register</Link> </span>




        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}


const  FormContainer = styled.div`
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
/* background-color: #8e8e96;; */
background-image: url(${gradBg});
color: #d96d98;
  .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    
    img{
      height: 5rem;
    }
    h1{
      color: #ecd3dd;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 30px;
      font-family: '';
    }
  }

  form{
    display: flex;
    height: 70vh;
    flex-direction: column;
    gap: 2rem;
    background-color: #242433;
    border-radius: 2rem;
    padding: 3rem 5rem ;
    input {
      background-color: transparent;
      padding: 0.6rem;

      color: white;
      border-bottom : 0.1rem solid #d96d98;
      
      /* border-radius:10%; */
      width: 100%;
      font-size: 1rem;
       &:focus{
        border: 0.1rem #ecd3dd 1rem solid;
        outline: none;
        padding:0.7rem 0.4rem;
     
       }
       &:hover{
        /* border: none; */
       }

    }
    button {
      background-color: #ecd3dd;
      color: #1e1e25;
      padding: 1rem , 2rem;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.1s ease-in-out;
      &:hover{
        background-color: #d96d98;
        color: #ecd3dd;
        transform: scale(1.05);


      } }

      span{
        color: #f8f8fc;
        text-transform: uppercase;
        a{
          color:#fefbfb;
          text-transform: uppercase;
          font-weight: bold;

        }
      }

   

  }


  
`;

export default Login