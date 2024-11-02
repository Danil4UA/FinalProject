import { IconButton, Button } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const About = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };

    return (
        <div className="about-container">
            <h3 className="about-title">
                Generate social media posts in seconds for free
            </h3>
            <p className="about-description">
                Stay consistent, creative, and productive with SocialBee's free AI social media post generator.
            </p>
            <div className="about-icons">
                <IconButton aria-label="Facebook" color="primary">
                    <FaFacebook />
                </IconButton>
                <IconButton aria-label="Instagram" color="secondary">
                    <FaInstagram />
                </IconButton>
                <IconButton aria-label="Twitter" color="primary">
                    <FaTwitter />
                </IconButton>
                <IconButton aria-label="LinkedIn" color="primary">
                    <FaLinkedin />
                </IconButton>
            </div>
            <p className="about-caption">
                Generate customized captions for each social platform
            </p>

            <div style={{display: "flex", gap: "20px", justifyContent :"center"}}>
                <Button variant="contained" onClick={handleClick}>Try now</Button>
                <Button variant="contained" onClick={handleClick}>Get started</Button>
            </div>
          
        </div>
    );
};

export default About;