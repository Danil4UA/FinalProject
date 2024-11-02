import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/styles/logoAI.png"

interface AuthNavBarProps {
    title: string;
}

const AuthNavBar = ({ title }: AuthNavBarProps): JSX.Element => {
    return (
        <Box 
            sx={{
                position: "absolute",
                top: 0,
                backgroundColor: "white",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px",
                boxSizing: "border-box",
                zIndex: 1,
            }}
        >
            <div style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
                height: "70px",
                width: "170px", // Добавляем ширину для логотипа
            }}></div>

            {title === "Login" ? (
                <div>
                    Need an Account?  
                    <Button component={Link} to="/register" color="primary" sx={{ marginLeft: "10px" }}>
                        Register
                    </Button>
                </div>
            ) : (
                <div>
                    Already have one?
                    <Button component={Link} to="/login" color="primary" sx={{ marginLeft: "10px" }}>
                        Log in
                    </Button>
                </div>
            )}
        </Box>
    );
};

export default AuthNavBar;