import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../ApiRoutes';
import Contacts from '../components/Contacts';

const Chat = () => {
  const navigate = useNavigate()

const [contacts, setContacts] = useState([]);
const [currentUser , setCurrentUser] =useState()

useEffect(()=>{

  const checking =async () =>{
    if(!localStorage.getItem('chatAppUser')){
      navigate('/login')
    }
    else {
      setCurrentUser(await JSON.parse(localStorage.getItem('ChatAppUser')))
    }
  

  }
  checking()
  
},[currentUser])
//this type of effect run only when dependency chnages here is user changes 






useEffect(() => {
  const fetchContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImgSet) {
        try {
          const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      } else {
        navigate('/setAvatar');
      }
    }
  };

  fetchContacts();
}, [currentUser, navigate, allUserRoute]);

  return (
    <>
  hello this is chat page
      <div className='h-screen  w-screen flex flex-col justify-center gap-1 align-middle  bg-gray-700'>
        <div className="conatiner  bg-gray-800/90 h-4/5 grid grid-cols-4 ">  </div>
         <Contacts contacts={contacts} currentUser ={currentUser}  />

      </div>

    
    
    
    </>
  )
}

export default Chat