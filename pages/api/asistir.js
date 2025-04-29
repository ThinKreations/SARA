export default async function handler(req, res) {
    if (req.method === 'PUT') {
      const { secuencia, periodo, idMateria, boleta, status, idClase, fecha } = req.query;
  
      try {
        const response = await fetch(`https://tu-backend-en-heroku.herokuapp.com/grupo/${idClase}?secuencia=${secuencia}&periodo=${periodo}&idMateria=${idMateria}&boleta=${boleta}&status=${status}&fecha=${fecha}`, {
          method: 'PUT',
        });
  
        if (response.ok) {
          return res.status(200).json({ message: 'Asistencia marcada correctamente' });
        } else {
          return res.status(500).json({ message: 'Error al marcar la asistencia' });
        }
      } catch (err) {
        return res.status(500).json({ message: 'Error al conectar con el servidor' });
      }
    } else {
      return res.status(405).json({ message: 'Método no permitido' });
    }
  }