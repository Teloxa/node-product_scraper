// scrapping logic
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// set up
const BASE_URL = 'https://books.toscrape.com/catalogue/page-';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

class bookScraper {
constructor() {
    this.books = [];
    this.pagesToScrape = 5;
    }

    // Method to scrape book data from the website
    async fetchPage(pageNumber) {
        try {
            const url = `${BASE_URL}${pageNumber}.html`;
            console.log(` Page Scrapping ${pageNumber}...`);

            const response = await axios.get(url{
                headers: {
                    'User-Agent': USER_AGENT
                },
                timeout: 10000
            });
            return response.data
        } catch(error) {
            console.error(`Error with the page ${pageNumber}`, error.message);
            return null;
        }
    } }