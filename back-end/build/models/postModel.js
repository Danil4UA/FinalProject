"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModels = void 0;
const db_1 = require("../config/db");
const openai_1 = __importDefault(require("openai"));
exports.postModels = {
    createPost: (postInfo) => __awaiter(void 0, void 0, void 0, function* () {
        function convertPostToSentence(content) {
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
        const createContent = convertPostToSentence(postInfo.content);
        const trx = yield db_1.db.transaction();
        try {
            if (!createContent)
                throw Error;
            const client = new openai_1.default({
                apiKey: process.env.OPENAI_API_KEY
            });
            const params = {
                // check how you ar e saving messages 
                messages: [{
                        role: 'user',
                        content: `${createContent} \n\nPlease structure the response with logical paragraph breaks. Separate different ideas, sections, or important points into distinct paragraphs to improve readability.`
                    }],
                model: 'gpt-3.5-turbo',
            };
            const response = yield client.chat.completions.create(params);
            const gptResponseText = response.choices[0].message.content;
            if (gptResponseText) {
                const formattedResponse = gptResponseText
                    .split('\n\n') // Используем абзацы
                    .map((paragraph) => paragraph.trim())
                    .filter((paragraph) => paragraph.length > 0)
                    .join('\n\n');
                const [post] = yield trx('posts').insert({
                    content: formattedResponse,
                    created_at: new Date(),
                    user_id: postInfo.userid
                }).returning('*');
                yield trx.commit();
                return post;
            }
        }
        catch (error) {
            yield trx.rollback();
            console.log(error);
            throw error;
        }
    }),
    refinePost: (originalContent, userRequest) => __awaiter(void 0, void 0, void 0, function* () {
        const trx = yield db_1.db.transaction();
        try {
            const client = new openai_1.default({
                apiKey: process.env.OPENAI_API_KEY
            });
            const params = {
                messages: [
                    {
                        role: 'user',
                        content: `Here is the original post: "${originalContent}". User has a new request: "${userRequest}". Please modify the original post according to the user's request. Do not reply ANYTHING besides the modified text. No additional words! Structure the response with logical paragraph breaks.`
                    }
                ],
                model: 'gpt-3.5-turbo',
            };
            const response = yield client.chat.completions.create(params);
            const gptResponseText = response.choices[0].message.content;
            if (gptResponseText) {
                const formattedResponse = gptResponseText
                    .split('\n\n')
                    .map((paragraph) => paragraph.trim())
                    .filter((paragraph) => paragraph.length > 0)
                    .join('\n\n');
                yield trx.commit();
                return formattedResponse;
            }
        }
        catch (error) {
            yield trx.rollback();
            console.log(error);
            throw error;
        }
    }),
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield (0, db_1.db)("posts")
                .select("id", "user_id", "content", "status", "file_url");
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield (0, db_1.db)("posts")
                .select("id", "user_id", "content", "status", "file_url")
                .where({ "id": id })
                .first();
            if (!post) {
                throw new Error("Post not found.");
            }
            return post;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching post.");
        }
    }),
    getAllPostsByUserID: (userid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield (0, db_1.db)("posts")
                .select("id", "user_id", "content", "status", "file_url", "scheduled_at")
                .where({ "user_id": userid });
            if (posts.length === 0) {
                throw new Error("Posts not found.");
            }
            return posts;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching post.");
        }
    }),
    deletePostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedRows = yield (0, db_1.db)("posts")
                .delete()
                .where({ "id": id });
            return deletedRows;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
    editPostById: (id, content, scheduled_at) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedRows = yield (0, db_1.db)("posts")
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
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
};
