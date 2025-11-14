import express from 'express';
import fruit from  './datajs';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/fruits', async (req, res) => {
    try {
        const [rows] = await fruit.query('SELECT * FROM fruits');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Nem sikerült a lekérdezés :(' });
    }
});

app.listen(PORT, () => {
    console.log(`Fut a szervered! http://localhost:${PORT}`); 
});