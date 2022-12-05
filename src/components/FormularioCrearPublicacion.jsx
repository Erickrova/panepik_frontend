import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import useModals from "../hooks/useModals"
import Alerta from "./Alerta"
import { useEffect } from "react"
import useUsuario from "../hooks/useUsuario"

// import io from "socket.io-client"
// let socket



const FormularioCrearPublicacion = () => {
    const [titulo,setTitulo] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [alerta,setAlerta] = useState({})
    const [delayBtn,setDelayBtn] = useState(false)
    const {setPublicaciones,publicaciones,obtenerPerfil} = useUsuario()
    // const [media,setMedia] = useState("")
    
    const {handleModalCrearPublicacion,modalCrearPublicacion} = useModals()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setDelayBtn(true)
        if([titulo.trim(),descripcion.trim()].includes("")){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                type:"error"
            })
            setDelayBtn(false)
            return
        }
        if(descripcion.length > 700){
            setAlerta({
                msg:"La descripción no puede ser mayor a 700 caracteres",
                type:"error"
            })
            setDelayBtn(false)
            return
        }
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post("/publicaciones/crear-publicacion",{
                titulo,
                descripcion
            },config)
            await obtenerPerfil()
            setPublicaciones([data,...publicaciones])
            setDelayBtn(false)
            setAlerta({
                msg:"Publicacion Creada Correctamente",
                type:"success"
            })
            setTitulo("")
            setDescripcion("")
            setTimeout(()=>{
                setAlerta({})
            },3000)
            
        } catch (error) {
            console.log(error)
            setAlerta({
                msg:error.response.data.msg,
                type:"error"
            })
        }
    }
    
    const {msg} = alerta
    
    // useEffect(()=>{
    //     socket = io(import.meta.env.VITE_BACKEND_URL)       
    // },[])
    return (
        modalCrearPublicacion ? (
        <div
        className="fixed z-50 inset-0 md:p-0 p-8 flex flex-col justify-center items-center w-screen h-screen bg-opacity-50 bg-gray-500"
        >
        {msg ? <Alerta alerta={alerta} /> : null}
        <form 
            onSubmit={!delayBtn ? handleSubmit : null}
            className=" relative mt-10 bg-white p-5 rounded-md w-full md:w-2/3 md:mx-auto shadow-md"
            
            >
                <button
                    type="button"
                    onClick={handleModalCrearPublicacion}
                    className="bg-red-400 w-3 h-3 flex justify-center items-center text-white font-bold shadow-md -right-4 -top-4 p-4 rounded-3xl absolute "
                >
                    X
                </button>
            <div className="mb-2">
                <label htmlFor="titulo"
                className=" uppercase font-montserrat text-center text-2xl text-indigo-500 font-black block mb-2"
                >Crear Publicación</label>
               
            </div>
            <div className="mb-2">
                <label htmlFor="titulo"
                    className="text-xl text-indigo-500 font-black block mb-2"
                    >Titulo</label>
                <input type="text"
                id="titulo"
                placeholder="Titulo de la publicación aqui"
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={titulo}
                onChange={e=>setTitulo(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="descripcion"
                    className="text-xl text-indigo-500 font-bold block mb-2"
                    >Descripción</label>
                <textarea
                id="descripcion"
                placeholder="Descripcion de la publicacion"
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={descripcion}
                onChange={e=>setDescripcion(e.target.value)}
                />
                <p className="text-gray-800">{descripcion.length}/700</p>
            </div>
            {/* <div className="mb-2">
                <label htmlFor="media"
                className="text-xl text-indigo-500 font-bold block mb-2"
                >Imagen o Video</label>
                <input type="file"></input>
            </div> */}

            <input type="submit"
                value="Publicar"
                className="w-full py-3 px-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold cursor-pointer"
                />

        </form>
    </div>
    ):null
  )
}

export default FormularioCrearPublicacion