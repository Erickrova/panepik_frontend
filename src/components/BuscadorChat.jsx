import { useState } from "react";
import PreviewChat from "./PreviewChat";

const BuscadorChat = ({ chats }) => {
  const [chatsEncontrados, setChatsEncontrados] = useState([]);
  const buscarChat = (busqueda) => {
    setChatsEncontrados(
      chats?.filter((chat) =>
        chat?.participantes.some(
          (participante) => participante.nombre === busqueda
        )
      )
    );
  };
  return (
    <div className="w-full md:w-96 relative">
      <input
        type="search"
        onBlur={() =>
          setTimeout(() => {
            setChatsEncontrados([]);
          }, 100)
        }
        onFocus={(e) => buscarChat(e.target.value)}
        onChange={(e) => buscarChat(e.target.value)}
        className="bg-gray-200 p-2 rounded-md w-full h-10"
        placeholder="Busca amigos"
      />
      <div
        className={`${
          chatsEncontrados?.length ? "bg-sky-400 p-2 rounded-md" : ""
        } absolute w-full z-30 pt-2 max-h-40 overflow-y-auto`}
      >
        {chatsEncontrados?.length
          ? chatsEncontrados.map((chat) => (
              <PreviewChat key={chat?._id} chat={chat} />
            ))
          : null}
      </div>
    </div>
  );
};

export default BuscadorChat;
