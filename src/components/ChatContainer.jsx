import {React,useState,useEffect} from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios'
import { sendMsgRoute ,getAllMsg} from '../ApiRoutes';




const ChatContainer = ({currentUser, currentChat}) => {
const [messages, setMsgs]=useState([]);




useEffect(() => {
  const fetchMessages = async () => {
    try {
        const response = await axios.post(getAllMsg, {
          from: currentUser._id,
          to: currentChat._id,
        });
        // console.log("Fetched messages:", response.data); // Debug log
        setMsgs(response.data);
      
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();
}, [currentChat]);






    //  console.log(currentUser.username)
    const handleSendMsg = async (msg) => {
      try {
        await axios.post(sendMsgRoute, {
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
    
        
    
  return (
    
    <>
    {/* <div className='text-black'>ChatContainer</div> */}
    <Container>

        <div className="chat-header ">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.AvatarImg}`} alt="avatar" />
                </div>
                    <div className="username text-white">
                        <h3>{currentChat.username}</h3>
                    </div>

                
            </div>
            <Logout />

        </div>
        {/* <div className="chat-messages"></div> */}
        {/* <Messages /> */}
        <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
       <ChatInput  handleSendMsg={handleSendMsg} />
    </Container>
    </>
    
  )
}

export default ChatContainer;


const Container = styled.div`
padding-top: 1rem;
display: grid;
grid-template-rows:10% 82% 8%;
gap:0.1rem;
overflow:hidden;

 .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
}

.chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
   
    
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  



    /* height: 200px; */
`