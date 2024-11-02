import { Typography, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const IPhoneMockup = ({ content }: { content: string}): JSX.Element => {
    return (
        <Box
            sx={{
                width: '238px', // 280px * 0.85
                height: '510px', // 600px * 0.85
                border: '7px solid black', // 8px * 0.85
                borderRadius: '30px', // 36px * 0.85
                position: 'relative',
                background: '#f2f2f2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Box
                sx={{
                    width: '229px', // 270px * 0.85
                    height: '476px', // 560px * 0.85
                    backgroundColor: 'white',
                    borderRadius: '20px', // 24px * 0.85
                    padding: '4px', // 5px * 0.85
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    top: '17px', // 20px * 0.85
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '4px 8px', // 5px * 0.85 and 10px * 0.85
                        borderBottom: '1px solid #e0e0e0',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Username</Typography>
                    <IconButton size="small">
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* {imageUrl && (
                    <Box
                        component="img"
                        src={imageUrl.startsWith("data") ? imageUrl : `http://localhost:5001${imageUrl}`}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            mb: 1.7, // 2px * 0.85
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                            borderRadius: '0px',
                            margin: '0',
                        }}
                    />
                )} */}

                {/* Post content with paragraphs */}
                <Box sx={{ width: '100%', maxHeight: '170px', overflowY: 'auto', mb: 0.85 }}>
                    <Typography variant="body2" sx={{ mt: 0.85 }}>
                        {content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.85 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <CommentIcon />
                        </IconButton>
                        <IconButton>
                            <SaveAltIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>0 Likes</Typography>
                </Box>

                <Box sx={{ width: '100%', mt: 0.85, borderTop: '1px solid #e0e0e0', pt: 0.85 }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>View all comments</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default IPhoneMockup;