 The Horonoplus Files

A beautiful, responsive website for displaying and organizing image collections.

## Features

- 📸 **Image Gallery**: Responsive grid layout that adapts to any screen size
- ⭐ **Favorites**: Mark your favorite images with the heart icon
- 🎨 **Beautiful Design**: Modern gradient background with smooth animations and hover effects
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- 🔍 **Navigation**: Filter between all images and favorites
- ✨ **Smooth Animations**: Fade-in effects and hover transitions

## Files Included

- `index.html` - Main website structure
- `style.css` - Complete styling and responsive design
- `script.js` - Interactive features (favorites, filtering)
- `images/` - Folder for your image files

## Getting Started

1. **Add Images**: Place your images in the `images/` folder
2. **Edit Gallery**: Update `index.html` to add or modify image cards
3. **Open in Browser**: Double-click `index.html` or serve it locally
4. **Customize**: Edit `style.css` to change colors, fonts, and layout

## How to Add Images

Edit `index.html` and add new image cards inside the `.gallery` div:

```html
<div class="image-card">
    <img src="images/your-image.jpg" alt="Image Description">
    <div class="image-info">
        <h3>Your Image Title</h3>
        <button class="favorite-btn" onclick="toggleFavorite(this)">♡</button>
    </div>
</div>
```

## Customization

- Edit colors in `style.css` by changing the gradient in the `body` selector
- Modify grid layout in `.gallery` by changing `grid-template-columns`
- Adjust card sizes and spacing with the `gap` property
- Update header text and footer in `index.html`

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge)

---

Enjoy organizing your image collection! 📷