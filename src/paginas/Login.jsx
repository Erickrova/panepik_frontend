import { useState } from "react"
import {Link} from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [alerta,setAlerta] = useState({})

    const navigate = useNavigate()
    const {setAuth} = useAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([email,password].includes("")){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                type: "error"
            })
            return
        }
        try{
            const {data} = await clienteAxios.post("/usuarios/login",{email,password})
            setAlerta({
                msg:"Login correcto",
                type: "success"
            })
            localStorage.setItem("token",data.token)
            setAuth(data)
            setEmail("")
            setPassword("")
            setTimeout(()=>{
                console.clear()
                navigate("/home")
            },1500)

        }catch(error){
            setAlerta({
                msg:error.response.data.msg,
                type: "error"
            })
        }
    }

    const {msg} = alerta

  return (
    <div className="md:flex md:justify-between md:max-h-screen gap-2">
        <div className=" hidden md:flex md:flex-col md:gap-2 md:w-2/5 p-10 bg-white m-10 rounded-lg shadow">
            <h2 className="text-center font-black text-4xl font-montserrat text-indigo-500">Comparte con tus amigos</h2>
            <div className="md:flex md:gap-2 ">
                <img

                    loading="lazy"
                    src="/img/login.jpg" alt="imagen login"
                    className="min-w-0 w-full max-h-80"
                />
                <img
  
                    loading="lazy"
                    src="/img/login3.jpg" alt="imagen login"
                    className=" min-w-0 w-full max-h-80"
                />
            </div>
            <img
    
                loading="lazy"
                src="/img/login2.jpg" alt="imagen login"
                className="w-full md:h-1/2 col-span-2 pb-10"
            />
        </div>
        <div className=" md:w-3/5 md:mx-auto mx-4 gap-2 flex flex-col items-center md:pr-4">
            <h1 className="block text-center text-5xl font-black w-full font-montserrat text-color mt-10 md:mt-40 text-indigo-500 md:w-2/3 mx-auto">
                Inicia Sesión y Comparte Con Tus Amigos
            </h1>
            {msg ? <Alerta alerta={alerta}/> : null}
            <form 
                onSubmit={handleSubmit}
                className="mt-10 bg-white p-5 rounded-md w-full md:w-2/3 md:mx-auto shadow-md"
            >
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

                <input type="submit"
                    value="Iniciar sesión"
                    className="w-full py-3 px-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold cursor-pointer"
                    />

            </form>
            <div className="flex justify-between gap-2 w-full md:w-2/3 mx-auto mt-4 ">
                <Link to="registrar" className="text-gray-700" >¿No tienes una cuenta? Registrate</Link>
                <Link to="/" className="text-gray-700" >Olvidé mi contraseña</Link>
            </div>
        </div>
    </div>
  )
}

export default Login