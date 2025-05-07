export default async function update(req, res){
    try {
        const {password, numemp} = req.body
        console.log(req.body)
        const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/cambiar-password/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, numemp })
        });
        const data = await response.json()
        if (!response.ok || data === false){
            console.log('Cambio fallido')
            return res.status(401).json({ message: 'Credenciales incorrectas', error: data })
        }else{
            console.log('Cambio exitoso')
            return res.status(200).json({ message: 'Inicio exitoso', data: data })
        }
    } catch (error){
        console.error('Error al conectar:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}
