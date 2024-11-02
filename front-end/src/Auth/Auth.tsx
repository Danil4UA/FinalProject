import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import Login from "../features/auth/Login";

interface AuthProps {
    children: JSX.Element;
}

const Auth = ({ children }: AuthProps) => {

    const [redirect, setRedirect] = useState(false);

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { token, setToken } = authContext;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }

        const verify = async () => {
            if (!token) {
                setRedirect(false);
                return;
            }
            try {
                console.log("Making request with token:", token);
                const response = await axios.get("http://localhost:5001/api/users/auth", {
                    withCredentials: true,
                    headers: {
                        "x-access-token": token
                    }
                });

                if (response.status === 200) {
                    const newToken = response.data.accessToken;
                    setToken(newToken); // Сохраняем новый токен
                    localStorage.setItem("token", newToken);
                    setRedirect(true);
                } else {
                    handleLogout();
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.log("Token expired or unauthorized, logging out.");
                } else {
                    console.error("An unexpected error occurred:", error);
                }
                handleLogout();
            }
        };

        const handleLogout = () => {
            setToken(null);
            localStorage.removeItem("token");
            setRedirect(false);
    
        };

        verify();
    }, [setToken, token]);

    return redirect ? children : <Login />;
};

export default Auth;