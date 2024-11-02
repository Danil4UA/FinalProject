import { CircularProgress } from "@mui/material";


interface PostSavePublishButtonsProps {
  isSaving: boolean;
  onSave: () => void;
  onPublish: () => void;
}

const PostSavePublishButtons = ({ isSaving, onSave, onPublish }: PostSavePublishButtonsProps) => {
  return (
    <>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="button primary-button save-button"
      >
        {isSaving ? <CircularProgress size={24} /> : "Save Changes"}
      </button>

      <button
        onClick={onPublish}
        disabled={isSaving}
        className="button primary-button save-button"
      >
        {isSaving ? <CircularProgress size={24} /> : "Publish"}
      </button>
    </>
  );
};

export default PostSavePublishButtons;