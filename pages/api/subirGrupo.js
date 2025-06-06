

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