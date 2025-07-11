import { Navigate } from "react-router-dom";

function RotaProtegida({ children }) {
  function RotaProtegida({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
  }
  

  return children;
}

export default RotaProtegida;
