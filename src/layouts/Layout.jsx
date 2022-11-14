import { Link, Navigate, Outlet } from "react-router-dom";
import FormularioCrearPublicacion from "../components/FormularioCrearPublicacion";
import Header from "../components/Header";
import LoadingSkeleton from "../components/LoadingSkeleton";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return <LoadingSkeleton />;

  return auth?._id ? (
    <div>
      <Header />
      <main className="h-screen pt-44 md:pt-14">
        <Outlet />
      </main>
      <FormularioCrearPublicacion />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Layout;
