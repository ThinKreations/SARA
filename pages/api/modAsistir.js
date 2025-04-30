export const modAsistir = async (secuencia, periodo, idMateria, boleta, fecha, cambio)=>{
    const res = await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/grupo/${secuencia+periodo+idMateria}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({secuencia, periodo, idMateria, boleta})
    })

}