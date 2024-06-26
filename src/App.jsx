
import './App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/chat'
import SetAvatar from './pages/SetAvatar'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register'  element={<Register />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/chat'  element={<Chat />} />
      <Route path='/SetAvatar'  element={<SetAvatar />} />

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
