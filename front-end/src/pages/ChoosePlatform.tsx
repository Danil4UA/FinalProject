import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const socialMediaLinks = [
  { icon: <FacebookIcon />, url: "https://www.facebook.com", label: "Facebook" },
  { icon: <InstagramIcon />, url: "https://www.instagram.com", label: "Instagram" },
  { icon: <LinkedInIcon />, url: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: <TwitterIcon />, url: "https://www.twitter.com", label: "Twitter" },
];

interface ChoosePlatformProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ChoosePlatform = ({ isOpen }: ChoosePlatformProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 83,
        right: isOpen ? 16 : -200,
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        bgcolor: "background.paper",
        borderRadius: 1,
        p: 1,
        transition: "right 0.3s ease-in-out",
      }}
    >
      {socialMediaLinks.map((social, index) => (
        <IconButton
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          sx={{
            width: 50,
            height: 50,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#e0e0e0",
            },
          }}
        >
          {social.icon}
        </IconButton>
      ))}
    </Box>
  );
};

export default ChoosePlatform;