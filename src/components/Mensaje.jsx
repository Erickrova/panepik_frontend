import React from 'react'
import formatearFecha from '../helpers/formatearFecha'
import useUsuario from '../hooks/useUsuario'

const Mensaje = ({mensaje}) => {

  const {enviadopor} = mensaje
  const {perfil} = useUsuario()
  const fechaFormateada = formatearFecha(mensaje?.createdAt)
  const itsme = enviadopor._id === perfil._id

  return (
    <div className={`p-2 rounded-md ${ itsme ? "ml-auto mr-0 bg-green-500" : "ml-0 mr-auto bg-sky-500"}
      w-2/3 my-2 inline-block`}>
        <p className='text-xl whitespace-pre-wrap break-words mb-4 text-white'>{mensaje?.mensaje}</p>
        <p className='text-xs capitalize text-gray-200 text-right'>enviado por: {itsme ? "Yo" : enviadopor.nombre}</p>
        <p className='text-xs capitalize text-gray-200 text-right'>{fechaFormateada}</p>
    </div>
  )
}

export default Mensaje