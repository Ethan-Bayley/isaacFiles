// Load favorites from localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteImages')) || [];
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        if (favorites.includes(title)) {
            card.classList.add('favorite');
            card.querySelector('.favorite-btn').classList.add('active');
        }
    });
}

// Save favorites to localStorage
function saveFavorites() {
    const favorites = [];
    document.querySelectorAll('.image-card.favorite').forEach(card => {
        const title = card.querySelector('h3').textContent;
        favorites.push(title);
    });
    localStorage.setItem('favoriteImages', JSON.stringify(favorites));
}

// Toggle favorite status
function toggleFavorite(button) {
    button.classList.toggle('active');
    button.parentElement.parentElement.classList.toggle('favorite');
    saveFavorites();
}

// Get all visible image cards
function getVisibleCards() {
    const cards = document.querySelectorAll('.image-card');
    const visibleCards = [];
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCards.push(card);
        }
    });
    return visibleCards;
}

// Get current card index among visible cards
function getCurrentCardIndex() {
    const visibleCards = getVisibleCards();
    return visibleCards.indexOf(currentCard);
}

// Navigate to next image
function nextImage() {
    const visibleCards = getVisibleCards();
    const currentIndex = getCurrentCardIndex();
    if (currentIndex < visibleCards.length - 1) {
        openModal(visibleCards[currentIndex + 1]);
    }
}

// Navigate to previous image
function previousImage() {
    const visibleCards = getVisibleCards();
    const currentIndex = getCurrentCardIndex();
    if (currentIndex > 0) {
        openModal(visibleCards[currentIndex - 1]);
    }
}

// Filter gallery by category
function filterGallery(category, event) {
    event.preventDefault();
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter cards
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
        if (category === 'favorite') {
            if (card.classList.contains('favorite')) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        } else if (category === 'archive') {
            // You can add archive functionality later
            card.style.display = 'none';
        }
    });
}

// Show all images
function showAll(event) {
    event.preventDefault();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.image-card').forEach(card => {
        card.style.display = '';
    });
}

// Modal functionality
let currentCard = null;

function openModal(card) {
    currentCard = card;
    const img = card.querySelector('img');
    const title = card.querySelector('h3').textContent;
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalFavoriteBtn = document.getElementById('modalFavoriteBtn');
    const modal = document.getElementById('imageModal');
    
    // Use full-image attribute if it exists, otherwise use thumbnail
    const fullImageSrc = img.getAttribute('data-full-image') || img.src;
    modalImage.src = fullImageSrc;
    modalImage.alt = img.alt;
    modalTitle.textContent = title;
    
    // Update the favorite button state based on the card's state
    if (card.classList.contains('favorite')) {
        modalFavoriteBtn.classList.add('active');
    } else {
        modalFavoriteBtn.classList.remove('active');
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentCard = null;
}

function toggleModalFavorite() {
    if (currentCard) {
        const btn = currentCard.querySelector('.favorite-btn');
        toggleFavorite(btn);
        
        // Update modal button state
        const modalFavoriteBtn = document.getElementById('modalFavoriteBtn');
        if (currentCard.classList.contains('favorite')) {
            modalFavoriteBtn.classList.add('active');
        } else {
            modalFavoriteBtn.classList.remove('active');
        }
    }
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key, navigate with arrow keys
window.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    const isModalOpen = modal.style.display === 'flex';
    
    if (event.key === 'Escape') {
        closeModal();
    } else if (isModalOpen) {
        if (event.key === 'ArrowLeft') {
            previousImage();
        } else if (event.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Allow clicking on image card to expand or view details
document.addEventListener('DOMContentLoaded', function() {
    // Load favorites from localStorage when page loads
    loadFavorites();
    
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking the favorite button
            if (!e.target.classList.contains('favorite-btn')) {
                openModal(this);
            }
        });
    });
});
