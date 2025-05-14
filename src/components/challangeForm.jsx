import React from "react";

//reactStrap imports
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Row, FloatingLabel} from "react-bootstrap";
// form for creating and editing a challenge
// destucture the incoming props from create and edit challenge
function ChallengeForm({ formState, handleChange, newChallenge, errorMessage, onSubmit}){
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
             <div className="p-3 border rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
            

            {/* display error messages to the user */}
                {errorMessage && (
                    <div className="alert alert-danger text-center" role="alert">
                        {errorMessage}
                    </div>
                )}
              <Form onSubmit={onSubmit}>
                <Row className='mb-3'>
                <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formState.title} placeholder="Enter title" onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridStart">
                    <Form.Label>Start</Form.Label>
                    <Form.Control type="datetime-local" name="start_date" value={formState.start_date} placeholder="Start" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEnd">
                    <Form.Label>End</Form.Label>
                    <Form.Control type="datetime-local" name="end_date" value={formState.end_date} placeholder="End" onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Form.Group as={Col} className='mb-3' controlId="formGridDescription">
                <FloatingLabel label="Describe your challenge.">
                    <Form.Control 
                      name='description'
                      value={formState.description}
                      onChange={handleChange}
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

        </>
    )
}

export default ChallengeForm;