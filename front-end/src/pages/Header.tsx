import { Button, Stack, Snackbar, Alert, Box, AppBar, Toolbar, Typography } from "@mui/material"; // Импортируйте необходимые компоненты
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import { useContext, useState } from "react";

const Header = (): JSX.Element => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { token, setToken } = authContext;

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.get("http://localhost:5001/api/users/logout", {
                withCredentials: true,
            });
            localStorage.removeItem("token");
            setToken(null); // Сбрасываем токен

            console.log("Logged out successfully");
            setSnackbarMessage("Logged out successfully");
        } catch (error) {
            console.error("Failed to logout:", error);
            setSnackbarMessage("Failed to logout");
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <AppBar position="static" className="appbar">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                    Posts AI               Generator
                </Typography>
                <Box>
                    {!token ? (
                        <Stack spacing={2} direction={"row"}>
                            <Button component={Link} to="/about" color="inherit">About</Button>
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/register" color="inherit">Register</Button>
                        </Stack>
                    ) : (
                        <Stack spacing={2} direction={"row"}>
                            <Button component={Link} to="/" color="inherit">Dashboard</Button>
                            <Button component={Link} to="/manage" color="inherit">Manage</Button>
                            <Button component={Link} to="/contact" color="inherit">Contact us</Button>
                        </Stack>
                    )}
                </Box>
                {token && (
                    <Button onClick={handleLogout} disabled={loading} color="inherit">Log out</Button>
                )}
            </Toolbar>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === "Failed to logout" ? "error" : "success"}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </AppBar>
    );
}

export default Header;