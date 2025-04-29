export default async function handler(req, res){
    try {
        const { numemp, password } = req.body
        const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numemp, password })
        });
        const data = await response.json()
        if (!response.ok || data === false){
            console.log('Login fallido')
            return res.status(401).json({ message: 'Credenciales incorrectas', error: data })
        }else{
            console.log('Login exitoso')
            return res.status(200).json({ message: 'Inicio exitoso', data: data })
        }
    } catch (error){
        console.error('Error al conectar:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}
