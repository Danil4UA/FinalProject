import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../App";
import AuthForm from "./AuthForm";

const Login = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext is required");
  const { setToken } = authContext;

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", { email, password });
      const {accessToken, user} = response.data

      setToken(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", user.userid);
        localStorage.setItem("userEmail", user.email);

        console.log(localStorage)
        console.log("Login successful and data saved to localStorage");

      navigate('/');
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return <AuthForm title="Login" onSubmit={handleLogin} error={error} />;
};

export default Login;