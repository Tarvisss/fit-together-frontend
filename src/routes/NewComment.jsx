import { useState } from "react";
import { useParams } from "react-router-dom";
import ApiHandler from "../Api/ApiHandlerClass";
import CreateCommentComponent from "../components/CreateCommentComponent";

function NewComment() {
  const { id } = useParams();
  const [formState, setFormState] = useState({ content: "" });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState(state => ({
        ...state, 
        [name]: value
    }));
}

  async function addComment(e) {
    e.preventDefault();
    const { content } = formState;
    const response = await ApiHandler.createComment(id, content);
    return response;
  }

  return (
    <>
        <CreateCommentComponent 
            formState={formState}
            handleChange={handleChange}
            onSubmit={addComment}
        />
    </>  
  );
}

export default NewComment;
