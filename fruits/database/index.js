import express from 'express';
import fruit from  './data.js';
import 'dotenv/config';

const app = express();
const SERVERPORT = process.env.SERVERPORT || 3000;

app.get('/fruits', async (req, res) => {
    try {
        const [rows] = await fruit.query('SELECT * FROM fruits');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a lekérdezés :(' });
    }
});

app.get('/fruits/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await fruit.query('SELECT * FROM fruits WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a lekérdezés :(' });
    }
});

app.post('/fruits', express.json(), async (req, res) => {
    const { name, color, price } = req.body;
    try {
        const [result] = await fruit.query('INSERT INTO fruits (name, color, price) VALUES (?, ?, ?)', [name, color, price]);
        res.status(201).json({ id: result.insertId, name, color, price });
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a beszúrás !' });
    }
});

app.put('/fruits/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name, color, price } = req.body;
    try {
        const [result] = await fruit.query('UPDATE fruits SET name = ?, color = ?, price = ? WHERE id = ?', [name, color, price, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nem található a gyümölcs ezzel az ID-vel' });
        } else {
            res.json({ id, name, color, price });
        }
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a frissítés !' });
    }
});

app.delete('/fruits/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await fruit.query('DELETE FROM fruits WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nem található a gyümölcs ezzel az ID-vel' });
        } else {
            res.json({ message: 'Gyümölcs sikeresen törölve' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a törlés ! :((' });
    }
});

app.listen(SERVERPORT, () => {
    console.log(`Fut a szervered! http://localhost:${SERVERPORT}`); 
});