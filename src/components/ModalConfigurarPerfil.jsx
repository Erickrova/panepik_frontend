import { useEffect } from "react"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import useModals from "../hooks/useModals"
import useUsuario from "../hooks/useUsuario"
import Alerta from "./Alerta"


const ModalConfigurarPerfil = () => {
    const [nombre,setNombre] = useState("")
    const [email,setEmail] = useState("")
    const [genero,setGenero] = useState("")
    const [cuenta,setCuenta] = useState("")
    const [codigo,setCodigo] = useState("")
    const [alerta,setAlerta] = useState({})
    const {perfil} = useUsuario()

    const {modalConfigurarPerfil,setModalConfigurarPerfil} = useModals() 

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([nombre,email,genero,codigo,cuenta].includes("")){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                type: "error"
            })
            return
        }
        try{
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put("/usuarios/actualizar-perfil",{
                nombre,
                email,
                genero,
                codigo,
                cuenta
            },config)
            setAlerta({
                msg: data.msg,
                type: "update"
            })
            setTimeout(()=>{
                setAlerta({})
            },3000)   
        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                type: "error"
            })
        }
    }
    useEffect(()=>{
        setNombre(perfil?.nombre)
        setEmail(perfil?.email)
        setGenero(perfil?.genero)
        setCodigo(perfil?.codigo)
        setCuenta(perfil?.cuenta)
    },[perfil])

    const {msg} = alerta
  return (
    modalConfigurarPerfil ? (
        
        <div
        className="fixed z-50 inset-0 md:p-0 p-8 flex flex-col justify-center items-center w-screen h-screen bg-opacity-50 bg-gray-500"
        >
        {msg ? <Alerta alerta={alerta} /> : null}
        <form 
            onSubmit={handleSubmit}
            className=" relative mt-10 bg-white p-5 rounded-md w-full md:w-2/3 md:mx-auto shadow-md"
            
            >
                <button
                    type="button"
                    onClick={()=> setModalConfigurarPerfil(false)}
                    className="bg-red-400 w-3 h-3 flex justify-center items-center text-white font-bold shadow-md -right-4 -top-4 p-4 rounded-3xl absolute "
                >
                    X
                </button>
            <div className="mb-2">
                <label htmlFor="titulo"
                className=" uppercase font-montserrat text-center text-2xl text-indigo-500 font-black block mb-2"
                >Configurar Perfil</label>
               
            </div>
            <div className="mb-2">
                <label htmlFor="nombre"
                    className="text-xl text-indigo-500 font-black block mb-2"
                >Nombre</label>
                <input type="text"
                id="nombre"
                placeholder="Tu nombre aqui"
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="email"
                    className="text-xl text-indigo-500 font-black block mb-2"
                >E-Mail</label>
                <input type="email"
                id="email"
                placeholder="Tu email aqui"
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="genero"
                    className="text-xl text-indigo-500 font-black block mb-2"
                >Genero</label>
                <select id="genero"
                    className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                    value={genero}
                    onChange={e=>setGenero(e.target.value)}
                >
                    <option value="" disabled > --- Selecciona tu genero  ---</option>
                    <option value="Masculino" >Masculino</option>
                    <option value="Femenino" >Femenino</option>
                    <option value="Otro" >Otro</option>
                </select>
            </div>
            <div className="mb-2">
                <label htmlFor="cuenta"
                    className="text-xl text-indigo-500 font-black block mb-2"
                >Cuenta</label>
                <select id="cuenta"
                    className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                    value={cuenta}
                    onChange={e=>setCuenta(e.target.value)}
                >
                    <option value="" disabled > --- Selecciona Tipo de Cuenta  ---</option>
                    <option value="Publica" >Publica</option>
                    <option value="Privada" >Privada</option>
                </select>
            </div>
            <div className="mb-2">
                <label htmlFor="codigo"
                    className="text-xl text-indigo-500 font-bold block mb-2"
                    >Codigo</label>
                <input type="text"
                id="codigo"
                placeholder="Escribe un codigo de 4 letras"
                minLength={4}
                maxLength={4}
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={codigo}
                onChange={e=>setCodigo(e.target.value)}
                />
            </div>

            <input type="submit"
                value="Actualizar"
                className="w-full py-3 px-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold cursor-pointer"
                />

        </form>
    </div>
    ):null
  )
}

export default ModalConfigurarPerfil