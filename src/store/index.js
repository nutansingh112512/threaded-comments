import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer, addComment, addReply, changeVote, removeComment } from "./slices/commentsSlice";

const store = configureStore({
    reducer: {
        comments: commentsReducer,
    }
});

export {store, addComment, addReply, changeVote, removeComment};
export * from './thunks/fetchComments';