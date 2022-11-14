
const formatearFecha = fecha =>{

    // const fechaFormat = fecha.split("T")[0].split("-")
    // const fechaFormatFinal = `${fechaFormat[1]}-${fechaFormat[2]}-${fechaFormat[0]}`

    const nuevaFecha = new Date(fecha)

    const opt = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        
    }
    return nuevaFecha.toLocaleDateString("es-ES",opt)
}

export default formatearFecha