import { useContext } from "react";
import UsuarioContext from "../context/UsuarioProvider";


const useUsuario = () => {
  return useContext(UsuarioContext)
}

export default useUsuario