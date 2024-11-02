import { db } from "../config/db";
import OpenAI from 'openai';

interface Content {
    language: string; 
    request: string; 
    size: "small" | "medium" | "large"; 
    emojis: boolean; 
    style: string; 
    audience: string;
    platform: string;
    hashtags: boolean;
    characthersCount: number
}

interface PostInfo {
    content: Content,
    userid: number
}
export const postModels = {

    createPost: async(postInfo: PostInfo) => {
    function convertPostToSentence(content: Content): string {

        const parts = [
            `Please generate a post`,
            `User prompts: ${content.request}.`,
            `The post should be written in ${content.language} language.`,
            `Style: ${content.style}.`,
            `Target audience: ${content.audience}.`,
            `Emojis should be ${content.emojis ? "included" : "excluded"}.`,
            `The post will be shared on ${content.platform}.`,
            `Hashtags should be ${content.hashtags ? "included" : "excluded"}.`
        ];

        return parts.join(', ') + '.';
}
        const createContent = convertPostToSentence(postInfo.content)

        const trx = await db.transaction();
        try {
            if(!createContent) throw Error

            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            
            const params: OpenAI.Chat.ChatCompletionCreateParams = {
                // check how you ar e saving messages 
                messages: [{ 
                    role: 'user', 
                    content: `${createContent} \n\nPlease structure the response with logical paragraph breaks. Separate different ideas, sections, or important points into distinct paragraphs to improve readability.` 
                }],
                model: 'gpt-3.5-turbo',
            };

            const response: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);
            const gptResponseText = response.choices[0].message.content;
            
            if(gptResponseText){
                const formattedResponse = gptResponseText
                    .split('\n\n')  // Используем абзацы
                    .map((paragraph: string) => paragraph.trim())
                    .filter((paragraph: string) => paragraph.length > 0)
                    .join('\n\n');

                    const [post] = await trx('posts').insert({
                        content: formattedResponse, 
                        created_at: new Date(),
                        user_id: postInfo.userid
                    }).returning('*');
                    await trx.commit(); 
                    return post        
            }
          
        } catch (error) {
            await trx.rollback()
            console.log(error)
            throw error
        }
    },

    refinePost: async(originalContent: string, userRequest: string) => {
        const trx = await db.transaction();
        try {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            const params: OpenAI.Chat.ChatCompletionCreateParams = {
                messages: [
                    {
                        role: 'user',
                        content: `Here is the original post: "${originalContent}". User has a new request: "${userRequest}". Please modify the original post according to the user's request. Do not reply ANYTHING besides the modified text. No additional words! Structure the response with logical paragraph breaks.`
                    }
                ],
                model: 'gpt-3.5-turbo',
            };

            const response: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);
            const gptResponseText = response.choices[0].message.content;

            if (gptResponseText) {
                const formattedResponse = gptResponseText
                    .split('\n\n')
                    .map((paragraph: string) => paragraph.trim())
                    .filter((paragraph: string) => paragraph.length > 0)
                    .join('\n\n');

                await trx.commit();
                return formattedResponse;
            }
        } catch (error) {
            await trx.rollback();
            console.log(error);
            throw error;
        }
    },


    getAllPosts: async ()=>{
        try {
            return await db("posts")
                .select("id","user_id", "content", "status", "file_url")
        } catch (error) {

            console.log(error)
            throw error
        }
    },

    getPostById: async (id: string) => {
        try {
            const post = await db("posts")
                .select("id", "user_id", "content", "status", "file_url")
                .where({ "id": id })
                .first()
            
            if (!post) {
                throw new Error("Post not found.");
            }

            return post;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching post.");
        }

    },

    getAllPostsByUserID: async (userid: string) => {
        try {
            const posts = await db("posts")
                .select("id", "user_id", "content", "status", "file_url", "scheduled_at")
                .where({ "user_id": userid })
                
                if (posts.length === 0) {
                    throw new Error("Posts not found.");
                }
            return posts

        } catch (error) {
            console.error(error);
            throw new Error("Error fetching post.");
        }
    },

    deletePostById: async (id: string) => {
        try {
            const deletedRows = await db("posts")
                .delete()
                .where({"id": id})
            return deletedRows
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    editPostById: async (id: string, content: string, scheduled_at: string) => {
        try {
            const updatedRows = await db("posts")
                .update({ 
                    content,
                    scheduled_at, // Update scheduled_at
                    updated_at: new Date() // Update updated_at to current date and time
                })
                .where({ id });

            if (updatedRows === 0) {
                throw new Error("Post not found or not updated.");
            }
            return updatedRows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}