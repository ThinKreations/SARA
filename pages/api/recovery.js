export default async function recuperar(req, res){
    try {
        const { numemp, correo } = req.body
        const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/recuperar-cuenta/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numemp, correo })
        });
        const data = await response.json()
        if (!response.ok){
            console.log('Solicitud fallida')
            return res.status(401).json({ message: 'ERROR ERROR ERROR', error: data })
        }else{
            console.log('Solicitud realizada')
            return res.status(200).json({ message: 'Recuperación en proceso', data: data })
        }
    } catch (error){
        console.error('Error al conectar:', error)
        return res.status(500).json({ message: 'Error interno del servidor XD' })
    }
}
