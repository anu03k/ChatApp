
import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"

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


    //-----Tosat------

    const toastOpt = 
    { 
      position : "bottom-right",
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
      
    
    }


    const SetProfilePic = async () => {
        

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
    {/* ---------------Container------------ */}
    <div className=''> 
                    {/* title ------------- */}
        <div>
        <h1>Pick an avatar for your profile picture </h1>
        </div>
        <div>
            {

                //from set avatars we have 4 avatars so ampping o ver it
                avatars.map((avatar,index )=>{
                    return(
                        /// Map over the avatars array and render each avatar inside a <div>
                        <div className= {`avatar${SelectedAv === index?  "selected" : ""}`}> 
                        {/* maps over all 4  avatar ani if index is same of selected then mark class selected adedd */}
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar'  onClick={SetSelectedAv(index)} />
                        {/* image is base64 coded svg image ..setselected ma index pass*/}
                        </div>
                    )
                })

            }
            
        </div>

       


    </div>

    
    
    
    </>
  )
}

export default SetAvatar