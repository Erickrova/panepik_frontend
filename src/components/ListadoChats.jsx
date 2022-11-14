import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'
import useUsuario from '../hooks/useUsuario'
import Buscador from './Buscador'
import BuscadorChat from './BuscadorChat'
import PreviewChat from './PreviewChat'

const ListadoChats = () => {
    const {perfil} = useUsuario()
    const [chats,setChats] = useState([])
    useEffect(()=>{
        const obtenerChats = async () =>{
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(perfil._id){
                try {
                    const {data} = await clienteAxios(`/chat/obtener-chats`,config)
                    setChats(data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        obtenerChats()
    },[perfil])
  return (
    <div className=" bg-white relative w-1/3 min-w-fit h-full flex flex-col">
    <div className="absolute top-0 bg-gray-50 shadow-md w-full flex justify-center p-2">
        <BuscadorChat chats={chats} />
    </div>
    <div className="  overflow-y-auto overflow-x-hidden h-full mt-16 mb-20">
        {chats.map(chat =>(
            <PreviewChat key={chat?._id} chat={chat} />
        ))}
    </div>

</div>
  )
}

export default ListadoChats