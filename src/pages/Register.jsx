import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import gradBg from "../assets/gradBg.jpg"
import { ToastContainer, toast } from 'react-toastify';



function Register() {

  // ------------ STATES -----------

   const [values, setValues]= useState({
    username : '',
    email : ' ',
    password : '',
    confirmpassword : ""

   })


  //--- HANDLE SUBMIT------
   const handleSubmit = (event)=>{
    event.preventDefault()
    alert("form")
   }

   const handleValidation =()=>{
    const {password, confirmpassword,username,email} =values;
     if(password !== confirmpassword){
      toast.error("Passwords do not match ! ")
        
     }

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
           <h1>Linked</h1>
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