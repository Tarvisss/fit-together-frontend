import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, FloatingLabel } from "react-bootstrap";

function CreateCommentComponent({ handleChange, formState, onSubmit }) {

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center mt-2">
        <div className="p-3 border rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
          <Form onSubmit={onSubmit}>
            <Form.Group as={Col}  controlId="formGridComment">
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
