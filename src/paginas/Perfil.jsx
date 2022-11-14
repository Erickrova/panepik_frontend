import { useEffect } from "react";
import { useState } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ModalConfigurarPerfil from "../components/ModalConfigurarPerfil";
import ModalSeguidores from "../components/ModalSeguidores";
import ModalSeguidos from "../components/ModalSeguidos";
import Publicacion from "../components/Publicacion";
import useModals from "../hooks/useModals";
import useUsuario from "../hooks/useUsuario";

const Perfil = () => {

  const [totalPublicaciones,setTotalPublicaciones] = useState(0)

  const { perfil, publicaciones } = useUsuario();
  const {
    handleModalSeguidores,
    handleModalSeguidos,
    handleModalConfigurarPerfil,
  } = useModals();
  useEffect(()=>{
    const numPublicaciones = perfil?.publicaciones?.length;
    setTotalPublicaciones(numPublicaciones)
  },[perfil])
  const numSeguidores = perfil?.seguidores?.length;
  const numSeguidos = perfil?.seguidos?.length;

  const bgFemenino = "bg-gradient-to-r from-rose-200 to-rose-400";
  const bgMasculino = "bg-gradient-to-r from-sky-200 to-sky-400";

  if (!perfil) return <LoadingSkeleton />;

  return (
    <div
      className={`flex flex-col h-full items-center ${
        perfil.genero === "Femenino"
          ? bgFemenino
          : perfil.genero === "Masculino"
          ? bgMasculino
          : perfil.genero === "Otro"
          ? "bg-lgbt"
          : ""
      }
    
    bg-fixed overflow-y-auto p-2 pb-10`}
    >
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" stroke-slate-700 bg-white rounded-full w-40 h-40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div className="relative flex flex-col items-start md:items-center bg-white rounded-lg shadow w-3/4 p-4 mb-4">
        <button
          onClick={handleModalConfigurarPerfil}
          type="button"
          className="absolute top-2 right-2 hover:bg-gray-200 p-1 rounded-full"
          title="Configurar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <h2 className="text-center text-3xl capitalize font-black font-montserrat text-indigo-500">
          {perfil?.nombre} # {perfil?.codigo}
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xl text-gray-700 font-bold">
            Cuenta: {perfil?.cuenta}
          </p>
          <p className="text-xl text-gray-700 font-bold">
            Genero: {perfil?.genero}
          </p>
        </div>
        <div className="flex flex-col items-start md:flex-row gap-4 md:mx-auto">
          <p className="md:text-center text-2xl font-bold">
            Publicaciones:{" "}
            <span className="text-red-600">{totalPublicaciones}</span>
          </p>
          <button type="button" onClick={handleModalSeguidores}>
            <p className="md:text-center text-2xl font-bold">
              Seguidores: <span className="text-red-600">{numSeguidores}</span>
            </p>
          </button>
          <button type="button" onClick={handleModalSeguidos}>
            <p className="md:text-center text-2xl font-bold">
              Seguidos: <span className="text-red-600">{numSeguidos}</span>
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white rounded-lg shadow w-3/4 p-4 mb-10">
        <h2 className="text-center text-3xl font-black font-montserrat mb-4 text-indigo-500">
          Publicaciones
        </h2>
        {perfil?.publicaciones?.length ? (
          publicaciones.map((publicacion) => (
            <Publicacion
              key={publicacion._id}
              publicacion={publicacion}
              creador={perfil}
            />
          ))
        ) : (
          <p className="text-xl text-center font-black">
            No hay publicaciones aun
          </p>
        )}
      </div>

      <ModalSeguidores seguidores={perfil?.seguidores} />
      <ModalSeguidos seguidos={perfil?.seguidos} />
      <ModalConfigurarPerfil />
    </div>
  );
};

export default Perfil;
