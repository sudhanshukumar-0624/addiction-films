# How to Add Portfolio Images

## Folder Structure
```
Web site/
├── images/
│   ├── logo.png (Your logo/icon file)
│   ├── hero-bg.jpg (Hero section background image)
│   ├── about-us.jpg (About section image)
│   ├── cta-banner.jpg (Call-to-action banner image)
│   ├── service-1.jpg (Wedding Photography service)
│   ├── service-2.jpg (Videography service)
│   ├── service-3.jpg (Pre-Wedding service)
│   ├── service-4.jpg (Event Coverage service)
│   ├── service-5.jpg (Corporate Events service)
│   ├── service-6.jpg (Birthday Parties service)
│   ├── gallery-1.jpg (Gallery image 1)
│   ├── gallery-2.jpg (Gallery image 2)
│   ├── gallery-3.jpg (Gallery image 3)
│   ├── gallery-4.jpg (Gallery image 4)
│   ├── gallery-5.jpg (Gallery image 5)
│   └── portfolio/
│       ├── wedding-1.jpg
│       ├── prewedding-1.jpg
│       ├── reception-1.jpg
│       ├── candid-1.jpg
│       ├── traditional-1.jpg
│       └── portraits-1.jpg
```

## Instructions

### 1. Add Your Logo
- Place your logo file in the `images/` folder
- Name it `logo.png` (or update the HTML if using a different name)
- Recommended size: 200x200 pixels (transparent background works best)
- Format: PNG (for transparency) or JPG

### 2. Add Hero Background Image
- Place your hero background image in the `images/` folder
- Name it `hero-bg.jpg` (or update the CSS if using a different name)
- Recommended size: 1920x1080 pixels or higher
- Format: JPG or PNG
- This will be the main background image on the homepage

### 3. Add About Section Image
- Place your about section image in the `images/` folder
- Name it `about-us.jpg`
- Recommended size: 800x600 pixels or higher
- Format: JPG or PNG

### 4. Add CTA Banner Image
- Place your call-to-action banner image in the `images/` folder
- Name it `cta-banner.jpg`
- Recommended size: 1920x600 pixels or higher
- Format: JPG or PNG

### 5. Add Service Images
- Place 6 service images in the `images/` folder
- Name them: `service-1.jpg`, `service-2.jpg`, `service-3.jpg`, `service-4.jpg`, `service-5.jpg`, `service-6.jpg`
- Recommended size: 600x400 pixels
- Format: JPG or PNG
- Services: Wedding Photography, Videography, Pre-Wedding, Event Coverage, Corporate Events, Birthday Parties

### 6. Add Gallery Images
- Place 5 gallery images in the `images/` folder
- Name them: `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`, `gallery-4.jpg`, `gallery-5.jpg`
- Recommended size: 800x600 pixels
- Format: JPG or PNG
- These appear in a horizontal strip after the services section

### 7. Add Your Photos
Place your wedding photos in the `images/portfolio/` folder with these exact names:
   - `wedding-1.jpg` - Main wedding ceremony photo (will be large)
   - `prewedding-1.jpg` - Pre-wedding shoot photo
   - `reception-1.jpg` - Reception photo
   - `candid-1.jpg` - Candid moments photo
   - `traditional-1.jpg` - Traditional rituals photo
   - `portraits-1.jpg` - Couple portraits photo (will be large)

### 3. Image Requirements:
   - Format: JPG, JPEG, or PNG
   - Recommended size: 1200x800 pixels or higher
   - Keep file size under 500KB for faster loading

### 4. To Add More Photos
   - Open `index.html`
   - Copy any portfolio-item div
   - Change the image src to your new image path
   - Update the category, title, and description

## Example: Adding a New Photo

```html
<div class="portfolio-item">
    <img src="images/portfolio/your-photo.jpg" alt="Description" class="portfolio-img">
    <div class="portfolio-overlay">
        <div class="overlay-content">
            <span class="category">Category Name</span>
            <h3>Photo Title</h3>
            <p>Photo description</p>
        </div>
    </div>
</div>
```

## Tips
- Use high-quality images for best results
- Compress images before uploading to improve website speed
- Maintain consistent aspect ratios for a professional look
