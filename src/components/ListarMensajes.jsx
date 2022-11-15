import { useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import useChat from '../hooks/useChat'
import useUsuario from '../hooks/useUsuario'
import io from "socket.io-client"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Mensaje from './Mensaje'
import Mensajes from './Mensajes'

let socket;

const ListarMensajes = () => {

    const [mensaje,setMensaje] = useState("")
    const [alerta,setAlerta] = useState(false)
    const [delayBtn,setDelayBtn] = useState(false)
    const {chat,submitMensajes,mensajes,setMensajes} = useChat()
    const {perfil} = useUsuario()
    const amigo = chat?.participantes?.filter(participante => participante?._id !== perfil?._id)[0]
    const navigate = useNavigate()
    const handleClickAmigo = () =>{
        navigate(`/home/perfil/${amigo.nombre}/${amigo.codigo}`)
    }
    const enviarMensaje = async () =>{
        if(![mensaje].includes("")){
            setDelayBtn(true)
            if(mensaje.length > 700){
                setAlerta(true)
                setDelayBtn(false)
                setTimeout(()=>{
                    setAlerta(false)
                },5000)
                return
            }
            try {
                const token = localStorage.getItem("token")
                if(!token) return
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                if(chat._id){
                    const {data} = await clienteAxios.post(`/chat/${chat?._id}`,{mensaje},config)
                    const mensajesState = [...mensajes]
                    mensajesState.push(data)
                    setMensajes(mensajesState)
                    socket.emit("enviar mensaje",data)
                    setMensaje("")
                    setAlerta(false)
                    setDelayBtn(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }    
    const handleAbajo = () =>{
    }
    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit("abrir chat",chat._id)
        socket.on("conectado a sala",()=>{
   
        })
        socket.on("enviando mensaje",data =>{
            if(data.chat === chat._id && data.enviadopor._id !== perfil){
                const mensajesState = [...mensajes]
                mensajesState.push(data)
                setMensajes(mensajesState)
            }
        })   
    })
    useEffect(()=>{
        const scrol = document.querySelector("#bajarscroll")
        if(scrol){
            scrol.scrollTo(0,scrol.scrollHeight) 
        }

    },[mensajes])

   
  return (
     <div className="md:w-2/3 flex flex-col h-full relative  bg-slate-700">
     <div className="w-full flex justify-between p-2 items-center">
         <button
            type='button'
            title='ir al perfil'
            onClick={handleClickAmigo} 
          className="text-xl text-white font-bold uppercase">{amigo ? amigo?.nombre : "usuario"}</button>
         <p className="text-xl text-white font-bold">AJUSTES</p>
     </div>
    {chat?._id ? (
        <>
      <Mensajes />
        <div className="h-30 p-4 bg-slate-700 flex flex-col md:flex-row gap-2 items-center justify-center w-full" >
            <textarea 
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
            className='bg-gray-200 p-2 rounded-md w-full md:w-2/3 h-30 resize-none'
            placeholder='Tu mensaje aqui' />
            <p className={`${alerta ? "text-red-500" : "text-gray-200"}`}>{mensaje.length}/700</p>
            <button
                id='btnEnviar'
                onClick={!delayBtn ? enviarMensaje : null}
                type='button'
                className='px-2 py-1 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xl w-full md:w-auto rounded-md'
                >
                Enviar
            </button>
            <button
                type='button'
                title='Ir abajo'
                onClick={handleAbajo}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-slate-200 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
        </>
    ):<p className="text-xl text-white text-center font-bold">Inicia una conversación</p>}
 </div>
  )
}

export default ListarMensajes