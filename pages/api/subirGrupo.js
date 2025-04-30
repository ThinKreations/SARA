/*export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }
  
    try {
      const { texto } = req.body;
  
      if (!texto) {
        return res.status(400).json({ message: 'No se envió texto' });
      }
  
      const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/grupo/', {
        method: 'POST',
        headers: formData.getHeaders(),
        body: formData,
      })
  
      if (!response.ok) throw new Error('Error en el backend externo');
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }*/

    export default async function handler(req, res) {
        const { file } = req.body;
        const response = await fetch('https://upiicsara-225fbcffb78e.herokuapp.com/grupo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ file })  // Enviamos el archivo como JSON
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Error en el back', data);
        res.status(200).json(data);
    }