import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png'; 
import ApiHandler from "../Api/ApiHandlerClass";


function SingleChallengePage(){
    const { id } = useParams()
    const [challenge, setChallenge] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getChallenge = async () => {
            try {
                const challenge = await ApiHandler.FetchChallenge(id);
                setChallenge(challenge)  
            } catch (error) {
                console.error(error);
            }
            setLoading(false)
            
        }
        getChallenge();
    },[]);

    return (
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
                          {/* <Button variant="outline-primary" 
                          size="md" 
                          onClick={() => toggleChallenge(challenge.id)}>{joinedChallengeIds.includes(challenge.id) ? "Leave Challenge" : "Join Challenge"}</Button> */}
                      </div>

                    </Card.Body>
                  </Card>
                </div>
    )
}

export default SingleChallengePage;