import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row } from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';
import { useGoogleLogin } from '@react-oauth/google';
import googleIcon from "/home/tarvis/Documents/software_projects/fit+together-v2/frontend/src/assets/icons8-google-32.png"


function UserLogin(){
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    //initial form state
    const [formState, setFormstate] = useState({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("");

    //hanlder to update the form fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormstate(state => ({
            ...state, 
            [name]: value
        }));
    }   

    //handle Login submission.
    const handleLogin = async (e) => {
        e.preventDefault(); // prevent default form submission behavior
        const { username, password } = formState;
      
        try {

          const signupResponse = await ApiHandler.Login(username, password);
      
          if (signupResponse) {
            login(signupResponse);
            navigate('/'); // success, go to homepage
          }
        } catch (error) {
          console.log("Caught error in handle Login:", error);

          const serverMessage = error.message || "Login failed.";
          setErrorMessage(serverMessage);   
        }
      };

          // Google Sign-In success handler
 const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const loginResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ access_token: tokenResponse.access_token })
                });

                const data = await loginResponse.json();
                if (data.authToken) {
                    login(data.authToken);
                    navigate('/');
                } else {
                    setErrorMessage('Google Sign-In failed');
                }
            } catch (error) {
                console.error('Google sign-in error:', error);
                setErrorMessage('Error during Google Sign-In');
            }
        },
        onError: () => {
            setErrorMessage("Google Sign-In failed");
        }
    });

      
    return (
        
        <Container className="  d-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="p-3 border rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
            <h2 className="text-center">Login</h2>
            
            {/* display error messages to the user */}
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
                )}
              <Form onSubmit={handleLogin}>
                <Row className='mb-3'>
                <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formState.username} placeholder="Enter Username" onChange={handleChange} />
                  </Form.Group>
               
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formState.password} placeholder="Password" onChange={handleChange} />
                  </Form.Group>
                </Row>

              <div className="d-grid gap-2">
                <Button className="justify-content-center align-items-center" variant="outline-primary" size="lg" type="submit">
                  Submit
                </Button>
              </div>
              </Form>
              <hr/>
                {/* Google Sign-In Button */}
               <div className="d-grid gap-2">
                    <Button
                        className="justify-content-center align-items-center" 
                        variant="outline-primary" 
                        type="submit"
                        width="100%"
                        onClick={googleLogin}
                    >
                        <span>
                            <img src={googleIcon} alt="" height="20px" width="20px"/>
                        </span>
                        Sign up with Google
                    </Button>
                </div>
          </div>
        </Container>
    )
}

export default UserLogin;