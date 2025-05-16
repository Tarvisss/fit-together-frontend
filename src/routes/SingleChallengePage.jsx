import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faThumbsUp, faThumbtack, faThumbtackSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button } from 'react-bootstrap';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png'; 
import ApiHandler from "../Api/ApiHandlerClass";
import NewComment from "./NewComment";
import DisplayCommentCard from "../components/DisplayCommentCard";


function SingleChallengePage(){
    const navigate = useNavigate();
    const { id } = useParams()
    const [challenge, setChallenge] = useState({});
    const [comments, setComments] = useState([])
    const [toggleCommentWindow, setToggleCommentWindow] = useState(false);
    const [toggleComments, setToggleComments] = useState(true)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    // get a single challenge and display it for commenting
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

    // fetch all the comments for a challenge
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
    
    useEffect(() => {
        const checkIfLiked = async () => {
          try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const likedChallenges = await ApiHandler.getLikedChallenges(userData.userId);
            const likedIds = likedChallenges.map(c => c.id);
            setLiked(likedIds.includes(parseInt(id)));
          } catch (err) {
            console.error("Failed to fetch liked challenges", err);
          }
        };
      
        checkIfLiked();
      }, [id]);
      
    //wait until comments render
    if (comments.length === 0) {
        return <p>Loading comments...</p>;
      }
    
    // after submitting a comment, fetch the comments again to include the latest comment  
    const addComment =  async (NewComment) => {
        const updatedComments = await ApiHandler.fetchComments(id);
        setComments(updatedComments);
    };

    const handleLike = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        try {
          if (liked) {
            await ApiHandler.removeLike(challenge.id, userData.userId);  // unlike
          } else {
            await ApiHandler.addLike(challenge.id, userData.userId );     // like
          }
          setLiked(!liked);  // toggle UI state
        } catch (error) {
          console.error("Failed to toggle like", error.message);
        }
      };
      
    return (
        <div className="d-flex flex-column align-items-center justify-content-center m-3" key={challenge.id}>
            <Card className="border shadow" style={{ width: '100%', maxWidth: '800px', padding: "5px" }}>
              {/* Wrapper to position icon over image */}
              <div style={{ position: 'relative' }}>
                <Card.Img
                  variant="top"
                  src={challengeImg}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <FontAwesomeIcon 
                icon={liked ? faThumbtackSlash : faThumbtack}
                className="thumbs-up-icon"
                onClick={handleLike}/>
              </div>
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
                    <div className="mt-3 d-flex justify-content-center w-100">
                      <div style={{ width: '100%', maxWidth: '800px' }}>
                        <NewComment addComment={addComment} />
                      </div>
                    </div>
                  )}
                        
                    <div className=" mt-3 d-flex justify-content-center w-100 ">
                                <Button 
                                  className=" border shadow"
                                  style={{ width: '100%', maxWidth: '600px' }} 
                                  size="lg"
                                  onClick={() => setToggleComments(prev => !prev)}
                                >
                                  {toggleComments ? "Hide comments" : "Show comments"}
                                </Button>
                            </div>
                {toggleComments && (
                    comments.length > 0 ? (
                        comments.map((comment) => (
                            <DisplayCommentCard key={comment.id} comment={comment}/>
                        ))
                    ) : (
                        <h3 className="text-center m-5">No comments yet 😞</h3>
                  )
                )}
        </div>
    )
}

export default SingleChallengePage;