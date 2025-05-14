import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import { Container, Row, FloatingLabel } from "react-bootstrap";
import profilePic from "../assets/png-clipart-wall-decal-sticker-bodybuilding-fitness-centre-bodybuilding-physical-fitness-hand (1).png";

function CreateCommentComponent({ handleChange, formState, onSubmit }) {

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="p-3 border rounded shadow" src={profilePic} style={{ width: "100%", maxWidth: "600px" }}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-1" controlId="formGriduserPic">
                <Col xs={3} md={4}>
                  <Image src={profilePic} roundedCircle style={{ maxWidth: "100%", width: "70px", boxShadow: "0 0 2px " }} />
                </Col>
              </Form.Group>
            </Row>
            <Form.Group as={Col} className='' controlId="formGridComment">
              <FloatingLabel label="Leave a comment.">
                <Form.Control
                  name="content"
                  value={formState.content || ""}
                  onChange={handleChange}
                  as="textarea"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="justify-content-center align-items-center" variant="outline-primary" type="submit">
                Comment
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default CreateCommentComponent;
