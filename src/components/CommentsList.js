import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../store";
import { useEffect, useRef } from "react";
import CommentsListItem from "./CommentsListItem";
import Skeleton from "./Skeleton";
import CommentBox from "./CommentBox";


function CommentsList () {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const commentBoxRef = useRef(null);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const {data, isLoading, error} = useSelector((state) => state.comments);

    if(isLoading) {
         return <Skeleton times={3} className='h-10 w-[100%]' />
    } else if(error) {
        return <div>Error loading comments...</div>
    }

    return(
        <div ref={scrollRef} className="relative h-dvh max-w-5xl mx-auto overflow-y-auto ">
            {data.map(comment =><CommentsListItem key={comment.author+comment.createdAt} comment={comment} />)}
            <CommentBox type="SEND" className="sticky bottom-0" parentId='root' scrollRef={scrollRef} ref={commentBoxRef} />
        </div>
    );
}

export default CommentsList;