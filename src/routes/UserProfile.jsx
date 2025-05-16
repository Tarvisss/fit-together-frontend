import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToggleChallenge from "../customHooks/useToggleJoin";
import ApiHandler from "../Api/ApiHandlerClass";
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import fallbackProfilePic from "../assets/png-clipart-wall-decal-sticker-bodybuilding-fitness-centre-bodybuilding-physical-fitness-hand (1).png";
import userBackground from "../assets/SL-020620-27800-36.png";
import workoutPic1 from '../assets/3699912.jpg';
import workoutPic2 from '../assets/3644843.jpg';
import ListChallenges from "../components/ChallengeCard";
const BASE_URL = "http://localhost:3000";
const fallbackQuote = "You are free, and that is why you are lost.";
const fallbackQuoteAuthor = "Franz Kafka";

function UserProfile() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [userChallenges, setUserChallenges] = useState([]);
    const [createdChallenges, setCreatedChallenges] = useState([]);
    const [showChallenges, setShowChallenges] = useState(false);
    const [quote, setQuote] = useState(fallbackQuote);
    const [quoteAuthor, setQuoteAuthor] = useState(fallbackQuoteAuthor);
    

    useEffect(() => {
      const fetchJoinedChallenges = async () => {
        try {
        const userData = JSON.parse(localStorage.getItem("userData"));
    
        setUser(userData);

        const userId = userData?.userId;

        if (userId) {
          const joined = await ApiHandler.getUserJoinedChallenges(userId);
          setUserChallenges(joined);
        }

        } catch (err) {
          console.error("Failed to fetch joined challenges:", err);
        }
      };
      fetchJoinedChallenges();
    }, []);

    const { joinedChallengeIds, toggleChallenge } = useToggleChallenge(
      userChallenges.map(c => c.id)
    );

    // Wrapper function: handles the join/leave and also updates local state
    const handleToggleChallenge = async (challengeId) => {
      await toggleChallenge(challengeId);
    
      // Remove from local state if the user left the challenge
      setUserChallenges(prev => prev.filter(ch => ch.id !== challengeId));
    };

    useEffect(() => {
      const fetchQuote = async () => {
        try {
          const url = "http://localhost:3000/api/quote";
          const data = await ApiHandler.getQuote(url);

          if (data) {
            const quote = data[0].q;
            const quoteAuthor = data[0].a;
            setQuote(quote);
            setQuoteAuthor(quoteAuthor);
          }
        } catch (error) {
        
        }
      };

      fetchQuote();
    }, []);

    return (
      <>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <Card style={{ width: '100%', maxWidth: '800px' }}>
            <div style={{ position: 'relative' }}>
              <Image
                src={userBackground}
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  color: "white",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)"
                }}
              >
                <Image
                  src={user?.profilePic ? `${BASE_URL}${user?.profilePic}` : fallbackProfilePic}
                  roundedCircle
                  style={{
                    width: "200px",
                    height: "180px",
                    border: "1px solid white",
                    boxShadow: "4px 4px 10px rgba(0,0,0,0.3)"
                  }}
                />
                <div>
                  <h5 style={{ color: "black", marginLeft: "65px" }}>"{quote}"</h5>
                  <h5 style={{ color: "black", marginLeft: "140px", marginTop: "25px" }}>"{quoteAuthor}"</h5>
                </div>
              </div>
            </div>

            <Card.Body>
              <hr />
              <Card.Title>Wellcome: <b>{user?.username}</b></Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>

            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">Leaderboards</Button>
              <Button variant="primary">Liked challenges</Button>
              <Button onClick={() => navigate('/challenges/home')} variant="secondary">All Challenges</Button>
            </ButtonGroup>
          </Card>
        </div>

        <div className="container mt-5">
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
                <Card.Title className="text-center">Joined challenges</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>

        {showChallenges && (
          <ListChallenges
            challengeIds={userChallenges}
            joinedChallengeIds={joinedChallengeIds}
            toggleChallenge={handleToggleChallenge}
            showChallenges={showChallenges}
          />
        )}
      </>
  );
}

export default UserProfile;
