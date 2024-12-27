const CATEGORIES = [
    'inspirational', 'life', 'love', 'motivational', 'positive', 'success',
    'wisdom', 'friendship', 'happiness', 'humor', 'hope', 'art', 'nature',
    'science', 'technology', 'travel', 'war', 'peace', 'famous-quotes',
    'movies', 'sports', 'music'
];

document.addEventListener('DOMContentLoaded', () => {
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

    generateButton.addEventListener('click', () => {
        const category = categorySelect.value;
        if (category) {
            fetchAdvice(); // Call fetchAdvice instead of category-specific fetching
        } else {
            alert('Please select a category');
        }
    });

    function fetchAdvice() {
        const url = "https://api.adviceslip.com/advice";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.slip && data.slip.advice) {
                    quoteText.textContent = data.slip.advice;
                    quoteAuthor.textContent = ''; // Advice Slip API does not return an author
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

    menuIcon.addEventListener('click', () => {
        sidebar.style.left = '0';
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', () => {
        sidebar.style.left = '-200px';
        overlay.style.display = 'none';
    });

    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.style.left = '-200px';
            overlay.style.display = 'none';
        });
    });

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
