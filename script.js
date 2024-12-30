document.addEventListener('DOMContentLoaded', () => {
    const CATEGORIES = [
        'inspirational', 'life', 'love', 'motivational', 'positive', 'success',
        'wisdom', 'friendship', 'happiness', 'humor', 'hope', 'art', 'nature',
        'science', 'technology', 'travel', 'war', 'peace', 'famous-quotes',
        'movies', 'sports', 'music'
    ];

    const categorySelect = document.getElementById('categorySelect');
    const generateButton = document.getElementById('generateButton');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteDisplay = document.getElementById('quoteDisplay');
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');
    const overlay = document.getElementById('overlay');
    const copyIcon = document.getElementById('copyIcon');

    // Populate category dropdown
    CATEGORIES.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });

    // Fetch and display a random quote
    generateButton.addEventListener('click', () => {
        const category = categorySelect.value;
        if (category) {
            fetchQuote(); // Call fetchQuote to get a random quote
        } else {
            alert('Please select a category');
        }
    });

    function fetchQuote() {
        const url = 'https://api.adviceslip.com/advice';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.slip && data.slip.advice) {
                    quoteText.textContent = data.slip.advice;
                    quoteAuthor.textContent = ''; // API does not return an author
                    quoteDisplay.style.animation = 'none';
                    setTimeout(() => {
                        quoteDisplay.style.animation = '';
                    }, 10);
                } else {
                    quoteText.textContent = 'Could not fetch advice. Please try again!';
                    quoteAuthor.textContent = '';
                }
            })
            .catch(() => {
                quoteText.textContent = 'Failed to fetch advice.';
                quoteAuthor.textContent = '';
            });
    }

    // Sidebar menu functionality
    const toggleSidebar = () => {
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-50%'; // Hide the sidebar
            overlay.style.display = 'none'; // Hide overlay
        } else {
            sidebar.style.left = '0'; // Show the sidebar
            overlay.style.display = 'block'; // Show overlay
        }
    };

    // Menu icon event listener
    menuIcon.addEventListener('click', toggleSidebar);

    // Overlay event listener to close the sidebar
    overlay.addEventListener('click', toggleSidebar);

    // Sidebar links event listener to close the sidebar on click
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

    // Copy the quote to clipboard
    copyIcon.addEventListener('click', () => {
        const quote = quoteText.textContent;
        const author = quoteAuthor.textContent;
        const quoteToCopy = `${quote} ${author}`;

        navigator.clipboard.writeText(quoteToCopy)
            .then(() => {
                alert('Quote copied to clipboard!');
            })
            .catch(() => {
                alert('Failed to copy quote.');
            });
    });
});
