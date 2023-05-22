const express = require('express');

const { Game } = require('../../database/models');

const gameRouter = express.Router();

// GET: /api/v1/games
// endpoint untuk list games
gameRouter.get('/api/v1/games', async function(req, res) {
    const games = await Game.findAll();

    res.json({
        message: 'success fetching games data',
        result: games,
        error: null,
    });
});

// GET: /api/v1/games/:id
// endpoint untuk detail game
gameRouter.get('/api/v1/games/:id', async function(req, res) {
    const id = req.params.id;

    const game = await Game.findOne({
        where: {
            id,
        },
    });

    res.json({
        message: 'success fetching games detail',
        result: game,
        error: null,
    });
});

// POST: /api/v1/games
// endpoint untuk create game
gameRouter.post('/api/v1/games', async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;

    if (typeof name !== 'string' || typeof description !== 'string') {
        res.status(400);
        res.json({
            message: 'failed when create games',
            result: null,
            error: 'invalid data type',
        });

        return;
    }

    const game = await Game.create({
        name,
        description,
    });

    res.json({
        message: 'success create game',
        result: game,
        error: null,
    });
});

// PUT: /api/v1/games/:id
// endpoint untuk update game per spesifik id
gameRouter.put('/api/v1/games/:id', async function(req, res) {
    const id = req.params.id;

    const newName = req.body.name;
    const newDescription = req.body.description;

    if (typeof newName !== 'string' || typeof newDescription !== 'string') {
        res.status(400);
        res.json({
            message: 'failed when update game',
            result: null,
            error: 'invalid data type',
        });

        return;
    }

    const updated = await Game.update({
        name: newName,
        description: newDescription,
    }, {
        where: {
            id,
        },
    });

    res.json({
        message: 'success update game',
        result: updated,
        error: null,
    });
});

// DELETE: /api/v1/games/:id
// endpoint untuk delete game per spesifik id
gameRouter.delete('/api/v1/games/:id', async function(req, res) {
    const id = req.params.id;

    const deleted = await Game.destroy({
        where: {
            id,
        },
    });

    if (deleted === 0) {
        res.status(404);
        res.json({
            message: 'failed when delete game',
            result: null,
            error: 'game with specific id is not found',
        });

        return;
    }

    res.json({
        message: 'success delete game',
        result: deleted,
        error: null,
    });
});

module.exports = gameRouter;