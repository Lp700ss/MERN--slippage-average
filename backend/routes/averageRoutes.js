// routes/averageRoutes.js
const express = require('express');
const router = express.Router();
const averageController = require('../controllers/averageController');

router.get('/average', async (req, res) => {
  try {
    const averageData = await averageController.calculateAverage();
    if (!averageData) {
      return res.status(404).json({ error: 'No quotes found' });
    }
    res.json(averageData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
