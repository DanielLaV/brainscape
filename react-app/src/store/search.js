const payload = {
    query: "js",
    is_logged_in: true
}

const response = await fetch("/api/search-results/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
});

console.log("response")