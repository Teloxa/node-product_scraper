// Utility functions
// These functions can be reused in different parts of the project.


// ---------------------------------------------------------
// Clean text
// ---------------------------------------------------------
//
// Removes unnecessary spaces from a string.
//
// Example:
// "  Hello     world  "
// becomes:
// "Hello world"
//
const cleanText = (text) => {
    // \s+ means "one or more whitespace characters".
    // The "g" flag means "replace all occurrences".
    //
    // trim() removes spaces from the beginning and end.
    return text.replace(/\s+/g, ' ').trim();
};


// ---------------------------------------------------------
// Extract a number from a string
// ---------------------------------------------------------
//
// Finds the first number inside a string.
//
// Example:
// "There are 25 books"
// returns:
// 25
//
// If no number is found, it returns 0.
//
const extractNumber = (text) => {

    // \d+ means "one or more digits".
    //
    // match() searches the string for a pattern
    // that matches the regular expression.
    const match = text.match(/\d+/);

    // If a number was found:
    // convert it from a string to an integer.
    //
    // If no number was found:
    // return 0.
    return match ? parseInt(match[0]) : 0;
};


// ---------------------------------------------------------
// Validate URL
// ---------------------------------------------------------
//
// Checks whether a string is a valid URL.
//
// Example:
// "https://example.com"
// returns true.
//
// "hello"
// returns false.
//
const isValidUrl = (string) => {

    try {
        // URL is a built-in JavaScript class.
        //
        // If the string is a valid URL, this will work
        // without throwing an error.
        new URL(string);

        return true;

    } catch (_) {
        // If URL() throws an error, the string
        // is not a valid URL.
        return false;
    }
};


// ---------------------------------------------------------
// Logging with colors
// ---------------------------------------------------------
//
// Instead of using console.log() everywhere,
// we create different logging functions.
//
// This makes it easier to identify:
// - Information
// - Success
// - Warnings
// - Errors
//
const log = {

    // Cyan
    info: (msg) =>
        console.log(`\x1b[36mℹ️ ${msg}\x1b[0m`),

    // Green
    success: (msg) =>
        console.log(`\x1b[32m✅ ${msg}\x1b[0m`),

    // Yellow
    warning: (msg) =>
        console.log(`\x1b[33m⚠️ ${msg}\x1b[0m`),

    // Red
    error: (msg) =>
        console.log(`\x1b[31m❌ ${msg}\x1b[0m`)
};


// ---------------------------------------------------------
// Export the functions
// ---------------------------------------------------------
//
// module.exports allows other JavaScript files
// to import and use these functions.
//
// Example:
//
// const { cleanText, extractNumber, log } = require('./utils');
//
module.exports = {
    cleanText,
    extractNumber,
    isValidUrl,
    log
};

