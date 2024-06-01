
import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { SetAvatarRoute } from '../ApiRoutes';
import { Buffer } from 'buffer';
import Register from './Register';

const SetAvatar = () => {

    const api= "https://api.multiavatar.com/45678945"
     
    const navigate = useNavigate();
    const [avatars, SetAvatars] = useState([]);
    const [isLoading, SetIsLoadin] = useState(true);
    const [SelectedAv , SetSelectedAv] = useState(undefined);
    // onst [isLoading, setIsLoading] = useState(true);

    //-----Tosat------

    const toastOpt = 
    { 
      position : "bottom-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
      
    
    }


    const  SetProfilePic = async () => {
      if(SelectedAv === undefined){
        toast.error("Please select an avatar", toastOpt)
      }

      else {

        // local storage return string so parsing into js obj useing json.parse
        const user = await JSON.parse(localStorage.getItem("chatAppUser"))
        const {data} = await axios.post(`${SetAvatarRoute}/${user._id}` ,{
            image: avatars[SelectedAv]
            // server ma post req send url teo ..ani data chai image
        } )
      } 
        

    };
    const fetchImagesWithRetry = async (retryCount = 3, delay = 1000) => {
        try {
          const data = [];
          for (let i = 0; i < 4; i++) {
            const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);
            data.push(buffer.toString('base64'));
          }
          SetAvatars(data);
          SetIsLoadin(false);
        } catch (error) {
          if (retryCount <= 0) {
            console.error("Error fetching images:", error);
            SetIsLoadin(false);
            return;
          }
          if (error.response && error.response.status === 429) {
            console.log("Too many requests, retrying in", delay, "milliseconds...");
            await new Promise(resolve => setTimeout(resolve, delay));
            await fetchImagesWithRetry(retryCount - 1, delay * 2); // Exponential backoff
          } else {
            console.error("Error fetching images:", error);
            setIsLoading(false);
          }
        }
      };
    
      // Call fetchImagesWithRetry when component mounts
      useEffect(() => {
        fetchImagesWithRetry();
      }, []);
    
    



  return (

    
    <>

    { isLoading ? <Container> 
      <img src={loader } alt='loader' className='loader' />
        </Container> 

        // if false then ie already loaded then show conatiner

        : (
<Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    SelectedAv === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => SetSelectedAv(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={SetProfilePic} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
    
    



        )
      
        
        
        }

    
    {/* ---------------Container------------ */}
    
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color:#242433;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #e21e6c
    }
  }
  .submit-btn {
    background-color: #e21e6c;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #d96d98;
    }
  }
`;

export default SetAvatar;