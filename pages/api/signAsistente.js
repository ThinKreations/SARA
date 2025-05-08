export async function generarInvitado (idClase){
    const response = await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/nuevoinvitado/${idClase}`,{
        method:'POST'
    })
    const data = await response.json()
    console.log("Invitado Generado: ", data)
    return data;
}