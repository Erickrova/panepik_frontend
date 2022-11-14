import useUsuario from "../hooks/useUsuario";
import PreviewUsuarioBuscado from "./PreviewUsuarioBuscado";

const Buscador = () => {
  const { buscarUsuario, usuariosEncontrados, setUsuariosEncontrados } =
    useUsuario();
  return (
    <div className="w-full md:w-96 relative">
      <input
        type="search"
        onBlur={() =>
          setTimeout(() => {
            setUsuariosEncontrados([]);
          }, 300)
        }
        onFocus={(e) => buscarUsuario(e.target.value)}
        onChange={(e) => buscarUsuario(e.target.value)}
        className="bg-gray-200 p-2 rounded-md w-full h-10"
        placeholder="Busca amigos"
      />
      <div className="absolute w-full z-30 pt-2 max-h-40 overflow-y-auto">
        {usuariosEncontrados?.length
          ? usuariosEncontrados.map((usuario) => (
              <PreviewUsuarioBuscado key={usuario._id} usuario={usuario} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Buscador;
