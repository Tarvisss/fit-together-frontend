import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row} from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';


function UserSignUp(){
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    //initial form state
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [formState, setFormstate] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
        firstName: "",
        lastName: ""
    })

    

    //hanlder to update the form fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormstate(state => ({
            ...state, 
            [name]: value
        }));
    } 

    // handle image change
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    };

    //handle signup submission.
    const handleSignUp = async (e) => {
        e.preventDefault();
        const { username, password, passwordCheck, email, firstName, lastName } = formState;
      
        try {

          if(password !== passwordCheck){
            throw new Error("Passwords must match");

          }
          // Since I'm uploading an image (binary data) along with text fields,
          // I need to use FormData instead of JSON.
          // FormData allows me to send both types of data (text + file)
          // in a single multipart/form-data request, which the backend can parse.
          const formData = new FormData();
          formData.append("username", username);
          formData.append("password", password);
          formData.append("email", email);
          formData.append("first_name", firstName);
          formData.append("last_name", lastName);

          if (profileImage) {
          formData.append("image", profileImage);
          }

          const signupResponse = await ApiHandler.SignUp(formData);
          console.log("Signup response:", signupResponse);
          if (signupResponse) {
            login(signupResponse.token);
            navigate('/'); // success, go to homepage
          }
        } catch (error) {
          console.log("Caught error in handleSignUp:", error);

          const serverMessage = error.message || "Signup failed.";
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

                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && <img src={preview} alt="Preview" className="mt-2" width="100" />}
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