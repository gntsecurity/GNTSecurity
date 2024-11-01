// Array to store the pages and their content for search
const pages = [
    { title: 'Hardware', url: '/pages/hardware/hardware.html', content: 'Cables, Computers, Networking' },
    { title: 'Software', url: '/pages/software/software.html', content: 'Business Applications, Security' },
    { title: 'Services', url: '/pages/services/services.html', content: 'IT Support, Consultancy' },
    { title: 'IT Solutions', url: '/pages/it-solutions/it-solutions.html', content: 'Cybersecurity, Cloud Solutions' },
    { title: 'Brands', url: '/pages/brands/brands.html', content: 'Apple, Microsoft, Cisco' },
    { title: 'Research Hub', url: '/pages/research-hub/research-hub.html', content: 'Whitepapers, Case Studies' },
    // Add more pages as needed
];

// Function to handle the search
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    if (!query) return; // If query is empty, do nothing

    const searchResults = pages.filter(page =>
        page.title.toLowerCase().includes(query) || page.content.toLowerCase().includes(query)
    );

    let resultsHtml = '<h3>Search Results:</h3><ul>';
    if (searchResults.length > 0) {
        searchResults.forEach(result => {
            resultsHtml += `<li><a href="${result.url}">${result.title}</a></li>`;
        });
    } else {
        resultsHtml += '<p>No results found.</p>';
    }
    resultsHtml += '</ul>';
    document.getElementById('search-results').innerHTML = resultsHtml;
});
