import classNames from "classnames";
import Avatar from "./Avatar";
import Button from "./Button";
import Panel from "./Panel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { addComment, addReply } from "../store";
import { useDispatch, useSelector } from "react-redux";

function CommentBox ({type, parentId, setShowReplyBox, scrollRef, ...rest}, ref) {
    const [commentValue, setCommentValue] = useState("");
    const dispatch = useDispatch();
    const {currentUser, data} = useSelector((state)=>state.comments);

    const handleCommentChange = (event) => setCommentValue(event.target.value);
    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if(commentValue === ""){
            alert("Enter some comment!")
            return;
        }
        if(type === 'SEND'){
            dispatch(addComment(commentValue));
        }
        if(type === 'REPLY'){
            dispatch(addReply({parentId, reply: commentValue}));
            setShowReplyBox(false);
        }
        setCommentValue("");
    };
    const handleReturn = (event) =>{
        if(event.key === 'Enter'){
            event.preventDefault();
            handleCommentSubmit(event);
        }
    }

    const scrollToBottom = useCallback(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight - ref.current.offsetHeight,
            behavior: 'smooth'
        })
    }, [ref, scrollRef]);

    const didMount = useRef(false);
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        if(type === 'SEND') scrollToBottom();
    }, [data.length, scrollToBottom, type])

    const classes = classNames(rest.className, 'sm:gap-3');
    return (
        <Panel className={classes} ref={ref}>
            <Avatar avatar={currentUser.avatar} />
            <div className="w-full">
                <form onSubmit={handleCommentSubmit} className="flex flex-col sm:flex-row  sm:items-start w-full gap-2 sm:gap-5">
                    <textarea value={commentValue} onKeyDown={handleReturn} onChange={handleCommentChange} rows="3" className="w-full border rounded-lg border-gray-500 py-1 sm:py-2 px-3 sm:px-5 focus:outline-0 resize-none" placeholder="Add a comment..." />
                    <Button className="bg-[#5258bc] text-white font-medium sm:font-bold hover:opacity-70 rounded-lg px-3 sm:px-5 py-1 sm:py-2">{type}</Button>
                </form>
            </div>
        </Panel>
    );
}

export default React.forwardRef(CommentBox);