import { postModels } from "../models/postModel";
import { Request, Response } from "express"
// import { upload } from '../middlewares/uploadMiddleware'
import axios from 'axios';
import { db } from "../config/db";

export const postControllers = {

    createPost: async (req: Request, res: Response) => {
        const { content, userid } = req.body;
        console.log(content, userid)
        // need to add this to the type 

        // const {userid} = req.userinfo

        if (!content || content.length === 0) {
            res.status(400).json({ message: "Content is required" });
        }   

        try {
            const post = await postModels.createPost({ content, userid });
            console.log("Post is created successfully")
            res.status(200).json({
                message: "Post is created successfully",
                post,
            });
        } catch (error) {
            console.error("Error creating post: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    // getAllPosts: async (req: Request, res: Response) => {
    //     try {
    //         const posts = await postModels.getAllPosts()
    //         res.status(200).json({
    //             message: "Posts are fetched successfully",
    //             posts
    //         })
    //     } catch (error) {
    //         console.error("Error fetching posts: ", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // },
    getPostById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const post = await postModels.getPostById(id)
            if (post.length === 0) {
                res.status(404).json({ message: "Post not found" });
            }else{
                res.status(200).json({
                    message: "Post fetched success",
                    post
                })
            }

        } catch (error) {
            console.error("Error fetching post: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAllPostsByUserId: async (req: Request, res: Response) => {
        try {
            const { userid } = req.body; 
            const posts = await postModels.getAllPostsByUserID(userid);
    
            if (posts.length === 0) {
                res.status(404).json({ message: "Posts are not found" });
            } else {
                res.status(200).json({
                    message: "Posts fetched successfully",
                    posts
                });
            }
    
        } catch (error) {
            console.error("Error fetching posts: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deletePostById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const deletedPost = await postModels.deletePostById(id)
        if (deletedPost === 0) {
            res.status(400).json({ message: "Post not found" })
        }
        res.status(200).json({ message: "Post deleted successfully" }) 
        } catch (error) {
            console.error("Error deleting post: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    editPostById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content, scheduled_at } = req.body; // Include scheduled_at
            console.log("hi")
            // Update post with content and scheduled_at
            const updatedRows = await postModels.editPostById(id, content, scheduled_at);
            const updatedPost = await postModels.getPostById(id);

            if (!updatedRows) {
                return res.status(400).json({ message: "Post update failed" });
            }

            res.status(200).json({ 
                message: "Post updated successfully",
                updatedPost
            });
        } catch (error) {
            console.error("Error updating post: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // in the chat
    refinePost: async (req: Request, res: Response) => {
        const { originalContent, userRequest } = req.body;
    
        try {
            const refinedPost = await postModels.refinePost(originalContent, userRequest);
            res.json({ refinedPost });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to refine post' });
        }
    },
    
    publishToInstagram: async (req: Request, res: Response) => {
        const { postId, mediaUrl, caption } = req.body;
        const { INSTAGRAM_ACCESS_TOKEN } = process.env;

        try {
            const response = await axios.post(
                `https://graph.instagram.com/v15.0/${process.env.INSTAGRAM_PAGE_ID}/media`,
                {
                    image_url: mediaUrl,
                    caption: caption,
                    access_token: INSTAGRAM_ACCESS_TOKEN
                }
            );
            const result = await axios.post(
                `https://graph.instagram.com/v15.0/${process.env.INSTAGRAM_PAGE_ID}/media_publish`,
                {
                    creation_id: response.data.id,
                    access_token: INSTAGRAM_ACCESS_TOKEN
                }
            );
            res.status(200).json({ message: "Post published on Instagram", result });
        } catch (error) {
            console.error("Error publishing post on Instagram", error);
            res.status(500).json({ message: "Error publishing post on Instagram" });
        }
    },

    publishToFacebook: async (req: Request, res: Response) => {
        const { postId, message, link } = req.body;
        const { FACEBOOK_PAGE_ACCESS_TOKEN } = process.env;

        try {
            const response = await axios.post(
                `https://graph.facebook.com/v15.0/${process.env.FACEBOOK_PAGE_ID}/feed`,
                {
                    message: message,
                    link: link,
                    access_token: FACEBOOK_PAGE_ACCESS_TOKEN
                }
            );
            res.status(200).json({ message: "Post published on Facebook", result: response.data });
        } catch (error) {
            console.error("Error publishing post on Facebook", error);
            res.status(500).json({ message: "Error publishing post on Facebook" });
        }
    },
    publishPost: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const post = await db('posts').where({ id }).first(); // Use Knex to fetch post
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            }

            // Update post status to 'published'
            await db('posts').where({ id }).update({ status: 'published' });

            const updatedPost = await db('posts').where({ id }).first(); // Fetch the updated post

            res.json({ message: 'Post published successfully', post: updatedPost });
        } catch (error) {
            console.error("Error publishing post", error);
            res.status(500).json({ message: 'Error publishing post', error });
        }
    },
}   






export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, scheduled_at  } = req.body;
    const file = req.file;


    const updatedRows = await postModels.editPostById(id, content, scheduled_at);
            const updatedPost = await postModels.getPostById(id);

    try {
        if (!updatedRows) {
            res.status(400).json({ message: "Post update failed" });
        }else{
             // Сохраняем информацию о файле и посте в базу данных
            const updatedPost = await db('posts').where({ id }).update({
                content: content,
                file_url: file ? `/uploads/${file.filename}` : null  
            });

            res.status(200).json({ 
                message: "Post updated successfully",
                updatedPost
            });
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating post');
    }
};