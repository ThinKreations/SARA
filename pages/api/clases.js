export default async function obtenerGrupos(req, res) {
    if (req.method === 'GET'){
      try {
        const response = await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/grupo/`)
        if (!response.ok){
          return res.status(response.status).json({ message: 'Error al obtener los datos' })
        }
        const grupos = await response.json()
        return res.status(200).json(grupos)
      } catch (error){
        return res.status(500).json({ message: 'Error en la solicitud al backend', error })
      }
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }

export const obtenerClase = async (idClase)=>{
    const res=await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/grupo/${idClase}`,{
        method: 'GET',
        mode: 'cors'
    })
    const clase=await res.json()
    console.log(idClase)
    return clase
}