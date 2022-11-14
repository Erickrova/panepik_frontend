import useModals from "../hooks/useModals"
import PreviewUsuarioBuscado from "./PreviewUsuarioBuscado"

const ModalSeguidos = ({seguidos}) => {
  const {setModalSeguidos,modalSeguidos} = useModals()

  return (
    modalSeguidos ? (

      <div
      className="fixed z-50 inset-0 md:p-0 p-8 flex flex-col justify-center items-center w-screen h-screen bg-opacity-50 bg-gray-500"
      >
      <div className="relative z-30 md:w-1/2 p-2 max-h-96 overflow-y-auto overflow-x-hidden">
      <h2 className='text-center text-3xl font-black font-montserrat mb-4 text-white bg-sky-500 rounded-md'>Seguidos</h2>
        <button
          type="button"
          onClick={()=> setModalSeguidos(false)}
          className="bg-red-400 w-3 h-3 flex justify-center items-center text-white font-bold shadow-md right-4 top-2 p-4 rounded-3xl absolute "
        >
            X
        </button>
        {seguidos?.length ? seguidos.map(usuario =>(
          <PreviewUsuarioBuscado key={usuario._id} usuario={usuario} />
          )):<p className='text-xl text-center font-black bg-white p-2 rounded-md'>Esta cuenta no sigue a nadie aun</p>}
      </div>
  
    </div>
    ):null
  )
}

export default ModalSeguidos