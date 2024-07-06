import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../ApiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/welcome';
import styled from 'styled-components';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {
  const navigate = useNavigate()

    const [contacts, setContacts] = useState([]);
    const [currentUser , setCurrentUser] =useState()
    const [isLoaded , setLoaded]=useState(false)
    const [currentChat, setCurrentChat]=useState(undefined)
    useEffect(()=>{
  

      const checking =async () =>{
        if(!localStorage.getItem('chatAppUser')){
          navigate('/login')
        }
        else {
          setCurrentUser(await JSON.parse(localStorage.getItem('chatAppUser')))
          setLoaded(true)
          // console.log('currentUser:', currentUser);
        }
  

  }
  checking()
   
 },[currentUser])
 //this type of effect run only when dependency chnages here is user changes 

      const handleChatChange = (chat)=>{
        setCurrentChat(chat)
      } 





 useEffect(() => {
  const fetchContacts = async () => {
    // console.log('currentUser:', currentUser);
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
   
      {/* <div className='h-screen  w-screen flex  justify-center gap-1 align-middle  bg-gray-700'>
        <div className="conatiner  bg-gray-800/90 h-4/5 grid grid-cols-4 ">  
      
         <Contacts contacts={contacts} currentUser ={currentUser}  changeChat={handleChatChnage}/>
         </div>
      </div> */}
          <Container>
            <div className="container">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            {
               isLoaded && currentChat === undefined ?
              (currentUser && <Welcome currentUser={currentUser} /> )
              :
              ( currentUser && <ChatContainer currentChat={currentChat} currentUser={currentUser} />)
            }


            {/* {currentUser && <Welcome currentUser={currentUser} />}  */}





            
            </div>

          </Container>
              
        

    
    
    
    </>
  );
}

export default Chat

const Container=styled.div`
 height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    
  
  }
`