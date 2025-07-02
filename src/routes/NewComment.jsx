import { useState } from "react";
import { useParams } from "react-router-dom";
import ApiHandler from "../Api/ApiHandlerClass";
import CreateCommentComponent from "../components/CreateCommentComponent";

function NewComment({ addComment }) {
  const { id } = useParams();
  const [formState, setFormState] = useState({ content: "" });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState(state => ({
        ...state, 
        [name]: value
    }));
}

  async function handleSubmit(e) {
    e.preventDefault();
    const { content } = formState;
    try {
        const response = await ApiHandler.createComment(id, content);
        addComment(response);
        setFormState({content: ""});
    } catch (error) {
        console.error("Error adding comment:", error)
    }
    
  }

  return (
    <>
        <CreateCommentComponent 
            formState={formState}
            handleChange={handleChange}
            onSubmit={handleSubmit}
        />
    </>  
  );
}

export default NewComment;
