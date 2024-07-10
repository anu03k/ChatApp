
import './App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/chat'
import SetAvatar from './pages/SetAvatar'
import Contacts from './components/Contacts'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register'  element={<Register />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/'  element={<Chat />} />
      <Route path='/SetAvatar'  element={<SetAvatar />} />
      {/* <Route path='/contscts' element={<Contacts />} /> */}

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
