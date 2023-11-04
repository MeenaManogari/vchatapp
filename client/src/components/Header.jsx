import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/authSlice";
import vchatlogo from "../assets/vchat-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="vchat_head_main">
      <div className="vchat_head">
        <img src={vchatlogo} alt="logo" />
        <h3>VChat</h3>
      </div>
      <div className="vchat_entry">
        {user ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
