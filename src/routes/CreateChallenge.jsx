import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row, FloatingLabel} from "react-bootstrap";
import ApiHandler from '../Api/ApiHandlerClass';


function CreateChallenge(){
    const navigate = useNavigate();

    //initial form state
    const [formState, setFormstate] = useState({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
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

    //handle new challenge submission.
    const newChallenge = async (e) => {
        e.preventDefault();
        const { title, description, start_date, end_date } = formState;
      
        try {

          if(!user){
            throw new Error("Must be logged in to create a challenge");

          }

          const response = await ApiHandler.AddChallenge(title, description, start_date, end_date, created_at, creator_id);
      
          if (response) {
            navigate('/'); // success, go to homepage
          }
        } catch (err) {
          console.log("Caught error in AddChallenge:", err);

          const serverMessage = err.message || "failed to create the challenge.";
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
              <Form >
                <Row className='mb-3'>
                <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formState.title} placeholder="Enter title" onChange={handleChange} />
                  </Form.Group>
               
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Start</Form.Label>
                    <Form.Control type="datetime-local" name="start" value={formState.start_date} placeholder="Start" onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>End</Form.Label>
                    <Form.Control type="password" name="password" value={formState.end_date} placeholder="End" onChange={handleChange} />
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
                  <FloatingLabel controlId="floatingTextarea2" label="Describe your challenge.">
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

export default CreateChallenge;