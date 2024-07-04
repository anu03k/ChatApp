import React, { useEffect } from 'react'
import { useState } from 'react'
 import styled from 'styled-components'

const Contacts = ({contacts,currentUser,changeChat}) => { //destructure contacts

        // const [currentUser, setCurrentUser] = useState(null); // or initial user object
        // const [contacts, setContacts] = useState([]); // or initial empty array
        
        const [currentUsername, setCurrentUsername]   = useState(undefined)
        const [currentUserImg, setCurrentUserImg] =useState(undefined)
        const[currentSelected, setCurrentSelected] =useState(undefined)
       

     useEffect(() => {
        

             
            // console.log('currentUser:', currentUser);
            // console.log('contacts:', contacts);
        
  
  
  
  
            const fetchUserDetails = async () => {
                if (currentUser) {
                    setCurrentUsername(currentUser.username);
                    setCurrentUserImg(currentUser.AvatarImg);
                    // console.log(currentUsername)
                    
                } else {
                    // Handle case where currentUser data is not complete
                    console.error('Current user data is incomplete or undefined');
                }
                };





    
        fetchUserDetails();
      }, [currentUser]);
         
        const changeCurrentChat = (index,contact)=>{
            setCurrentSelected(index);
             changeChat(contact);
        }

        if (!currentUser) {
            return <div>Loading...</div>; // or handle loading state
          }


     return (
    
        <>
        
          {currentUserImg && currentUsername && (
              <Container>
              
              <div className='text-white'>Container</div>
             <div className="brand">
              <h3>ChatterBox</h3>
             </div>
              <div className="contacts">
              {contacts.map((contact, index) => (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.AvatarImg}`} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              ))}
              <div className='text-white'>haha</div>
            </div>


            {/* <div className='text-white'>hih</div> */}
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImg}`} alt="avatar" />
              </div>
              <div className="username">
                <h2>{currentUsername}</h2>
              </div>
            </div>
          </Container>
          )}

          
        </>
      ) ;
     }


    

    const Container = styled.div`
      display: grid;
      grid-template-rows: 10% 65% 15%;
      overflow: hidden;
      background-color: #080420;
      .brand {
        display: flex;
        align-items: center;
        height:100px;
        gap: 0.4rem;
        justify-content: center;
        img {
          height: 2rem;
        }
        h3 {
          color: white;
          text-transform: uppercase;
        }
      }
      .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        margin-top: 0;
        gap: 0.8rem;
        /* &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
          }
        } */
        .contact {
          background-color: #ffffff34;
          min-height: 5rem;
          cursor: pointer;
          width: 90%;
          border-radius: 0.2rem;
          padding: 0.4rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          transition: 0.5s ease-in-out;
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
        .selected {
          background-color: #9a86f3;
        }
      }
    
      .current-user {
        background-color: #6fea36;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
          img {
            height: 4rem;
            max-inline-size: 100%;
          }
        }
        .username {
          h2 {
            color: white;
          }
        }
        /* @media screen and (min-width: 720px) and (max-width: 1080px) {
          gap: 0.5rem;
          .username {
            h2 {
              font-size: 1rem;
            }
          }
        } */
      }
    ` ;

export default Contacts
    