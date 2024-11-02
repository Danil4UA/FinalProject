import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "./AuthForm";

const Register = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5001/api/users/register", { email, password });
      if (response.status === 201) navigate('/login');
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return <AuthForm title="Register" onSubmit={handleRegister} error={error} />;
};

export default Register;