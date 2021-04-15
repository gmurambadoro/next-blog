import axios from "axios";

export const getAllPosts = async () => {
    const posts = await axios.get("/api/posts");

    return posts.data || [];
};

export const createPost = async (post) => {
    const response = await axios.post('/api/posts', post);

    return response.data || null;
};