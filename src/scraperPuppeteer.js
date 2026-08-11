
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class DynamicScraper {
    constructor() {
        // These will store our browser and page instances.
        // They start as null because we haven't created them yet.
        this.browser = null;
        this.page = null;
    }

    async init() {
        // Launch a Chromium browser.
        // headless: true means the browser runs without a visible window.
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

        // Create a new browser tab/page.
        this.page = await this.browser.newPage();

        // Set the size of the browser window.
        // This can be useful because some websites change their layout
        // depending on the screen size.
        await this.page.setViewport({
            width: 1280,
            height: 800
        });

        // Set a custom User-Agent.
        // Websites can use the User-Agent to identify the browser/client
        // making the request.
        await this.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        );
    }

    async scrapeDynamicContent() {
        console.log('🎭 Scraping with Puppeteer...');

        // Navigate to the website.
        //
        // waitUntil: 'networkidle2' tells Puppeteer to wait until
        // there are very few network connections still active.
        // This helps when the page loads content dynamically.
        await this.page.goto('https://books.toscrape.com/', {
            waitUntil: 'networkidle2'
        });

        // Wait until at least one book element exists on the page.
        //
        // This prevents us from trying to extract data before
        // the page has finished rendering the books.
        await this.page.waitForSelector('article.product_pod');

        // Execute JavaScript inside the webpage.
        //
        // page.evaluate() runs the function inside the browser,
        // which means we can use document.querySelector(), etc.
        const books = await this.page.evaluate(() => {

            // Find all elements that represent a book.
            const items = document.querySelectorAll(
                'article.product_pod'
            );

            // Convert the NodeList into a regular JavaScript array.
            // Then use map() to create an object for each book.
            return Array.from(items).map(item => ({

                // Get the book title from the "title" attribute.
                //
                // ?. is optional chaining. It prevents an error
                // if the element doesn't exist.
                //
                // || 'No title' provides a default value if
                // the title cannot be found.
                title:
                    item.querySelector('h3 a')?.getAttribute('title')
                    || 'No title',

                // Get the price text.
                //
                // If the price element doesn't exist,
                // return 'N/A' instead.
                price:
                    item.querySelector('.price_color')?.textContent
                    || 'N/A',

                // Get the rating.
                //
                // The class looks something like:
                // "star-rating Three"
                //
                // split(' ')[1] gets the second class:
                // "Three"
                rating:
                    item.querySelector('.star-rating')
                        ?.className
                        ?.split(' ')[1]
                    || '0'
            }));
        });

        // Display how many books were extracted.
        console.log(
            `✅ Extracted ${books.length} books dynamically`
        );

        // Return the array of books to whoever called this method.
        return books;
    }

    async close() {
        // Check if a browser instance exists before trying to close it.
        if (this.browser) {
            // Close the Chromium browser and all its pages.
            await this.browser.close();
        }
    }
}


// Example of how to use the DynamicScraper class.
async function useDynamicScraper() {

    // Create a new scraper instance.
    const scraper = new DynamicScraper();

    try {
        // Start the browser and create the page.
        await scraper.init();

        // Scrape the books from the website.
        const books = await scraper.scrapeDynamicContent();

        // Display only the first 3 books.
        //
        // slice(0, 3) returns elements from index 0 up to,
        // but not including, index 3.
        console.log('Books:', books.slice(0, 3));

    } finally {
        // This runs even if an error occurs in the try block.
        //
        // It is important to close the browser so we don't
        // leave Chromium processes running in the background.
        await scraper.close();
    }
}


// Export the class so it can be imported and used
// from another JavaScript file.
module.exports = DynamicScraper;
