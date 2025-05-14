import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png'; 
import ApiHandler from "../Api/ApiHandlerClass";
import NewComment from "./NewComment";


function SingleChallengePage(){
   const navigate = useNavigate();
    const { id } = useParams()
    const [challenge, setChallenge] = useState({});
    const [comments, setComments] = useState({})
    const [toggleCommentWindow, setToggleCommentWindow] = useState(false);
    const [toggleComments, setToggleComments] = useState(false)
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
    },[id]);

    useEffect(() => {
        const getComments = async () => {
            try {
                const comments = await ApiHandler.fetchComments(id);
                setComments(comments);
            } catch (error) {
                console.error(error);
            }
        }
        getComments();
    },[id])

    return (
        <div className=" d-flex flex-column justify-content-center m-3" key={challenge.id}>
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
                                  // navigate to the page for the challenge
                                  onClick={() => setToggleCommentWindow(prev => !prev)}
                                >
                                  {toggleCommentWindow ? "Hide comment window" : "leave a comment"}
                                </Button>
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
                          onClick={() => {navigate("/challenges/home")}}>
                            Back to challenges
                          </Button>
                      </div>
                    </Card.Body>
                  </Card>
                {toggleCommentWindow && (
                  <div className="mt-3">
                    <NewComment />
                  </div>
                )}
                {toggleComments && (
                  <div className="mt-3">
                    <NewComment />
                  </div>
                )}
         </div>
    )
}

export default SingleChallengePage;