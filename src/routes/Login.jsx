import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row } from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';


function UserLogin(){
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);

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

    //handle signup submission.
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
          </div>
        </Container>
    )
}

export default UserLogin;