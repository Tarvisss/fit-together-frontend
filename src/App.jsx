
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
import UserProfile from './routes/UserProfile';
import ProtectedRoutes from './components/ProtectedRoutes';
import SingleChallengePage from './routes/SingleChallengePage';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Wrap everything inside a layout route with Navigation */}
          <Route path="/" element={<Navigation />}>
            <Route index element={<Homepage />} />
            <Route path="auth/register" element={<UserSignUp />} />
            <Route path="auth/login" element={<UserLogin />} />
        
            {/* Protected routes nested inside */}
            <Route element={<ProtectedRoutes />}>
              <Route path="challenges/create" element={<CreateChallenge />} />
              <Route path="challenges/:id/edit" element={<EditChallenge />} />
              <Route path="challenges/home" element={<ChallengeHome />} />
              <Route path="challenges/:id" element={<SingleChallengePage />} />
              <Route path="user/:username" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
