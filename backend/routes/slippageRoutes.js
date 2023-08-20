const express = require('express');
const router = express.Router();
const slippageController = require('../controllers/slippageController');

router.get('/slippage', async (req, res) => {
  try {
    const slippageData = await slippageController.calculateSlippage();
    res.json(slippageData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
