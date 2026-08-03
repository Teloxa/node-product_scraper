// Application entry point.
// This file only coordinates the scraping workflow:
// 1. create the scraper
// 2. scrape all configured pages
// 3. save the collected data
// 4. print a small summary for quick verification

const BookScraper = require('./scraper');

async function main() {
    try {
        // Create a new scraper instance. The scraper owns the network,
        // parsing, and file-writing logic.
        const scraper = new BookScraper();
        
        // Run the full scraping process and keep the returned items in memory.
        const books = await scraper.scrapeAll();
        
        // Persist the collected books to the data file so the results can be
        // reviewed later without running the scraper again.
        await scraper.saveToFile('books.json');
        
        // Print a quick summary that confirms the run completed successfully.
        console.log('\n📈 Statistics:');
        console.log(`- Total books: ${books.length}`);
        
        // Show a few sample records to make manual review easier.
        console.log('\n📚 Examples of extracted books:');
        books.slice(0, 5).forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} - ${book.price} ⭐${book.rating}`);
        });

    } catch (error) {
        // Any failure in the scraping pipeline lands here.
        console.error('❌ Error in the main process:', error);
    }
}

// Start the application.
main();