import ListadoChats from "../components/ListadoChats";
import ListarMensajes from "../components/ListarMensajes";

const Chat = () => {
  return (
    <div className="flex h-full overflow-hidden">
      <ListadoChats />
      <ListarMensajes />
    </div>
  );
};

export default Chat;
