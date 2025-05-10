import React from "react";
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import { Container} from "react-bootstrap";
import challengePic from "../assets/2290.png";
import encouragePic from "../assets/3409687.png"
import leaderboardPic from "../assets/1911.i203.018..golden silver bronze ribbon laurel wreath emblems realistic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

function Homepage(){
    return (
        <div className="min-vh-100 d-flex justify-content-center pt-3">
          <div style={{ width: "80%", maxWidth: "800px" }}>  
            <Container className="text-center" style={{ marginTop: "10vh", width: "80%", maxWidth: "600px" }}>   
                <h1 className="text-center mb-4">Lets get you moving.🏃‍➡️</h1> 
                <hr />
              <Carousel fade className="text-center rounded shadow"
              nextIcon={<span className="custom-next"><FontAwesomeIcon icon={faCircleArrowRight} /></span>}
              prevIcon={<span className="custom-prev"><FontAwesomeIcon icon={faCircleArrowLeft} /></span>}
              >
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={challengePic}
                    alt="First slide"
                    style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                  />
                  <Carousel.Caption className="text-black">
                    <h2>Create Challenges</h2>
                    <h4><b>Choose from a our various challenges or create your own.</b></h4>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={encouragePic}
                    alt="Second slide"
                    style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                  />
                  <Carousel.Caption className="text-black shadow-md">
                    <h2>Encourage others</h2>
                    <h4><b>Cheer others on in the comment section!</b></h4>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={leaderboardPic}
                    alt="Third slide"
                    style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                  />
                  <Carousel.Caption className="text-white">
                    <h2>Push Yourself</h2>
                    <h4>
                      <b>Check the leaderboards to see how you stack up..</b>
                    </h4>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
             </Container>

              <Container className="text-center mt-4 pt-2px-5" style={{ width: "80%", maxWidth: "600px" }}>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link href="/auth/register"><b>Sign Up</b></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/auth/login"><b>Login</b></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Container>
            </div>
         </div>    
        );
}

export default Homepage;