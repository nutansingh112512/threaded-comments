import { useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { editComment } from "../store";


function EditBox({ comment, setShowEditBox }){
    const [commentValue, setCommentValue] = useState(comment.message);
    const dispatch = useDispatch();

    const parentId = comment.author+comment.createdAt;
    const handleCommentChange = (event) => setCommentValue(event.target.value);
    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        dispatch(editComment({parentId, newMessage: commentValue}));
        setShowEditBox(false);
    }
    const handleReturn = (event) =>{
        if(event.key === 'Enter'){
            event.preventDefault();
            handleUpdateSubmit(event);
        }
    }

    return (
        <form onSubmit={handleUpdateSubmit} className="flex flex-col  sm:items-start w-full gap-2 sm:gap-5">
            <textarea value={commentValue} onKeyDown={handleReturn} onChange={handleCommentChange} rows="3" className="w-full border rounded-lg border-gray-500 py-1 sm:py-2 px-3 sm:px-5 focus:outline-0 resize-none" />
            <Button className="bg-[#5258bc] text-white font-medium sm:font-bold hover:opacity-70 rounded-lg px-3 sm:px-5 py-1 sm:py-2 sm:self-end">UPDATE</Button>
        </form>
    )
}

export default EditBox;