import { useState } from "react";
import { createPost, fetchPosts } from "../../state/postSlice";
import { useAppDispatch } from "../../state/postsHooks";
import { setCurrentResult } from "../../state/postSlice";
import { Box, TextField, SelectChangeEvent  } from '@mui/material';
import PostToneSelector from "./PostToneSelector";
// import PostSliderComponent from "./PostSliderComponent";
import PostCustomSelect from "./PostCustomSelect";
import PostSwitchComponent from "./PostSwitchComponent";


const PostForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toneOfVoice = ["Polite", "Witty", "Enthusiastic", "Friendly", "Informational", "Funny"];
    const audienceOptions = ["any", "Adults", "Teenagers", "Children"];
    const sizeOptions = ["Short", "Medium", "Long"];
    const platformOptions = ["Facebook", "Instagram", "Twitter", "LinkedIn"];

    const [formData, setFormData] = useState({
        audience: "any",
        request: "",
        size: "Short",
        language: "ENG",
        platform: "Facebook",
        hashtags: true,
        emojis: false,
        // characthersCount: 100,
        tone: "Polite", 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData((prevState) => ({ ...prevState, [name]: updatedValue }));
    };


    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handling submit")
    try {
        setIsSubmitting(true);

        dispatch(setCurrentResult({
            content: "Loading..."
        }));


        const content = { ...formData };
        const createPostsResponse = await dispatch(createPost(content));
        await dispatch(fetchPosts());
        // const currentResult = createPostsResponse.payload.post.content;
        const currentResult = createPostsResponse.payload.post;
        console.log(currentResult)

        dispatch(setCurrentResult(currentResult));
        setIsSubmitting(false);
    } catch (error) {
        console.log(error);
        setIsSubmitting(false);
    }
};

    return (
        <Box component="form" onSubmit={handleSubmit} className="form-container">

        <TextField
            label="Your prompt"
            multiline
            rows={4}
            name="request"
            value={formData.request}
            onChange={handleChange}
            fullWidth
            className="content-input form-textfield "
        />
        <PostToneSelector toneOfVoice={toneOfVoice} selectedTone={formData.tone} onSelectTone={(tone) => setFormData({ ...formData, tone })} />
            
        {/* <PostSliderComponent characthersCount={formData.characthersCount} onSliderChange={(value) => setFormData({ ...formData, characthersCount: value })} /> */}

        <Box className="form-select-container">
            <Box className="form-select-box">
                <PostCustomSelect
                    label="Audience"
                    name="audience"
                    options={audienceOptions}
                    value={formData.audience}
                    onChange={handleSelectChange}
                />
            </Box>

            <Box className="form-select-box">
                <PostCustomSelect
                    label="Size"
                    name="size"
                    options={sizeOptions}
                    value={formData.size}
                    onChange={handleSelectChange}
                />
            </Box>
            <Box className="form-select-box">
                <PostCustomSelect
                    label="Platform"
                    name="platform"
                    options={platformOptions}
                    value={formData.platform}
                    onChange={handleSelectChange}
                />
            </Box>
        </Box>
        
        <PostSwitchComponent name="hashtags" label="Generate hashtags" checked={formData.hashtags} onChange={handleChange} />
        <PostSwitchComponent name="emojis" label="Include emojis" checked={formData.emojis} onChange={handleChange} />
        <button 
            type="submit"
            disabled={isSubmitting}
              className="refine-post-button"
          >
            {isSubmitting ? "Generating..." : "Generate"}
          </button>
    </Box>
    );
};

export default PostForm;