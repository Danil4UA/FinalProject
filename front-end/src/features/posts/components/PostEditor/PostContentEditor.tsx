import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface PostContentEditorProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const PostContentEditor = ({ content, setContent, onChange }: PostContentEditorProps) => {
  const [userRequest, setUserRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousContent, setPreviousContent] = useState<string | null>(null);
  const [isRefined, setIsRefined] = useState(false);

  const handleUserRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRequest(event.target.value);
  };

  const handleRefinePost = async () => {
    setLoading(true);
    setError(null);

    try {
      setPreviousContent(content); // Save current content before refining

      const response = await axios.post('http://localhost:5001/api/posts/refine', {
        originalContent: content,
        userRequest: userRequest,
      });

      setContent(response.data.refinedPost);
      setUserRequest(''); // Reset user request field
      setIsRefined(true); // Show the "Get Previous Post" button
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to refine the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetPreviousPost = () => {
    if (previousContent !== null) {
      setContent(previousContent);
      setPreviousContent(null); // Clear previous content after using it
      setIsRefined(false); // Hide the button after going back to previous version
    }
  };

  return (
    <div className="refine-post-container">
      <div>
        <TextField
          fullWidth
          multiline
          minRows={5}
          value={content}
          onChange={onChange}
          className="content-input"
          sx={{
            maxHeight: '500px',
            overflow: 'auto',
          }}
        />
        {isRefined && (
          <button
            onClick={handleGetPreviousPost}
            disabled={!previousContent}
            className="button primary-button save-button"
            style={{ marginTop: "20px" }}
          >
            Get Previous Post
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          value={userRequest}
          onChange={handleUserRequestChange}
          placeholder="Edit your post manually or type your request here..."
          className="user-request-input"
          aria-label="User Request Input"
        />
        <button
          onClick={handleRefinePost}
          disabled={loading || !userRequest.trim()}
          className="refine-post-button"
        >
          {loading ? 'Processing...' : 'Refine Post'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default PostContentEditor;