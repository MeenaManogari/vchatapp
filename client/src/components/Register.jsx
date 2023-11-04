import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/authSlice";
import VChatLogo from "../assets/vchat-logo.png";
import "./components.css";
const Register = () => {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = regData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/video");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const registerUser = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="reg_main">
      <img src={VChatLogo} alt="Logo" />
      <h2>VChat</h2>
      <p>Feel the Presence of your loved ones!</p>
      <h3>Register</h3>
      <form onSubmit={registerUser}>
        {/* <label>Name</label> */}
        <input
          type="text"
          value={regData.name}
          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
          placeholder="Username"
        />
        {/* <label>Email</label> */}
        <input
          type="email"
          value={regData.email}
          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
          placeholder="E-Mail"
        />
        {/* <label>Password</label> */}
        <input
          type="password"
          value={regData.password}
          onChange={(e) => setRegData({ ...regData, password: e.target.value })}
          placeholder="password"
        />
        <div className="reg_btn">
          <button type="submit">Register</button>
          <div className="direct_link">
            <p>already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
