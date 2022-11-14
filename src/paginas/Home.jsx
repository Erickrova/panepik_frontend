import Publicacion from "../components/Publicacion";
import useAuth from "../hooks/useAuth";
import useUsuario from "../hooks/useUsuario";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Home = () => {
  const { publicacionesHome } = useUsuario();
  const { perfil } = useUsuario();

  if (!perfil?._id) return <LoadingSkeleton />;

  return (
    <>
      <div className="bg-white md:w-2/3 mx-auto mt-4 p-4 mb-10 rounded-lg">
        {publicacionesHome?.length ? (
          publicacionesHome.map((publicacion) => (
            <Publicacion key={publicacion._id} publicacion={publicacion} />
          ))
        ) : (
          <p className="text-xl text-center font-black">
            Estas al dia con las publicaciones de tus amigos
          </p>
        )}
      </div>
      <div className="w-full h-1"></div>
    </>
  );
};

export default Home;
