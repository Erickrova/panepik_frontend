import { useContext } from "react";
import ModalsContext from "../context/ModalsProvider";

const useModals = () => {
  return useContext(ModalsContext)
}

export default useModals