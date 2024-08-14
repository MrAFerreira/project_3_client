import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleUsername = e => setUsername(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleFileUpload = async e => {
    //configuring how to send the file
    const uploadData = new FormData();

    uploadData.append("imgUrl", e.target.files[0]);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      setLoading(false);
      setProfilePic(response.data.fileUrl);
      console.log(response.data.fileUrl);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      //Same as the process.env that we saw on the server, but for Vite
      // http://localhost:5005
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        username,
        email,
        password,
        profilePic,
      });
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="SignupPage">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username"> Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="email"> Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label htmlFor="password"> Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <label htmlFor="imgUrl">Profile Picture</label>
        <input
          type="file"
          name="imgUrl"
          id="imgUrl"
          onChange={handleFileUpload}
        />

        <button
          disabled={loading}
          type="submit">
          Sign up
        </button>
      </form>

      {errorMessage && <p className="error-message"> {errorMessage} </p>}

      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  );
}

export default Signup;
