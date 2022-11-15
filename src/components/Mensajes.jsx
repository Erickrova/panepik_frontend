import useChat from '../hooks/useChat'
import Mensaje from './Mensaje'

const Mensajes = () => {
   const {mensajes} = useChat()
  return (
    <div id="bajarscroll" className="overflow-y-scroll  overflow-x-hidden h-full flex flex-col mt-4 p-2 ">
    {mensajes?.length ? (
        mensajes.map(mensaje => (
        <Mensaje key={mensaje?._id} mensaje={mensaje} />))
        ): <p className="text-xl text-white text-center font-bold">No hay mensajes Aun</p>}
        <div id='bajar'></div>
</div>
  )
}

export default Mensajes