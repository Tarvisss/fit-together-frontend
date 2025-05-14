import React from "react";
import ListChallenges from "../components/ListChallenges";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToggleChallenge from "../customHooks/useToggleJoin";
import ApiHandler from "../Api/ApiHandlerClass";
import Card from 'react-bootstrap/Card';

import workoutPic1 from '../assets/3699912.jpg';
import workoutPic2 from '../assets/3644843.jpg';

function ChallengeHome(){
    const [startingIds, setStartingIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([])
    const [showChallenges, setShowChallenges] = useState(false)
    //store all the challenges that a user has joined by the challenge id
    const navigate = useNavigate();
    

    // use effect here so that the challenge listings load only once when a user hits the route.
    useEffect(() => {
        const getChallenges = async () => {
            const challenges = await ApiHandler.FetchChallenges();
            setChallenges(challenges);
        }
        getChallenges();
    },[])
    //fetch all the challenges by challenge id that a user has joined
    useEffect(() => {
        const fetchJoinedChallenges = async () => {
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user?.userId;
      
          if (userId) {
            const joined = await ApiHandler.getJoinedChallengeIds(userId); 
            setStartingIds(joined); // should be array of challenge IDs
          }
          setLoading(false)
        };
      
        fetchJoinedChallenges();
      }, []);

      //toggle joining a challenge
      const { joinedChallengeIds, toggleChallenge } = useToggleChallenge(startingIds);

      

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
                <ListChallenges 
                    challenges={challenges}
                    joinedChallengeIds={joinedChallengeIds}
                    toggleChallenge={toggleChallenge}
                    showChallenges={showChallenges}
                />
            )}
        </div>
    );
      
}

export default ChallengeHome;