import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchComments = createAsyncThunk('comments/fetch', async () => {
    const response = await axios.get('https://654077a245bedb25bfc1f7eb.mockapi.io/comments');

    return response.data;
});

export { fetchComments };