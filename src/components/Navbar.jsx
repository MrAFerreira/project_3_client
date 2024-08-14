import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <nav>
      <p>{user ? user.username : "Hello"}</p>
      {user && <img src={user.profilePic} />}
      <ul>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>

        {/*    { user ? (
          <Link to="/projects">
            <button>Projects</button>
          </Link>
        ) : (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )} */}

        {!loading && user && (
          <>
            <Link to="/projects">
              <button>Projects</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {!loading && !user && (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
