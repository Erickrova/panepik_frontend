import {createContext,useEffect,useState} from "react"
import clienteAxios from "../config/clienteAxios"
import { useLocation, useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({children}) =>{

    const [auth,setAuth] = useState({})
    const [cargando,setCargando] = useState(true)
    const navigate = useNavigate()
    const path = useLocation()

    const cerrarSesionAuth = () =>{
        setAuth({})
    }
    useEffect(()=>{
        const autenticando = async ()=>{
            const token = localStorage.getItem("token")
            if(!token) {
                setCargando(false)
                return
            
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(token){
                try {
                    const {data} = await clienteAxios("/usuarios/perfil",config)
                    setAuth(data)

                    if(path.pathname === "/"){
                        navigate("/home")
                    }
                } catch (error) {
                    setAuth({})
                }finally{
                    setCargando(false)
                }
            }
            
        }
        autenticando()
    },[])


    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext

