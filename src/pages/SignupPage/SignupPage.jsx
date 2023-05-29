import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";

import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, role };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="me_signupPage">
      <div className="signupPage">
        <div className="signupPage_container">
          <div className="signupPage_container_left">
            <p className="signupPage_left_title">MindEase</p>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">
                MindBot
              </p>
              <p className="signupPage_left_mini_desc">
                ¡MindBot que será tu amigo de confianza! MindEase te ofrece un compañero virtual que está aquí para escucharte y responder como si fuese un amigo. ¿Necesitas desahogarte después de un día difícil? ¿Quieres compartir tus alegrías y logros? Nuestro bot está preparado para estar a tu lado en todas las circunstancias.
              </p>
            </div>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">
                Directorio
              </p>
              <p className="signupPage_left_mini_desc">
                ¡Encuentra el especialista en salud mental adecuado para ti en nuestro directorio de especialistas! Te proporcionamos información detallada sobre una amplia variedad de lugares de atención, desde clínicas presenciales hasta servicios gratuitos y públicos en diferentes áreas de México.
              </p>
            </div>
            <div className="signupPage_left_mini">
              <p className="signupPage_left_mini_title">
                MindCommunity
              </p>
              <p className="signupPage_left_mini_desc">
                ¡Únete a nuestra comunidad en MindEase y descubre un espacio donde encontrarás apoyo, conexión y amistad en México! Aquí podrás interactuar con personas que han experimentado o están pasando por situaciones similares a las tuyas. Nuestra plataforma te brinda la oportunidad de compartir tus experiencias, intereses y preocupaciones, y al mismo tiempo, estar allí para otros que necesitan tu apoyo.
              </p>
            </div>
          </div>
          <div className="signupPage_container_right">
            <p className="signupPage_title">Crea tu cuenta de MindEase</p>
            <div className="signupPage_form">
              <form onSubmit={handleSignupSubmit}>
                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Correo electrónico:</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="signupPage_input"
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Contraseña:</span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="signupPage_input"
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Nombre:</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    className="signupPage_input"
                  />
                </div>

                <div className="signupPage_inputContainer">
                  <span className="signupPage_inputTitle">Tipo de usuario:</span>
                  <select
                    name="role"
                    value={role}
                    onChange={handleRole}
                    className="signupPage_input"
                  >
                    <option className="custom_select" value="normal">Usuario Normal</option>
                    <option className="custom_select" value="specialist">Especialista</option>
                  </select>
                </div>

                <div className="signupPage_inputContainer">
                  <button type="submit" className="signupPage_button">
                    Crear Cuenta
                  </button>
                </div>
              </form>

              {errorMessage && <p className="">{errorMessage}</p>}

              <div className="signupPage_finalLinks">
                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login" className="linkfinal">Inicia con ella.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
