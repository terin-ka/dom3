import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Gravatar from "./gravatar.component";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/user.provider";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function Header() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await AuthService.logout(); // odhlásí uživatele
    clearUser(); // smažeme data v local storage + providerovi
    let next = "/login"; // přejdeme na login page
    if (location.state && location.state.next) {
      next = location.state.next;
    }
    navigate(next);
  };

  return (
    <Navbar bg='light' sticky='top' className='Header'>
      <Container>
        <Navbar.Brand>
          <img alt='' src='/logo256.png' width='30' height='30' className='d-inline-block align-top' /> Moje aplikace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/test'>
              Test
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {/* přihlášeného uživatele zobrazuji pouze pokud jsem přihlášen */}
          {user ? (
            <Navbar.Collapse className='justify-content-end'>
              <NavDropdown
                title={
                  <>
                    <Gravatar email={user.email} size={32} />
                    <span>{" " + user.username}</span>
                  </>
                }
                align='end'
              >
                <NavDropdown.Item as={NavLink} to={"/profile"}>
                  Profil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse className='justify-content-end'>
              <Nav.Link as={NavLink} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to='/register'>
                Registrace
              </Nav.Link>
            </Navbar.Collapse>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
