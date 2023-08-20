// routes/quotesRoutes.js
const express = require('express');
const router = express.Router();
const { getQuotes } = require('../controllers/quotesController');
const { scrapeUSDQuotes } = require('../utils/webScraper');


router.get('/', async (req, res) => {
    try {
      const quotes = await scrapeUSDQuotes(); 
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

module.exports = router;
