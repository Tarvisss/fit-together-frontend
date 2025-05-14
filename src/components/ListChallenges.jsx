import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png'; 

function ListChallenges({challenges = [], joinedChallengeIds = [], toggleChallenge = () => {}}) {
const navigate = useNavigate();
    return (
    <div>    
        {/* use state to only display the challenges if a user clicks on the card */}
        
          <div className=" justify-content-center g-4">
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <div className=" d-flex justify-content-center m-4" key={challenge.id}>
                  <Card  className="border shadow" style={{ width: '100%', maxWidth: '800px', padding: "5px" }}>
                    <Card.Img variant="top" src={challengeImg} style={{ height: "150px", objectFit: "cover" }} />
                    <Card.Body>
                        <div className="d-flex">
                          <div>
                            <Card.Title>{challenge.title}</Card.Title>
                            <Card.Text>{challenge.description}</Card.Text>
                        </div>  
                            <div className="ms-auto">
                                <Button 
                                className=" border shadow" 
                                size="md"
                                onClick={navigate("/")}>Go to Challenge</Button>
                            </div>
                        </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                          <Card.Text className="mb-0"><b>Start: </b> 
                            {new Date(challenge.start_date).toLocaleString(undefined, 
                                {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                })}</Card.Text>
                          <Card.Text className="mb-0"><b>End: </b>
                          {new Date(challenge.end_date).toLocaleString(undefined, 
                                {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                })}
                            </Card.Text>
                          <Button variant="outline-primary" 
                          size="md" 
                          onClick={() => toggleChallenge(challenge.id)}>{joinedChallengeIds.includes(challenge.id) ? "Leave Challenge" : "Join Challenge"}</Button>
                      </div>

                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No Challenges</p>
            )}
          </div>
        </div>
    )
}

export default ListChallenges;