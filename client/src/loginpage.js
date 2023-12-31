import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [msgtyp, setMsgtyp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username: Username, password: Password };
    axios
      .post("http://localhost:5000/login", data, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setMessage(data.message);
        setMsgtyp(data.msg_type);
        if (data.msg_type == "success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>User Login</h1>

      <form onSubmit={handleLogin}>
        <div className="data">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        <div className="data">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div className="btn">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className={msgtyp}>{message} </div>
      <div className="signup-link">
        Not a Member? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default UserLogin;
