document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
});

function includeHTML() {
    let elements = document.querySelectorAll('[include-html]');
    elements.forEach(element => {
        let file = element.getAttribute('include-html');
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error('Page not found');
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('include-html');
                    includeHTML(); // Call again to handle nested includes
                })
                .catch(error => console.error('Error:', error));
        }
    });
}
