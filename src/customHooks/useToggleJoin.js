import ApiHandler from "../Api/ApiHandlerClass";
import { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

    // This hook uses the user stored in context. after much frustration I chose to 
    // use local storage for aquiring ids and the liked
    // take array of challenge ids that a user has joined
    const useToggleChallenge =  (initialJoinedIds = []) => {
        const [joinedChallengeIds, setJoinedChallengeIds] = useState(initialJoinedIds)
        const { user } = useContext(AuthContext)

        // each time initialJoinedIds changes this useEffect will run 
        useEffect(() => {
            //callback takes current state and return the new state
            setJoinedChallengeIds((prev) => {
              
              const areIdsTheSame =
                    //check if lengths match and if every id is in initialJoinedIds
                prev.length === initialJoinedIds.length &&
                prev.every(id => initialJoinedIds.includes(id));
              // if the two arrays are the same return prev, if different, return the new array
              return areIdsTheSame ? prev : initialJoinedIds;
            });
          }, [initialJoinedIds]);
        
        const toggleChallenge = useCallback(async (challengeId) => {
            const userId = user.userId;

            if(!userId) return;
        
            if (joinedChallengeIds.includes(challengeId)) {
                try {
                  await ApiHandler.leaveChallenge(challengeId, userId);
                  setJoinedChallengeIds(prev => prev.filter(id => id !== challengeId));
                } catch (error) {
                  console.error("Error leaving challenge:", error);
                }
              } else {
                try {
                  await ApiHandler.joinChallenge(challengeId, userId);
                  setJoinedChallengeIds(prev => [...prev, challengeId]);
                } catch (error) {
                  console.error("Error joining challenge:", error);
                }
              }
            }, [joinedChallengeIds]);
            // Make these two things available to any component that uses this hook
            return { joinedChallengeIds, toggleChallenge };
          };
    export default useToggleChallenge;