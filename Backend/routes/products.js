import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/products', (req, res) => {
    const filePath = path.join(__dirname, '../data/products.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Could not read file' });
        res.json(JSON.parse(data));
    });
});

export default router;
