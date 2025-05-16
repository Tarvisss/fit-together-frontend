import React from "react";
import ListChallenges from "../components/ChallengeCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToggleChallenge from "../customHooks/useToggleJoin";
import ApiHandler from "../Api/ApiHandlerClass";
import Card from 'react-bootstrap/Card';

import workoutPic1 from '../assets/3699912.jpg';
import workoutPic2 from '../assets/3644843.jpg';
import workoutPic3 from '../assets/6962031.jpg'

function ChallengeHome(){
    const [startingIds, setStartingIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [challengeIds, setChallengeIds] = useState([]);
    const [activeView, setActiveView] = useState("none"); 
    const [PinnedChallengeIds, setPinnedChallengeIds]= useState([]);
    //store all the challenges that a user has joined by the challenge id
    const navigate = useNavigate();
    

    // use effect here so that the challenge listings load only once when a user hits the route.
    useEffect(() => {
        const getChallenges = async () => {
            const challengeIds = await ApiHandler.FetchChallenges();
            setChallengeIds(challengeIds);
        }
        getChallenges();
    },[])

    useEffect(() => {
              const fetchPinned = async () => {
                try {
                  // get the user id from local storage to pass to the method getPinnedChallengeIds
                  const userData = JSON.parse(localStorage.getItem("userData"));
                  const pinned = await ApiHandler.getLikedChallenges(userData.userId);
                  // use map to loop through challenge ids and store them in pinned challenges
                  const pinnedIds = pinned.map(challenge => challenge.id);
                  setPinnedChallengeIds(pinnedIds)
                } catch (err) {
                  console.error("Failed to fetch pinned challenges", err);
                }
              };
            
              fetchPinned();
            }, []);

    //fetch all the challenges by challenge id that a user has joined
    useEffect(() => {
        const fetchJoinedChallenges = async () => {
          const userData = JSON.parse(localStorage.getItem("userData"));
          const userId = userData?.userId;
      
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
        <div className="container mt-5 p-1">
            <div className="container mt-5 p-2">
            <h1 className="text-center"> 🏃🏾‍♀️‍➡️Challenges🏋🏽‍♂️ </h1>
              <div className="d-flex justify-content-center m-4 gap-4 flex-wrap p-2">
                <Card 
                  style={{ width: '100%', maxWidth: "300px", cursor: 'pointer' }}
                  className="shadow-sm hover-shadow"
                  onClick={() => navigate('/challenges/create')}
                >
                  <Card.Img src={workoutPic1} />
                  <Card.Body>
                    <Card.Title className="text-center">Start a new challenge</Card.Title>
                  </Card.Body>
                </Card>

                <Card 
                  style={{ width: '100%', maxWidth: "300px", cursor: 'pointer' }}
                  className="shadow-sm hover-shadow shadow"
                  onClick={() => setActiveView("join")}
                >
                  <Card.Img src={workoutPic2} />
                  <Card.Body>
                    <Card.Title className="text-center">Join a challenge</Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div className="d-flex justify-content-center">
                <Card 
                    style={{ width: '100%', maxWidth: "300px", cursor: 'pointer' }}
                    className="shadow-sm hover-shadow shadow"
                    onClick={() => setActiveView("pinned")}
                  >
                    <Card.Img src={workoutPic3} />
                    <Card.Body>
                      <Card.Title className="text-center">Pinned challenges</Card.Title>
                    </Card.Body>
                  </Card>
              </div>   
            </div>

            {/* toggle between all challenges and pinned challenges */}
            {(activeView === "join" || activeView === "pinned") && (
                <ListChallenges 
                    challengeIds={
                        activeView === "pinned"
                          ? challengeIds.filter(ch => PinnedChallengeIds.includes(ch.id))
                          : challengeIds
                      }
                    joinedChallengeIds={joinedChallengeIds}
                    toggleChallenge={toggleChallenge}
                    
                />
            )}
        </div>
    );
      
}

export default ChallengeHome;