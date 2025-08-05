import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../thunks/fetchComments";
import bird from '../../svg/bird.svg';

const commentsSlice = createSlice({
    name: 'comment',
    initialState: {
        currentUser: {
            "author": "Brad Pit",
            "avatar": bird,
        },
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        addComment(state, action) {
            state.data.push({
                ...state.currentUser,
                "createdAt": new Date().toISOString(),
                "message": action.payload,
                "voteCount": 0,
            });
        },
        addReply(state, action) {
            const {parentId, reply} = action.payload;
            const replyObj = {
                ...state.currentUser,
                "createdAt": new Date().toISOString(),
                "message": reply,
                "voteCount": 0,
            }
            function addReplyToComment(comments, parentId, replyObj) {
                return comments.map(comment => {
                    if (comment.author+comment.createdAt === parentId) {
                        return {
                            ...comment,
                            comments: comment.comments
                                ?[...comment.comments, replyObj]
                                :[replyObj]
                        };
                    }
                    if(comment.comments){
                        return {
                            ...comment,
                            comments: addReplyToComment(comment.comments, parentId, replyObj)
                        };
                    }
                    return comment;
                });
            }
            return {...state, data: addReplyToComment(state.data, parentId, replyObj)};
        },
        changeVote(state, action){
            const { parentId, voteType} = action.payload;
            function changeCommentVote(comments, parentId, voteType) {
                return comments.map(comment => {
                    if (comment.author+comment.createdAt === parentId) {
                        return {
                            ...comment,
                            voteCount: voteType==='increment'? comment.voteCount+1 : comment.voteCount-1,
                        };
                    }
                    if(comment.comments){
                        return {
                            ...comment,
                            comments: changeCommentVote(comment.comments, parentId, voteType)
                        };
                    }
                    return comment;
                });
            }
            return {...state, data: changeCommentVote(state.data, parentId, voteType)};
        },
        removeComment(state, action){
            const parentId = action.payload;
            function deleteComment(comments, parentId) {
                return comments.filter(comment => comment.author+comment.createdAt !== parentId)
                    .map((comment) => {
                        if(comment.comments){
                            return {
                                ...comment,
                                comments: deleteComment(comment.comments, parentId)
                            };
                        }
                    });
            }
            const content = {...state, data: deleteComment(state.data, parentId)};
            console.log(content);
            return content;
        }
    },
    extraReducers (builder) {
        builder.addCase(fetchComments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const { addComment, addReply, changeVote, removeComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;