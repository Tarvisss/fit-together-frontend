import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss'
import Navigation from "./routes/Navigation"
import UserSignUp from './routes/SignUp';
import UserLogin from './routes/Login';
import Homepage from './routes/Home';
import CreateChallenge from './routes/CreateChallenge';
import EditChallenge from './routes/EditChallenge';
import ChallengeHome from './routes/challengeHome';
function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation/>
          <Routes>
            <Route path='auth/register' element={<UserSignUp/>}/>
            <Route path='auth/login' element={<UserLogin/>}/>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/challenges/create' element={<CreateChallenge/>}/>
            <Route path='/challenges/:id/edit' element={<EditChallenge/>}/>
            <Route path='/challenges/home' element={<ChallengeHome/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
