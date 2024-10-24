const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /players - Retrieve all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /players - Add a new player (for testing purposes)
router.post('/', async (req, res) => {
    const { name, position, points } = req.body;
    const player = new Player({ name, position, points });
    try {
        await player.save();
        res.json(player);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
