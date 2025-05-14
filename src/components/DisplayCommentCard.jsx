import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import { Container, Row, FloatingLabel } from "react-bootstrap";
import profilePic from "../assets/png-clipart-wall-decal-sticker-bodybuilding-fitness-centre-bodybuilding-physical-fitness-hand (1).png";

function DisplayCommentCard() {

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="p-3 border rounded shadow" src={profilePic} style={{ width: "100%", maxWidth: "600px" }}>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-1" controlId="formGriduserPic">
                <Col xs={3} md={4}>
                  <Image src={profilePic} roundedCircle style={{ maxWidth: "100%", width: "70px", boxShadow: "0 0 2px " }} />
                </Col>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridCommentDisplay">
              <FloatingLabel label="Leave a comment.">
                
              </FloatingLabel>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default DisplayCommentCard;
