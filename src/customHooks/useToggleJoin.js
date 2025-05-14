import ApiHandler from "../Api/ApiHandlerClass";
import { useState, useCallback, useEffect } from "react";


      const useToggleChallenge =  (initialJoinedIds = []) => {

        useEffect(() => {
            setJoinedChallengeIds((prev) => {
              // Avoid re-setting if the values are already equal
              const same =
                prev.length === initialJoinedIds.length &&
                prev.every(id => initialJoinedIds.includes(id));
              return same ? prev : initialJoinedIds;
            });
          }, [initialJoinedIds]);
          
        const [joinedChallengeIds, setJoinedChallengeIds] = useState(initialJoinedIds)

        const toggleChallenge = useCallback(async (challengeId) => {

            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user.userId;

            if(!userId) return;
      
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
            }, [joinedChallengeIds]);
          
            return { joinedChallengeIds, toggleChallenge };
          };

      export default useToggleChallenge;