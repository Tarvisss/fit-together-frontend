import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiHandler from "../Api/ApiHandlerClass";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import challengeImg from '../assets/abstract-yellow-smooth-wave-lines.png';
import workoutPic1 from '../assets/3699912.jpg';
import workoutPic2 from '../assets/3644843.jpg';

function ChallengeHome(){

    const [challenges, setChallenges] = useState([])
    const [showChallenges, setShowChallenges] = useState(false)
    const [joinedChallengeIds, setJoinedChallengeIds] = useState([])
    const navigate = useNavigate();
    

    // use effect here so that the challenge listings load only once when a user hits the route.
    useEffect(() => {
        const getChallenges = async () => {
            const challenges = await ApiHandler.FetchChallenges();
            setChallenges(challenges);
        }
        getChallenges();
    },[])

    useEffect(() => {
        const fetchJoinedChallenges = async () => {
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user?.userId;
      
          if (userId) {
            const joined = await ApiHandler.getJoinedChallengeIds(userId); // new method you'll add
            setJoinedChallengeIds(joined); // should be array of challenge IDs
          }
        };
      
        fetchJoinedChallenges();
      }, []);
      
      const toggleChallenge = async (challengeId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
      
        if (joinedChallengeIds.includes(challengeId)) {
          try {
            await ApiHandler.leaveChallenge(challengeId, userId);
            setJoinedChallengeIds(prev => prev.filter(id => id !== challengeId));
          } catch (err) {
            console.error("Error leaving challenge:", err);
          }
        } else {
          try {
            await ApiHandler.joinChallenge(challengeId, userId);
            setJoinedChallengeIds(prev => [...prev, challengeId]);
          } catch (err) {
            console.error("Error joining challenge:", err);
          }
        }
      };
      

    return (
        <div className="container mt-5">
            <div className="container mt-5">
            <h1 className="text-center"> 🏃🏾‍♀️‍➡️Challenges🏋🏽‍♂️ </h1>
              <div className="d-flex justify-content-center m-4 gap-4 flex-wrap">
                <Card 
                  style={{ width: '100%', maxWidth: "300px", cursor: 'pointer' }}
                  className="shadow-sm hover-shadow"
                  onClick={() => navigate('/challenges/create')}
                >
                  <Card.Img variant="top" src={workoutPic1} />
                  <Card.Body>
                    <Card.Title className="text-center">Start a new challenge</Card.Title>
                  </Card.Body>
                </Card>

                <Card 
                  style={{ width: '100%', maxWidth: "300px", cursor: 'pointer' }}
                  className="shadow-sm hover-shadow shadow"
                  onClick={() => setShowChallenges(true)}
                >
                  <Card.Img variant="top" src={workoutPic2} />
                  <Card.Body>
                    <Card.Title className="text-center">Join a challenge</Card.Title>
                  </Card.Body>
                </Card>
                
              </div>
            </div>

    {/* use state to only display the challenges if a user clicks on the card */}
    {showChallenges && (
        <>
          
          <div className=" justify-content-center g-4">
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <div className=" d-flex justify-content-center m-4" key={challenge.id}>
                  <Card  className="border shadow" style={{ width: '100%', maxWidth: '680px', padding: "5px" }}>
                    <Card.Img variant="top" src={challengeImg} style={{ height: "150px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title>{challenge.title}</Card.Title>
                      <Card.Text>{challenge.description}</Card.Text>
                      
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
                        //   disabled={joinedChallengeIds.includes(challenge.id)}
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
          </>
         )}
        </div>
      );
      
}

export default ChallengeHome;