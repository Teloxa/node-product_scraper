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

            const response = await axios.get(url, {
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
    }
    
    // method to extract book data from the HTML content
    extractBooks(html) {
        const $ = cheerio.load(html);
        const books = [];

        // Iterate through each book item on the page
        $('article.product_pod').each((index, element) => {
            const title = $(element).find('h3 a').attr('title');
            const price = $(element).find('.price_color').text();
            const availability = $(element).find('.instock.availability')
            .text().trim();

            // extract qualification from the class attribute
            const ratingClass = $(element).find('.star-rating').attr('class');
            const ratingMap = {
                'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5
            };
            const rating = ratingMap[ratingClass?.split(' ')[1]] || 0; 

            // Extract URL of the book
            const bookUrl = $(element).find('h3 a').attr('href');

            book.push({
                title, 
                price,
                availability,
                rating,
                url: bookUrl
            });
        });
    } 
}