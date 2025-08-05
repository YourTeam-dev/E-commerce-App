const express = require('express');
const router = express.Router();
const historicController = require('../../controller/settings/historic.controller');

// Routes
router.get('/user/:userId', historicController.getUserHistoric);
router.post('/', historicController.createHistoric);
router.get('/', historicController.getAllHistoric);
router.delete('/:id', historicController.deleteHistoric);

module.exports = router;
