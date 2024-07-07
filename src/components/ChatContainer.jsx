import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';



const ChatContainer = ({currentUser, currentChat}) => {
    //  console.log(currentUser.username)
    const handleSendMsg = async (msg)=>{
        
    }
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
        <Messages />
       <ChatInput  handleSendMsg={handleSendMsg} />
    </Container>
    </>
    
  )
}

export default ChatContainer;
const Container = styled.div`
padding-top: 1rem;
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

    /* height: 200px; */
`