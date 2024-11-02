import { useSelectPostsCurrentResult } from "./state/postsHooks";
import { Typography } from "@mui/material";
import { deletePost, setCurrentResult } from "./state/postSlice";
import { useAppDispatch } from "./state/postsHooks";
import { useNavigate } from "react-router-dom";


const PostResult = (): JSX.Element | null => {
    const currentResult = useSelectPostsCurrentResult();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (!currentResult) {
        return (
            <div className="post-result">
                <div className="post-result-content">
                    {/* <h2>Get started</h2>
                    <p>1. Write your prompt with what you want the AI to generate and hit the Generate button.</p>
                    <p>2. Press edit to mske some changes and publick result on social medias or delete the result</p> */}
                </div>
            </div>
            
        );
    }

    const handleDelete = () => {
        try {
            if (!currentResult.id) {
                throw new Error("Cannot find post...");
            }
            dispatch(deletePost(currentResult.id));
            dispatch(setCurrentResult(null));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id?: number) => {
        if (id) {
            console.log("Editing post with ID:", id);
            navigate(`/edit-post/${id}`);
        } else {
            console.error("No ID found for the current post");
        }
    };

    return (
        <div className="post-result">
            <div className="post-result-content" >
                {currentResult.content.split(/\n{2,}/).map((paragraph: string, index: number) => (
                    <Typography key={index} component="p" className="post-paragraph">
                        {paragraph}
                    </Typography>
                ))}
            </div>
        



            {currentResult.content !== "Loading..." &&

                <div className="post-editor-buttons" style={{position:"absolute", top:"16px", right:"24px"}}>
                <button
                    onClick={() => handleEdit(currentResult.id)}
                    className="button primary-button save-button"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="button primary-button save-button"
                >
                    Delete
                </button>
                </div>
            }
            
        </div>
    );
};

export default PostResult;
