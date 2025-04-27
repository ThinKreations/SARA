export default async function handler(req, res){
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Método no permitido' })
    }
    try{
        const {numemp, password} = req.body

        const response = await fetch('http://127.0.0.1:8000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({numemp, password})
        })
        const data = await response.json()
        if (!response.ok){
            return res.status(response.status).json({ message: 'Error al iniciar', error: data })
        }
        return res.status(200).json({message: 'Inicio exitoso!', data: data})
    }catch (error){
        console.error('Error al conectar:', error)
        return res.status(500).json({message: '500'})
    }
}