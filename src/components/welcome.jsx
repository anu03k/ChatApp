import React from 'react'
import styled from 'styled-components'
import hello from '../assets/hello.gif'

const Welcome = ({currentUser}) => {
//     const [currentUsername, setCurrentUsername]   = useState(undefined)

    
//     useEffect(() => {
            
//         const fetchUserDetails = async () => {
//             if (currentUser) {
//                 setCurrentUsername(currentUser.username);
                
//                 console.log(currentUser)
                
//             } else {
//                 // Handle case where currentUser data is not complete
//                 console.error('Current user data is incomplete or undefined');
//             }
//             };
//     fetchUserDetails();
//   }, [currentUser]);
    // console.log(currentUser)

// const {User} = currentUser;




  return (
    <>
    <Container>
        <img src={hello} alt='hello' />
        <h2>
            Welcome , <span> {currentUser.username}  !</span>
        </h2>
        <h3>Please select a chat to start a conversation</h3>


    </Container>



    </>
 
  )
}

export default Welcome

const Container =styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img{
    height: 100px;

}
span{
    color:#6fea36;
   
}
h2{
 font-size:3rem;
}
h3{
  font-size: 1.23rem;
}
`