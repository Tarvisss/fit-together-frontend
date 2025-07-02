import React, { useState, useEffect } from "react";
import ApiHandler from "../Api/ApiHandlerClass";
import { useNavigate } from "react-router-dom";
import { faThumbtackSlash, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button } from 'react-bootstrap';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png'; 

// Destructure props with default values to avoid runtime errors
// If toggleChallenge isn't passed by the parent, default to a no-op function (() => {})
// This prevents "undefined is not a function" errors when the button calls toggleChallenge
function ListChallenges({
    challengeIds = [], 
    joinedChallengeIds = [], 
    toggleChallenge = () => {}
    }) {

  const [likedChallengeIds, setLikedChallengeIds] = useState([]);
  const navigate = useNavigate();
  // get all challenges by id that a user has liked, 
  useEffect(() => {
          const fetchPinned = async () => {
            try {
              // get the user id from local storage to pass to the method getLikedChallenges
              const userData = JSON.parse(localStorage.getItem("userData"));
              const liked = await ApiHandler.getLikedChallenges(userData.userId);
              // use map to loop through challenge ids and store them in liked challenges
              const likedIds = liked.map(challenge => challenge.id);
              setLikedChallengeIds(likedIds)
            } catch (error) {
              console.error("Failed to fetch liked challenges", error);
            }
          };
        
          fetchPinned();
        }, []);
  // This function toggles the like status of a challenge (like or unlike)
const handleLike = async (challengeId) => {
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLiked = likedChallengeIds.includes(challengeId);

  try {
    if (isLiked) {
      // If the challenge is already liked, send a request to remove the like
      // Then update state by filtering out the unliked challenge ID
      await ApiHandler.removeLike(challengeId, userData.userId); // unlike
      setLikedChallengeIds((prev) => prev.filter(id => id !== challengeId));
    } else {
      // If the challenge is not yet liked, send a request to add the like
      // Then update state by appending the new challenge ID to the list
      await ApiHandler.addLike(challengeId, userData.userId); // like
      setLikedChallengeIds((prev) => [...prev, challengeId]);
    }
  } catch (error) {
    console.error("Failed to toggle like", error.message);
  }
};

  return (
  <div>    
      {/* use state to only display the challenges if a user clicks on the card */}
        <div className=" justify-content-center g-4">
          {challengeIds.length > 0 ? (
            challengeIds.map((challenge) => (
              <div className=" d-flex justify-content-center m-4" key={challenge.id}>
                <Card  className="border shadow" style={{ width: '100%', maxWidth: '800px', padding: "5px" }}>
                  <div style={{ position: 'relative' }}>
                      <Card.Img
                        src={challengeImg}
                        style={{ height: "125px", objectFit: "cover" }}
                      />
                      <FontAwesomeIcon 
                      // check if the id is in the liked challenges array
                      icon={likedChallengeIds.includes(challenge.id) ? faThumbtackSlash : faThumbtack}
                      className="thumbs-up-icon"
                      onClick={() => handleLike(challenge.id)}/>
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
                              // navigate to the page for the challenge
                              onClick={() => navigate(`/challenges/${challenge.id}`)}>Go to Challenge</Button>
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
                        //because react expects the fuction to be passed as a referance to be called leter you cant call the function 
                        //without using an arrow function. react would trigger the function immediately
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