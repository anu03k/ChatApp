import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import gradBg from "../assets/gradBg.jpg"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../ApiRoutes';


function Register() {

  const navigate =useNavigate();

  // ------------ STATES -----------

   const [values, setValues]= useState({
    username : '',
    email : ' ',
    password : '',
    confirmpassword : ""

   })

   const toastOpt = 
    { 
      position : "bottom-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
      
    
    }
   


  //--- ANDLE SUBMIT------
   const handleSubmit =  async (event)=>{
    event.preventDefault()
    
    if (handleValidation()){
      console.log("validating")
      console.log('in validation', registerRoute )
      // form data is extracted from the state
      const {password, confirmpassword,username,email} =values;
       const {data}= await axios.post(registerRoute,{
         username, email, password,
       });
       if(data.status ===  false){
        toast.error(data.msg , toastOpt)
       }
       if(data.status === true){
        localStorage.setItem('chatAppUser', JSON.stringify(data.user))
       }

      //   sends a POST request to the specified URL with the form data.
       /* If the request is successful, the response data is logged to the console.
        If the request fails, the error is caught and logged to the console.
        */

        // for storing - localStorage.setItem('key', 'value');,,set get clear remove

       navigate('/');

    }
   }

   const handleValidation =()=>{
    const {password, confirmpassword,username,email} =values;
     if(password !== confirmpassword){
      toast.error("Passwords do not match ! ", toastOpt )
      return false ;  
     }
      
       if (username.length < 3){
        toast.error("Minimum 3 character of username required" ,toastOpt)
          return false;
      }
      if (password.length < 8){
        toast.error("Minimum 8 character of pw required" ,toastOpt)
          return false;
      }
      else if (email === ""){
        toast.error("PLease enter your  email" ,toastOpt)
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
        type="email" name="email" id="" 
        placeholder='Enter your email '  
        onChange={(e)=>handleChange(e)}  />
         
         
         <input 
        type="password" name="password" id="" 
        placeholder='set your password '  
        onChange={(e)=>handleChange(e)}  />

        <input 
        type="password" name="confirmpassword" id="" 
        placeholder='Confirm password'  
        onChange={(e)=>handleChange(e)}  />

        <button type='submit '> Create User </button>
        <span> Already have an account ?  <Link to="/login" >Login</Link> </span>




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
color: #e21e6c;
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
      border-bottom : 0.1rem solid #e21e6c;
      
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
        color: #1e1e25;
        text-transform: uppercase;
        a{
          color:#000000;
          text-transform: uppercase;
          font-weight: bold;

        }
      }

   

  }


  
`;

export default Register