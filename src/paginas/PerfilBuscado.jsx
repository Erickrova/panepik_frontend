import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Publicacion from "../components/Publicacion";
import useUsuario from "../hooks/useUsuario";
import clienteAxios from "../config/clienteAxios";
import useModals from "../hooks/useModals";
import ModalSeguidores from "../components/ModalSeguidores";
import ModalSeguidos from "../components/ModalSeguidos";
import useChat from "../hooks/useChat";
import io from "socket.io-client";

let socket;

const PerfilBuscado = () => {
  const [seguidor, setSeguidor] = useState(false);
  const [amigos, setAmigos] = useState(false);

  const {
    obtenerPerfil,
    perfilBuscado,
    setPerfilBuscado,
    perfil,
    publicacionesPerfilBuscado,
    setPublicacionesPerfilBuscado,
  } = useUsuario();
  const { handleModalSeguidores, handleModalSeguidos } = useModals();
  const { crearChat } = useChat();

  const numSeguidores = perfilBuscado?.seguidores?.length;
  const numSeguidos = perfilBuscado?.seguidos?.length;
  const numPublicaciones = perfilBuscado?.publicaciones?.length;

  const bgFemenino = "bg-gradient-to-r from-rose-200 to-rose-400";
  const bgMasculino = "bg-gradient-to-r from-sky-200 to-sky-400";
  const { nombre, codigo } = useParams();
  const itsme = perfil?.nombre === nombre && perfil?.codigo === codigo;
  const navigate = useNavigate();

  const handleSeguir = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (seguidor) {
      await clienteAxios(
        `/usuarios/dejar-de-seguir-usuario/${perfilBuscado._id}`,
        config
      );
      await obtenerPerfil();
      socket.emit("dejar seguir", "estoy dejando de seguir");
    } else {
      await clienteAxios(
        `/usuarios/seguir-usuario/${perfilBuscado._id}`,
        config
      );
      await obtenerPerfil();
      socket.emit("seguir", "estoy seguiguiendo");
    }
  };
  const handleChat = async () => {
    await crearChat(perfilBuscado._id);
    navigate("/home/chat");
  };
  const buscarPerfil = async () => {
    if (itsme) {
      navigate("/home/perfil");
      return;
    }
    if (nombre) {
      try {
        const { data } = await clienteAxios(
          `/usuarios/buscar-perfil/${nombre}/${codigo}`
        );
        setPerfilBuscado(data);
        setPublicacionesPerfilBuscado(data.publicaciones.reverse());
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  useEffect(() => {
    const llamado = async () => {
      await buscarPerfil();
    };
    llamado();
  }, [itsme]);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);

    socket.on("dejando seguir", async (data) => {
      await buscarPerfil();
      setSeguidor(false);
    });
    socket.on("siguiendo", async (data) => {
      await buscarPerfil();
      setSeguidor(true);
    });
  });
  useEffect(() => {
    if (
      perfilBuscado?.seguidores?.some((seguidor) => seguidor._id === perfil._id)
    ) {
      setSeguidor(true);
    }
  }, [perfilBuscado, perfil]);
  useEffect(() => {
    if (
      perfilBuscado?.seguidores?.some(
        (seguidor) => seguidor._id === perfil._id
      ) &&
      perfilBuscado?.seguidos?.some((seguidor) => seguidor._id === perfil._id)
    ) {
      setAmigos(true);
    } else {
      setAmigos(false);
    }
  }, [seguidor]);

  if (!perfilBuscado) return <LoadingSkeleton />;

  return (
    <div
      className={`flex flex-col h-full items-center ${
        perfilBuscado.genero === "Femenino"
          ? bgFemenino
          : perfilBuscado.genero === "Masculino"
          ? bgMasculino
          : perfilBuscado.genero === "Otro"
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
      <div className="flex flex-col items-start md:items-center bg-white rounded-lg shadow w-3/4 p-4 mb-4">
        <h2 className="text-center text-3xl capitalize font-black font-montserrat text-indigo-500">
          {perfilBuscado?.nombre} # {perfilBuscado?.codigo}
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xl text-gray-700 font-bold">
            Cuenta: {perfilBuscado?.cuenta}
          </p>
          <p className="text-xl text-gray-700 font-bold">
            Genero: {perfilBuscado?.genero}
          </p>
        </div>
        <div className="flex flex-col items-start md:flex-row gap-4 md:mx-auto">
          <p className="text-center text-2xl font-bold">
            Publicaciones:{" "}
            <span className="text-red-600">{numPublicaciones}</span>
          </p>
          <button type="button" onClick={handleModalSeguidores}>
            <p className="text-center text-2xl font-bold">
              Seguidores: <span className="text-red-600">{numSeguidores}</span>
            </p>
          </button>
          <button type="button" onClick={handleModalSeguidos}>
            <p className="text-center text-2xl font-bold">
              Seguidos: <span className="text-red-600">{numSeguidos}</span>
            </p>
          </button>
        </div>
        <div className="flex items-center justify-center mt-2 gap-2">
          <button
            type="button"
            onClick={handleSeguir}
            className={`uppercase px-3 py-2 
                    ${
                      seguidor
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-sky-500 hover:bg-sky-600"
                    }
                    text-center shadow-md font-black font-roboto text-white rounded-md`}
          >
            {seguidor ? "Dejar de seguir" : "Seguir"}
          </button>
          <div
            title={`${amigos ? "Amigos" : "No son amigos"}`}
            className={`p-2 ${
              amigos
                ? " bg-gradient-to-tr from-green-400 to-green-600"
                : "bg-gradient-to-tr from-gray-400 to-gray-600"
            } cursor-pointer shadow-md inline-block rounded-full`}
          >
            {amigos ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-white stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-white stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            )}
          </div>
          {amigos ? (
            <button
              type="button"
              title="Iniciar Conversacion"
              className="hover:bg-gray-200 rounded-full p-2"
              onClick={handleChat}
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
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col items-center bg-white rounded-lg shadow w-3/4 p-4 mb-10">
        <h2 className="text-center text-3xl font-black font-montserrat mb-4 text-indigo-500">
          Publicaciones
        </h2>
        {perfilBuscado?.publicaciones?.length ? (
          publicacionesPerfilBuscado.map((publicacion) => (
            <Publicacion key={publicacion._id} publicacion={publicacion} />
          ))
        ) : (
          <p className="text-xl text-center font-black">
            No hay publicaciones aun
          </p>
        )}
      </div>

      <ModalSeguidores seguidores={perfilBuscado?.seguidores} />
      <ModalSeguidos seguidos={perfilBuscado?.seguidos} />
    </div>
  );
};

export default PerfilBuscado;
