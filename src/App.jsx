import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUp from './routes/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='auth/register' element={<UserSignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
