import { useEffect } from "react"
import { useState } from "react"
import {Link, useParams} from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const ConfirmarCuenta = () => {

    const [alerta,setAlerta] = useState({})
    const {token} = useParams()

    useEffect(()=>{
        const confirmar = async () =>{
            try {
                const {data} = await clienteAxios(`/usuarios/confirmar-usuario/${token}`)
                setAlerta({
                    msg: data.msg,
                    type: "update"
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    type: "error"
                })
            }
        }
        confirmar()
    },[])
   
    const {msg} = alerta

  return (
    <div className=" md:w-3/4 lg:w-1/2 md:mx-auto mx-4 gap-2 flex flex-col justify-center min-h-screen items-center">
        {msg ? <Alerta alerta={alerta}/> : null}
        <div className="flex justify-between gap-2 w-full  md:w-2/3 mx-auto mt-4 ">
            <Link to="/" className="text-gray-700" >¿Ya tienes una cuenta? Inicia Sesion</Link>
            <Link to="/" className="text-gray-700" >Olvidé mi contraseña</Link>
        </div>
    </div>
    
  )
}

export default ConfirmarCuenta