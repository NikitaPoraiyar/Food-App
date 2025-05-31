import express from 'express';
import Table from '../models/table.js';

const router = express.Router();

router.get('/tables', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tables', async (req, res) => {
    try {
        const newTable = new Table(req.body);
        await newTable.save();
        res.status(201).json(newTable);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/tables/:id', async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        let tables = await Table.find().sort({ createdAt: 1 });
        tables = await Promise.all(
            tables.map(async (table, index) => {
                const updatedName = `${index + 1}`;
                table.name = updatedName;
                await table.save();
                return table;
            })
        );
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
