import { useState } from "react"
import {Link} from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const Registrar = () => {
    const [nombre,setNombre] = useState("")
    const [email,setEmail] = useState("")
    const [genero,setGenero] = useState("")
    const [codigo,setCodigo] = useState("")
    const [password,setPassword] = useState("")
    const [repassword,setRePassword] = useState("")
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([nombre.trim(),email.trim(),genero.trim(),password.trim(),repassword.trim(),codigo.trim()].includes("")){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                type: "error"
            })
            return
        }
        if(nombre.length < 2){
            setAlerta({
                msg:"El nombre debe tener minimo 2 caracteres",
                type: "error"
            })
            return
        }
        if(password.length < 8){
            setAlerta({
                msg:"El password debe tener minimo 8 caracteres",
                type: "error"
            })
            return
        }
        if(password !== repassword){
            setAlerta({
                msg:"Las contraseñas no son iguales",
                type: "error"
            })
            return
        }
        try{
            const {data} = await clienteAxios.post("/usuarios/registrar",{
                nombre,
                email,
                genero,
                codigo,
                password
            })
            setAlerta({
                msg: data.msg,
                type: "success"
            })
            setNombre("")
            setEmail("")
            setGenero("")
            setCodigo("")
            setPassword("")        
            setRePassword("")        

        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                type: "error"
            })
        }
    }

    const {msg} = alerta

  return (
    <div className=" md:w-3/4 lg:w-1/2 md:mx-auto mx-4 gap-2 flex flex-col items-center">
        <h1 className="block text-center text-5xl font-black w-full font-montserrat text-color mt-10 text-indigo-500 md:w-2/3 mx-auto">
            Registrate y Comparte Con Tus Amigos
        </h1>
        {msg ? <Alerta alerta={alerta}/> : null}
        <form 
            onSubmit={handleSubmit}
            className="mt-10 bg-white p-5 rounded-md w-full md:w-2/3 md:mx-auto shadow-md"
        >
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
            <div className="mb-2">
                <label htmlFor="contrasegna"
                    className="text-xl text-indigo-500 font-bold block mb-2"
                    >Contraseña</label>
                <input type="password"
                id="contrasegna"
                placeholder="Tu contraseña aqui"
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="recontrasegna"
                    className="text-xl text-indigo-500 font-bold block mb-2"
                    >Repite la Contraseña</label>
                <input type="password"
                id="recontrasegna"
                placeholder="Repite la contraseña aqui"
                required
                className="bg-gray-100 p-2 placeholder-gray-600 w-full rounded-md"
                value={repassword}
                onChange={e=>setRePassword(e.target.value)}
                />
            </div>
            <input type="submit"
                value="Registrarse"
                className="w-full py-3 px-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold cursor-pointer"
                />
        </form>
        <div className="flex justify-between gap-2 w-full  md:w-2/3 mx-auto mt-4 ">
            <Link to="/" className="text-gray-700" >¿Ya tienes una cuenta? Inicia Sesion</Link>
            <Link to="/" className="text-gray-700" >Olvidé mi contraseña</Link>
        </div>
    </div>
    
  )
}

export default Registrar