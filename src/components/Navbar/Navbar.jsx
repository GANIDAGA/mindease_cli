import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

import './Navbar.css';

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  const renderAuthenticatedLinks = () => (
    <div className="header_buttons">
      {location.pathname !== "/chat" && (
        <Link to="/chat" className="header_link">Chat</Link>
      )}
      <Link to="/profile" className="header_link" as="button">Perfil</Link>
      <button onClick={handleLogout} className="header_button">Cerrar Sesión</button>
    </div>
  );

  const renderGuestLinks = () => {
    const isSignupPage = window.location.pathname === "/signup";
    const isLoginPage = window.location.pathname === "/login";

    if (isSignupPage) {
      return (
        <>
          <Link className="header_button" to="/login">
            Iniciar Sesión
          </Link>
        </>
      );
    }

    if (isLoginPage) {
      return (
        <>
          <Link className="header_button" to="/signup">
            Crear Cuenta
          </Link>
        </>
      );
    }

    return (
      <div className="header_buttons">
        <Link className="header_button" to="/signup">Crear Cuenta</Link>
        <Link className="header_button" to="/login">Iniciar Sesión</Link>
      </div>
    );
  };

  const renderNavbarContent = () => {
    if (isLoggedIn) {
      return renderAuthenticatedLinks();
    } else {
      return renderGuestLinks();
    }
  };

  return (
    <header className="me_header">
      <div className="header">
        <nav className="header_container">
          <Link to="/" className="header_logo">MindEase</Link>
          <div className="header_links">
            <Link className="header_link" to="/">Directorio</Link>
            <Link className="header_link" to="/">MindBlog</Link>
            <Link className="header_link" to="/us">Acerca de</Link>
            <Link className="header_link" to="/contact">Contacto</Link>
          </div>
          {renderNavbarContent()}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
