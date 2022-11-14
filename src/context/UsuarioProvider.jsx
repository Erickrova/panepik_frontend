import {createContext,useEffect,useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const UsuarioContext = createContext()

const UsuarioProvider = ({children}) =>{
    
    const [perfil,setPerfil] = useState({})
    const [publicaciones,setPublicaciones] = useState([])
    const [publicacionesHome,setPublicacionesHome] = useState([])
    const [usuariosEncontrados,setUsuariosEncontrados] = useState({})
    const [perfilBuscado,setPerfilBuscado] = useState({})
    const [publicacionesPerfilBuscado,setPublicacionesPerfilBuscado] = useState([])
    const {auth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    
    const cerrarSesionUsuario = () =>{
        setPerfil({})
        setPublicaciones([])
        setUsuariosEncontrados({})
    }

    const obtenerPerfil = async () =>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(auth?._id && auth?.codigo){
            const {data} = await clienteAxios(`/usuarios/obtener-perfil/${auth._id}/${auth.codigo}`,config)
            setPerfil(data)
            setPublicaciones(data.publicaciones.reverse())
        }
    }
    useEffect(()=>{
        const llamado = async () =>{
            await obtenerPerfil()
        }
        llamado()
    },[auth])

    const buscarUsuario = async (nombre) =>{
        if(nombre){
            try {
                const {data} = await clienteAxios(`/usuarios/buscar-usuario/${nombre.toLowerCase()}`)
                setUsuariosEncontrados(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
            
    }
   
    const buscarPerfil = async (nombre,codigo) =>{

        if(perfil?._id === perfilBuscado?._id){
            navigate("/home/perfil")
            return
        }
        if(nombre){
            try {
                const {data} = await clienteAxios(`/usuarios/buscar-perfil/${nombre}/${codigo}`)
                setPerfilBuscado(data)
                setPublicacionesPerfilBuscado(data.publicaciones.reverse())
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
            
    }
    useEffect(()=>{
        const obtenerPublicaciones = async () =>{
            try {
              const token = localStorage.getItem("token")
              if(!token) return
              const config = {
                  headers:{
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                  }
              }
              const {data} = await clienteAxios("/publicaciones/obtener-publicaciones",config)
              setPublicacionesHome(data.reverse())
            } catch (error) {
              console.log(error)
            }
          }
        obtenerPublicaciones()
    },[auth])


    return(
        <UsuarioContext.Provider
            value={{
                perfil,
                cerrarSesionUsuario,
                publicaciones,
                setPublicaciones,
                buscarUsuario,
                buscarPerfil,
                usuariosEncontrados,
                setUsuariosEncontrados,
                publicacionesHome,
                perfilBuscado,
                setPerfilBuscado,
                publicacionesPerfilBuscado,
                setPublicacionesPerfilBuscado,
                obtenerPerfil
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export{
    UsuarioProvider
}

export default UsuarioContext

