import React from 'react'
import useAuth from './useAuth'
import useUsuario from './useUsuario'

const useAdmin = () => {
    const {auth} = useAuth()
    const {perfil} = useUsuario()
  return auth._id === perfil._id
}

export default useAdmin