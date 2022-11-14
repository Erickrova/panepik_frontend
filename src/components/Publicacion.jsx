import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import formatearFecha from '../helpers/formatearFecha'
import useAuth from '../hooks/useAuth'
import useUsuario from '../hooks/useUsuario'

const Publicacion = ({publicacion,creador}) => {

    const [destello,setDestello] = useState(false)
    const [totalDestellos,setTotalDestellos] = useState(0)

    const fechaFormateada = formatearFecha(publicacion.createdAt)
    const {perfilBuscado,perfil,publicaciones,setPublicaciones,obtenerPerfil} = useUsuario()
    const {auth} = useAuth()
    const location = useLocation()
   
    const admin = publicacion.creador === auth._id || publicacion.creador._id === auth._id
    const isPerfil = location.pathname === "/home/perfil"
    useEffect(()=>{
      const destello = publicacion?.destellos.some(destello => destello === perfil._id)
      setDestello(destello)
    },[])
    useEffect(()=>{
      let totalDestellos = publicacion.destellos.length
      setTotalDestellos(totalDestellos)
    },[])

    const handleEliminarPublicacion = async () =>{
      if(confirm("¿deseas eliminar esta publicación?")){
        try {
          const token = localStorage.getItem("token")
          if(!token) return
          const config = {
              headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clienteAxios.delete(`/publicaciones/eliminar-publicacion/${publicacion._id}`,config)
          await obtenerPerfil()
          const publicacionesState = [...publicaciones]
          const publicacionesFiltradas = publicacionesState.map(publi => publi._id.toString() !== data.id.toString() ? publi : false).filter(Boolean)
          setPublicaciones(publicacionesFiltradas)
          
        } catch (error) {
          alert(error?.response?.data?.msg)
          console.clear()
        }
      }
    }
    const handleDestello = async ()=>{
      try {
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await clienteAxios(`/publicaciones/destello/${publicacion._id}`,config)
        setDestello(data.msg)
        setTotalDestellos(data.destellos)
      } catch (error) {
        alert(error.response.data.msg)
        console.clear()
      }
    }

  return (
    <div className='w-full md:w-3/4 mx-auto bg-gray-200 p-4 mb-4 rounded-md '>
        <div className='flex justify-between items-center border-b-2 border-gray-300'>
            <div>
            <Link
              className='flex capitalize gap-2 items-center'
              to={`${ isPerfil
                    ? "/home/perfil"
                    :`/home/perfil/${publicacion?.creador?.nombre || creador?.nombre || perfilBuscado?.nombre}/${publicacion?.creador?.codigo || creador?.codigo || perfilBuscado?.codigo}`
              }`}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-slate-700 bg-white rounded-full w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              {publicacion?.creador?.nombre || creador?.nombre || perfilBuscado?.nombre}
            </Link>
            <h2 className='mb-2 text-xl font-bold  '>{publicacion.titulo}</h2>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm text-gray-700 p-2'>{fechaFormateada} </p>
              {admin ? (
                <button type='button'
                  onClick={handleEliminarPublicacion}
                >
                  Eliminar
                </button>
              ) : null}
            </div>
        </div>
        <div className='p-2 mt-2 bg-opacity-70 bg-gray-300'>
          <p className='whitespace-pre-line max-h-32 overflow-y-auto overflow-x-hidden text-sm text-gray-800 '>{publicacion.descripcion}</p>
        </div>
        <div 
          className='pt-2 flex gap-1'
        >
          <button
            type='button'
            className='ml-1 text-xl font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md p-2'
          >
            {totalDestellos}
          </button>
          <button
            type='button'
            onClick={handleDestello}
            className={`flex gap-1 items-center text-gray-800 ${destello ? "bg-white hover:bg-gray-100 px-2 py-1 rounded-md font-bold" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${
              destello ? "fill-yellow-400 h-10 w-10" : " fill-black"
            }`}>
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
            </svg>
            {destello ? "Destellado" : "Destellar"}
          </button>
        </div>

    </div>
  )
}

export default Publicacion