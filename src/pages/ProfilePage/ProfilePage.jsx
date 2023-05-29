import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/auth.context";

import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);
  const [diagnosis, setDiagnosis] = useState("");
  const [setUser] = useState({});

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.delete("/auth/delete", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(response.data.message);

        logOutUser();

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateDiagnosis = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.post("/diagnosis/diagnosis", {}, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setDiagnosis(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          const response = await axios.get("/chat/messages", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  return (
    <div className="me_profile">
      <div className="profile">
        <div className="profile_container">
          <h1>Mi perfil</h1>
          <div className="">
            <div className="">
              <div className="">
                <p>Datos personales del usuario</p>
              </div>
              {/* <div>
                <button
                  type="button"
                  className=""
                  onClick={() => navigate("/editProfile")}
                >
                  Editar
                </button>
              </div> */}
            </div>
            <div className="">
              <div className="">
                <label className="" htmlFor="inputFirstName">
                  Nombre:
                </label>
                <h5 className="">{user.name}</h5>
              </div>
              <div className="">
                <div className="">
                  <label className="" htmlFor="inputEmailAddress">
                    Correo electrónico:
                  </label>
                  <h5 className="">{user.email}</h5>
                </div>
                <div className="">
                  <label className="" htmlFor="inputPassword">
                    Contraseña:
                  </label>
                  <h5 className="">***********</h5>
                </div>
              </div>
              <div className="">
                <p>{user.diagnosis}</p>
              </div>
            </div>
            <div>
              <button
                className="header_button"
                type="button"
                onClick={handleGenerateDiagnosis}
              >
                Generar diagnóstico.
              </button>
              {diagnosis && (
                <div>
                  <h2>Diagnóstico de MindBot.</h2>
                  <p>{diagnosis}</p>
                </div>
              )}
            </div>
            <button onClick={handleDelete} className="header_button delete_acc">Eliminar cuenta.</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
