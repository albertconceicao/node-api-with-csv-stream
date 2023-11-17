export async function json(req, res) {
    const buffers = [];

    for await (const chunk of req) { // Aguarda todo o processamento de leitura de stream para poder realizar o processamento
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()); // Transforma em um tipo primitivo para utilizar no processamento
    } catch {
        req.body = null;
    }
    res.setHeader('Content-Type', 'application/json');
}