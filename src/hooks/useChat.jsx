import { useContext } from "react";
import ChatContext from "../context/ChatProvider";


const useChat = () => {
  return useContext(ChatContext)
}

export default useChat