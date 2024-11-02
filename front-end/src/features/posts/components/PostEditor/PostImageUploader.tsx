import { Box, IconButton, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostImageUploaderProps {
  imageUrl: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const PostImageUploader = ({ imageUrl, onFileChange, onRemoveImage }: PostImageUploaderProps) => {
  return (
    <Box sx={{margin: "20px 0", textAlign: "center"}}>
      <Button
        variant="contained"
        component="label"
        color="primary"
        startIcon={<CloudUploadIcon />}
        sx={{ mr: 1 }}
      >
        Choose File
        <input type="file" hidden onChange={onFileChange} />
      </Button>
      

      {imageUrl && (
        <Box sx={{ position: 'relative', maxWidth: '200px', width: '100%', marginTop: 2 }}>
          <Box
            component="img"
            src={imageUrl.startsWith("data") ? imageUrl : `http://localhost:5001${imageUrl}`}
            alt="Post Image"
            sx={{
              maxWidth: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <IconButton
            onClick={onRemoveImage}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PostImageUploader;