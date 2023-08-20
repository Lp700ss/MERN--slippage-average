const axios = require('axios');
const { JSDOM } = require('jsdom');

async function scrapeUSDQuotes() {
  const sources = [
    'https://www.ambito.com/contenidos/dolar.html',
    'https://www.dolarhoy.com',
    'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB',
  ];

  const quotesPromises = sources.map(async (source) => {
    try {
      const response = await axios.get(source);
      const html = response.data;

      const { window } = new JSDOM(html);
      const $ = (selector) => window.document.querySelector(selector);

      // Replace '.buy-price-selector' and '.sell-price-selector' with actual CSS selectors
      // that target the elements containing the buy and sell prices on each source's page.
      // For example:
      const buyPrice = parseFloat($(source).querySelector('.buy-price-selector').textContent);
      const sellPrice = parseFloat($(source).querySelector('.sell-price-selector').textContent);

      return {
        buy_price: buyPrice,
        sell_price: sellPrice,
        source: source,
      };
    } catch (error) {
      console.error(`Error scraping data from ${source}:`, error.message);
      return null;
    }
  });

  const quotes = await Promise.all(quotesPromises);
  return quotes.filter((quote) => quote !== null);
}

module.exports = {
  scrapeUSDQuotes,
};
