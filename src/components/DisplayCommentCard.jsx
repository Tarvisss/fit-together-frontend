import React from "react";
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import { Container, Row } from "react-bootstrap";
import fallbackProfilePic from "../assets/png-clipart-wall-decal-sticker-bodybuilding-fitness-centre-bodybuilding-physical-fitness-hand (1).png";


function DisplayCommentCard({ comment }) {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const username = comment?.users?.username || "Anonymous";
    const profilePic = comment?.users?.imageUrl ? `${BASE_URL}${comment.users.imageUrl}` : fallbackProfilePic
  return (
    <Container className="d-flex justify-content-center align-items-center mt-3">
      <div
        className="p-3 border rounded shadow w-100"
        style={{
          maxWidth: "600px",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        <Row>
          <Col xs={3} md={2} className="d-flex justify-content-center">
            <Image
              src={profilePic}
              roundedCircle
              style={{ width: "60px", height: "60px", objectFit: "cover", boxShadow: "0 0 2px" }}
            />
          </Col>

          <Col xs={9} md={10}>
            <div className="d-flex justify-content-between">
              <h5><b>{username}</b> : commented</h5>
              <small className="text-muted">
                {new Date(comment.created_at).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </small>
            </div>
            
            <div style={{ marginTop: "4px", fontSize: "1.1rem", lineHeight: "1.6",}}>
              {comment.content}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default DisplayCommentCard;
