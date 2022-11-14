import {createContext,useEffect,useState} from "react"
import clienteAxios from "../config/clienteAxios"
import useUsuario from "../hooks/useUsuario"

const ChatContext = createContext()

const ChatProvider = ({children}) =>{
    const [mensajes,setMensajes] = useState([])
    const [chat,setChat] = useState([])
    const {perfil} = useUsuario()

    const obtenerMensajes = async (id) =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(id){
                const {data} = await clienteAxios(`/chat/obtener/mensajes/${id}`,config)
                setMensajes(data)
            }
          } catch (error) {
            console.log(error)
          }
    }
    const crearChat = async (ida) =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(perfil?._id){
                const {data} = await clienteAxios(`/chat/${perfil?._id}/${ida}`,config)
                setChat(data[0])
                await obtenerMensajes(data[0]._id)
            }
          } catch (error) {
            console.log(error)
          }
    }

    const submitMensajes = async mensaje =>{
        const mensajesState = [...mensajes]
        const mensajesActualizados = [...mensajesState,mensaje]
        setMensajes(mensajesActualizados)
        //     const scrol = document.querySelector("#bajarscroll")
        //     const hasta = document.querySelector("#bajar")
        //     function getOffset( el ) {
        //     let _y = 0;
        //     while( el && !isNaN( el.offsetTop ) ) {
        //             _y += el.offsetTop - el.scrollTop;
        //             el = el.offsetParent;
        //     }
        //     return { top: _y};
        //   }
        //   let y = getOffset( hasta ).top;
        //   console.log((scrol.scrollTop * 100)/scrol.scrollHeight)
        //   if(((scrol.scrollTop * 100)/scrol.scrollHeight) > 90){
        //     scrol.scrollTop = y 
        //   }
    }

    return(
        <ChatContext.Provider
            value={{
                mensajes,
                setMensajes,
                obtenerMensajes,
                chat,
                setChat,
                crearChat,
                submitMensajes
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export{
    ChatProvider
}

export default ChatContext

