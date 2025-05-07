export default async function handler(req, res) {
    if (req.method === 'POST'){
        try{
            const {secuencia, periodo, idMateria, boleta} = req.body
            const response = await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/grupo/${secuencia+periodo+idMateria}?secuencia=${secuencia}&periodo=${periodo}&idMateria=${idMateria}&boleta=${boleta}` ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({secuencia, periodo, idMateria, boleta})
            })
            const data = await response.json()
            if (!response.ok){
                return res.status(response.status).json({ message: 'Error al maracar la asistencia', error: data })
            }
            return res.status(200).json({message: 'Asistencia registrada', data: data})
        }catch (error){
            console.error('Error al conectar:', error)
            return res.status(500).json({message: '500'})
        }
    }else if(req.method === 'PUT'){
        console.log('BUENO')
        try {
            const {secuencia, periodo, idMateria, boleta, fecha, cambio} = req.body
            const response = await fetch(`https://upiicsara-225fbcffb78e.herokuapp.com/grupo/${secuencia+periodo+idMateria}?secuencia=${secuencia}&periodo=${periodo}&idMateria=${idMateria}&boleta=${boleta}&fecha=${fecha}&cambio=${cambio}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({secuencia, periodo, idMateria, boleta, fecha, cambio})
            });
            if (response.ok) {
              return res.status(200).json({ message: 'Asistencia marcada correctamente' });
            } else {
              return res.status(500).json({ message: 'Error al marcar la asistencia' });
            }
        } catch(err){
            return res.status(500).json({ message: 'Error al conectar con el servidor' });
        }
        }else{
          return res.status(405).json({ message: 'Método no permitido' })
        }
    }