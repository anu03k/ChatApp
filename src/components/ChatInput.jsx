import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import { IoMdSend} from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs";


const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");



  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat =(event)=>{
    event.preventDefault();
    if(msg.length >0){
      handleSendMsg(msg);
      setMsg('');
      // empty string after msg sent
    }
  }
  return (
  
    <>
   <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {/* {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} */}
        </div>
      </div>
      <form action="" className='input-container w-full  flex items-center gap-8 bg-yellow-50'   onSubmit={(e)=>sendChat(e)}  >
        <input type="text" placeholder='Enter message here'   className=' '  value={msg} onChange={(e)=>setMsg(e.target.value)} />
        <button className='submit'> <IoMdSend />    </button>
            
      </form>





   </Container>

    </>
  )
}

export default ChatInput
const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
padding-bottom: 0.3rem;
.button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: 350px;
               
        
        
      }
    }
  }
  





  .input-container{
    border-radius: 2rem;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color:#6fea36; ;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #81ba67;
      border: none;
      
      svg {
        font-size: 2rem;
        color: white;
      }
    }



  }



  

`;