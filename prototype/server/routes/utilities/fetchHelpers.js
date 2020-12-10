const fetch = require('node-fetch');

// Used to wait in case we need to retry
async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Mechanism to retry calling the API in case we reach the rate limit
async function fetch_retry(queryString, options, retries) {
    let response = await fetch(queryString, options);
    if (response.status == 429) {
        if (retries > 0) {
            await wait(response.headers.get("retry-after") * 1000).then(console.log("retrying"));
            return await fetch_retry(options, queryString, retries - 1);
        } else {
            return [];
        }
    } else {
        return response
    }
}

module.exports = { wait, fetch_retry };