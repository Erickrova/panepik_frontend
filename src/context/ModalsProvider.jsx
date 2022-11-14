import {createContext,useEffect,useState} from "react"
import clienteAxios from "../config/clienteAxios"
import { useLocation, useNavigate } from "react-router-dom"

const ModalsContext = createContext()

const ModalsProvider = ({children}) =>{
    const [modalCrearPublicacion,setModalCrearPublicacion] = useState(false)
    const [modalSeguidores,setModalSeguidores] = useState(false)
    const [modalSeguidos,setModalSeguidos] = useState(false)
    const [modalConfigurarPerfil,setModalConfigurarPerfil] = useState(false)

    const handleModalCrearPublicacion = () =>{
        if(!modalCrearPublicacion){
            setModalCrearPublicacion(true)
            const body = document.body
            body.classList.add("overflow-y-hidden")
        }else{
            setModalCrearPublicacion(false)
            const body = document.body
            body.classList.remove("overflow-y-hidden")
        }
    }
    const handleModalSeguidores = () =>{
        if(!modalSeguidores){
            setModalSeguidores(true)
            const body = document.body
            body.classList.add("overflow-y-hidden")
        }else{
            setModalSeguidores(false)
            const body = document.body
            body.classList.remove("overflow-y-hidden")
        }
    }
    const handleModalSeguidos = () =>{
        if(!modalSeguidores){
            setModalSeguidos(true)
            const body = document.body
            body.classList.add("overflow-y-hidden")
        }else{
            setModalSeguidos(false)
            const body = document.body
            body.classList.remove("overflow-y-hidden")
        }
    }
    const handleModalConfigurarPerfil = () =>{
        if(!modalConfigurarPerfil){
            setModalConfigurarPerfil(true)
            const body = document.body
            body.classList.add("overflow-y-hidden")
        }else{
            setModalConfigurarPerfil(false)
            const body = document.body
            body.classList.remove("overflow-y-hidden")
        }
    }

    return(
        <ModalsContext.Provider
            value={{
                modalCrearPublicacion,
                setModalCrearPublicacion,
                handleModalCrearPublicacion,
                modalSeguidores,
                setModalSeguidores,
                handleModalSeguidores,
                modalSeguidos,
                setModalSeguidos,
                handleModalSeguidos,
                modalConfigurarPerfil,
                setModalConfigurarPerfil,
                handleModalConfigurarPerfil
            }}
        >
            {children}
        </ModalsContext.Provider>
    )
}

export{
    ModalsProvider
}

export default ModalsContext

