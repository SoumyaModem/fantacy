const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');

// POST /teams - Create a new team
router.post('/', async (req, res) => {
    const { name, playerIds } = req.body;

    if (playerIds.length > 11) {
        return res.status(400).json({ error: 'A team can have a maximum of 11 players.' });
    }

    try {
        const players = await Player.find({ '_id': { $in: playerIds } });
        const totalPoints = players.reduce((sum, player) => sum + player.points, 0);

        const team = new Team({ name, players: playerIds, totalPoints });
        await team.save();
        res.json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /teams/:id - Retrieve a team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('players');
        if (!team) return res.status(404).json({ error: 'Team not found' });
        res.json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
