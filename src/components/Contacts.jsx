import React, { useEffect } from 'react'
import { useState } from 'react'

const Contacts = ({contacts,currentUser}) => { //destructure contacts


    const [currentUsername, setCurrentUsername]   = useState(undefined)
    const [currentUserImg, setCurrentUserImg] =useState(undefined)
     const[currentSelected, setCurrentSelected] =useState(undefined)
     

     useEffect(() =>{
        const setting = async ()=>   {
            if(currentUser){
                setCurrentUsername(currentUser.username);
                setCurrentUserImg(currentUser.AvatarImg)

            }
        }



     },[currentUser])


  return (

    <> 

    {
        currentUserImg && currentUsername &&(
            <section>
                <div className='brand'>
                    
                    {/* logo img src */}
              
                <h3>ChatterBox</h3>
                </div>

                 <div className='contacts '>
                    

                {
                    // map ( current value , index)
                    contacts.map((contact,index)=>{
                        return(
                            <>
                            <div div  className={`contact ${index === currentSelected ? "selected" : ""}`}  key={index}  >
                            <div  className='avatar' >
                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" srcset="" />

                            </div>
                            <div className="username text-white"> <h3>{contact.username}</h3></div>
                            </div>
                            </>
                            
                        )

                    })
                }
                </div>
            </section>
        )
    }
    <div className='text-white'>Contacts</div>
    </>
    
  )
}

export default Contacts