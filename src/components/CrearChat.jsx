import React from 'react'

const PreviewChatEncontrado = ({usuario}) => {
    const {buscarPerfil,perfil} = useUsuario()
    const {setModalSeguidores,setModalSeguidos} = useModals()
    const navigate = useNavigate()
    const amigos = usuario?.seguidores?.includes(perfil._id) && usuario?.seguidos?.includes(perfil._id)
    const handleClick = async () =>{
      await buscarPerfil(usuario.nombre,usuario.codigo)
      setModalSeguidores(false)
      setModalSeguidos(false)
      navigate(`/home/perfil/${usuario.nombre}/${usuario.codigo}`)
    }
  
  return (
    <button 
        onClick={handleClick}
        className = "flex justify-start gap-4 items-center p-1 bg-gray-50 hover:bg-gray-100 rounded-md shadow-md mb-1 border-gray-200 border-b-2 w-full"
        type="button">
        <div >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-slate-700 bg-white rounded-full w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
        <p className='text-xl font-bold'>
            {usuario.nombre}
        </p>
          {amigos ? (
        <div
          title={`${amigos ? "Amigos" : "No son amigos"}`}
          className={`p-2 ${amigos ? " bg-gradient-to-tr from-green-400 to-green-600" : "bg-gradient-to-tr from-gray-400 to-gray-600"} cursor-pointer shadow-md inline-block rounded-full ml-auto mr-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
          
          ) : null}
    </button>
  )
}

export default PreviewChatEncontrado