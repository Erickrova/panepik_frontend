import ListadoChats from "../components/ListadoChats";
import ListarMensajes from "../components/ListarMensajes";

const Chat = () => {
  return (
    <div className="flex flex-col  md:flex-row h-full md:overflow-hidden">
      <ListadoChats />
      <ListarMensajes />
    </div>
  );
};

export default Chat;
