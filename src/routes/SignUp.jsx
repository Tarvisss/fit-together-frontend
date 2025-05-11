import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row, FloatingLabel} from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';


function UserSignUp(){
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    //initial form state
    const [formState, setFormstate] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
        firstName: "",
        lastName: ""
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
    const handleSignUp = async (e) => {
        e.preventDefault();
        const { username, password, passwordCheck, email, firstName, lastName } = formState;
      
        try {

          if(password !== passwordCheck){
            throw new Error("Passwords must match");

          }

          const signupResponse = await ApiHandler.SignUp(username, password, email, firstName, lastName);
          console.log("Signup response:", signupResponse);
          if (signupResponse) {
            login(signupResponse);
            navigate('/'); // success, go to homepage
          }
        } catch (err) {
          console.log("Caught error in handleSignUp:", err);

          const serverMessage = err.message || "Signup failed.";
          setErrorMessage(serverMessage);   
        }
      };


      
    return (
        
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="p-3 border rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
            <h2 className="text-center">Sign Up</h2>

            {/* display error messages to the user */}
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
)}
              <Form onSubmit={handleSignUp}>
                <Row className='mb-3'>
                <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formState.username} placeholder="Enter Username" onChange={handleChange} />
                  </Form.Group>
               
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formState.email} placeholder="Enter email" onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formState.password} placeholder="Password" onChange={handleChange} />
                  </Form.Group>
                
                  <Form.Group as={Col} controlId="formGridPasswordCheck">
                    <Form.Label>Re-enter password</Form.Label>
                    <Form.Control type="password" name="passwordCheck" value={formState.passwordCheck} placeholder="Re-enter password" onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' name="firstName" value={formState.firstName} placeholder="John" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' name="lastName" value={formState.lastName} placeholder="Doe"  onChange={handleChange} />
                  </Form.Group>
                </Row>

                  <Form.Group as={Col} controlId="formGridCity">
                  <FloatingLabel controlId="floatingTextarea2" label="Tell us about yourself.">
                      <Form.Control
                        as="textarea"
                        style={{ height: '150px' }}
                      />
                      </FloatingLabel>
                  </Form.Group>
              <div className="d-grid gap-2">
                <Button className="justify-content-center align-items-center" variant="outline-primary" type="submit">
                  Submit
                </Button>
              </div>
              </Form>
          </div>
        </Container>
    )
}

export default UserSignUp;