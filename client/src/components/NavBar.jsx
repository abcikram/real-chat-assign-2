import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "4rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-docoration-none">
            Chattapp
          </Link>
        </h2>
        <span className="text-warning">Login as {user?.name}</span>
        <Nav>
          <Stack direction="horizontal" gap="3">
            <Link to="/login" className="link-light text-docoration-none">
              Log In
            </Link>
            <Link to="/register" className="link-light text-docoration-none">
              Register
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
