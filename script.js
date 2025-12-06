// Quotes API integration
const quotesAPI = 'https://type.fit/api/quotes';
let allQuotes = [];
let currentQuoteIndex = -1;

// Fetch quotes from API
async function fetchQuotes() {
    try {
        const response = await fetch(quotesAPI);
        const quotes = await response.json();
        // Filter for motivational/inspirational quotes (you can customize this)
        allQuotes = quotes.filter(quote => 
            quote.text && quote.text.length > 0
        );
        displayRandomQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
        displayFallbackQuote();
    }
}

// Display a random quote
function displayRandomQuote() {
    if (allQuotes.length === 0) {
        displayFallbackQuote();
        return;
    }

    // Get a random quote different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * allQuotes.length);
    } while (newIndex === currentQuoteIndex && allQuotes.length > 1);
    
    currentQuoteIndex = newIndex;
    const quote = allQuotes[currentQuoteIndex];
    
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Remove fade-in classes
    quoteText.classList.remove('fade-in');
    quoteAuthor.classList.remove('fade-in');
    
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    // Update content after fade out
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        
        // Handle author name (remove ", type.fit" if present)
        let author = quote.author || 'Unknown';
        author = author.replace(/, type\.fit$/, '');
        quoteAuthor.textContent = `— ${author}`;
        
        // Fade in with animation
        quoteText.classList.add('fade-in');
        quoteAuthor.classList.add('fade-in');
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 200);
}

// Display fallback quote if API fails
function displayFallbackQuote() {
    const fallbackQuotes = [
        {
            text: "Hope is being able to see that there is light despite all of the darkness.",
            author: "Desmond Tutu"
        },
        {
            text: "You never know how strong you are until being strong is your only choice.",
            author: "Bob Marley"
        },
        {
            text: "The human spirit is stronger than anything that can happen to it.",
            author: "C.C. Scott"
        }
    ];
    
    const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    quoteText.textContent = `"${randomFallback.text}"`;
    quoteAuthor.textContent = `— ${randomFallback.author}`;
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide the form
    contactForm.style.display = 'none';
    
    // Show thank you message
    thankYouMessage.classList.add('show');
    
    // Reset form after showing message
    contactForm.reset();
    
    // Optional: Show form again after 5 seconds
    setTimeout(() => {
        thankYouMessage.classList.remove('show');
        contactForm.style.display = 'block';
    }, 5000);
});

// New quote button
const newQuoteBtn = document.getElementById('newQuoteBtn');
newQuoteBtn.addEventListener('click', displayRandomQuote);

// Scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchQuotes();
    
    // Observe elements for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));
});

