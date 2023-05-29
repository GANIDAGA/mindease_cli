import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/auth.context";

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
    <div>
      <h1>My bio</h1>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <p>Account Details</p>
              </div>
              <div>
                <button
                  type="button"
                  className=""
                  onClick={() => navigate("/editProfile")}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="">
                  <label className="" htmlFor="inputFirstName">
                    Name
                  </label>
                  <h5 className="">{user.name}</h5>
                </div>
              </div>
              <div className="">
                <div className="">
                  <label className="" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <h5 className="">{user.email}</h5>
                </div>
                <div className="">
                  <label className="" htmlFor="inputPassword">
                    Password
                  </label>
                  <h5 className="">***********</h5>
                </div>
              </div>
              <div className="">
                <div>
                  <p>{user.diagnosis}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                className=""
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
          </div>
        </div>
      </div>
      <button onClick={handleDelete}>Eliminar cuenta.</button>
    </div>
  );
}

export default ProfilePage;
