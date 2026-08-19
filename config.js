require ('dotenv').config();

module.exports  = {
  // The base URL of the website to scrape. This is the starting point for the scraper.
  baseUrl: process.env.BASE_URL || 'https://books.toscrape.com/',
  // The maximum number of pages to scrape. This limits the scraping process to avoid excessive requests.
  maxPages: parseInt(process.env.MAX_PAGES) || 50,
  // The output file where the scraped data will be saved. This allows for easy review and analysis of the results.
  timeOut: parseInt(process.env.TIMEOUT) || 10000,
  // The timeout in milliseconds for network requests. This helps to prevent the scraper from hanging indefinitely on slow responses.
  userAgent: process.env.USER_AGENT || 'Mozilla/5.0 [en] (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36'
}
  