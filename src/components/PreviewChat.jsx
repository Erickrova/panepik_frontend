
import useChat from '../hooks/useChat'
import useUsuario from '../hooks/useUsuario'


const PreviewChat = ({chat}) => {
    
    const {perfil} = useUsuario()
    const {obtenerMensajes,setChat} = useChat()
    const amigo = chat.participantes.filter(participante => participante._id !== perfil?._id)[0]
    const handleClick = (id) =>{
        setChat(chat)
        obtenerMensajes(id)               
    }

  return (
    <button
    onClick={()=>handleClick(chat?._id)} 
    key={chat?._id}
    className = "flex justify-start gap-4 items-center p-1 bg-gray-50 hover:bg-gray-100 rounded-md shadow-md mb-1 border-gray-200 border-b-2 w-full"
    type="button">
    <div >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-slate-700 bg-white rounded-full w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </div>
    <p className='text-xl font-bold'>
        {amigo?.nombre}  # {amigo?.codigo}
    </p>
</button>
  )
}

export default PreviewChat