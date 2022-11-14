import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`
    ${alerta.type === "error" && " bg-red-500 "}
    ${alerta.type === "success" && " bg-lime-500 "}
    ${alerta.type === "update" && " bg-sky-500 "}
    
    block w-full rounded-md text-white font-bold text-center py-3 px-5
    `} >{alerta.msg}</div>
  )
}


export default Alerta