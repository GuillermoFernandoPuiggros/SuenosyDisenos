import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Admin() {
    const {admin} = useAuthContext();

    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }
    return(
        <div>
            <p>Componente Admin</p>
        </div>
    )
}