import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeForm from '../components/challangeForm';
import ApiHandler from '../Api/ApiHandlerClass';
import { AuthContext } from '../context/AuthContext';

function CreateChallenge(){
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    //initial form state
    const [formState, setFormstate] = useState({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
    })
    const [errorMessage, setErrorMessage] = useState("");

    //hanlder to update the form fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormstate(state => ({
            ...state, 
            [name]: value
        }));
    }   

    //handle new challenge submission.
    const newChallenge = async (e) => {
        e.preventDefault();
        const { title, description, start_date, end_date } = formState;
      
        try {

          const created_at = new Date().toISOString(); // Set created_at to current timestamp
          const creator_id = user.userId;
          console.log(creator_id)

          if (!creator_id) {
            throw new Error("Creator ID is not defined or user is not logged in.");
          }
          const response = await ApiHandler.AddChallenge(title, description, start_date, end_date, created_at, creator_id);
        
          if (response) {
            navigate(`/user/${user.userId}`); 
          }
        } catch (error) {
          console.log("Caught error in AddChallenge:", error);

          const serverMessage = error.message || "failed to create the challenge.";
          setErrorMessage(serverMessage);   
        }
      };


      
    return (
      <>
        <h2 className="text-center m-5">Create Challenge</h2>
        <ChallengeForm
        formState={formState}
        handleChange={handleChange}
        onSubmit={newChallenge}
        errorMessage={errorMessage}  
        />
      </>
    )
}

export default CreateChallenge;