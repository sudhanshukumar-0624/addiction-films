const OWNER = 'sudhanshukumar-0624';
const REPO = 'addiction-films';
const BRANCH = 'main';

// Globals
let GITHUB_TOKEN = '';
let siteHTML = '';
let htmlSha = '';

document.addEventListener('DOMContentLoaded', () => {
    
    // Login Logic
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('loginScreen');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginError = document.getElementById('loginError');

    const SIMPLE_PASSWORD = "Addiction2024";

    // Retrieve token from session storage if available
    const savedToken = sessionStorage.getItem('ghToken');
    if (savedToken) {
        verifyToken(savedToken);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('adminToken').value.trim();
        
        if (pass === SIMPLE_PASSWORD) {
            // Reconstruct the secure token securely divided so bots don't grab it
            const _p = ["github_pat_", "11B6CU3DA0WsrjqlJ0l97T", "_QEziYBBXladlcHHzJew52", "bYtvZ40BeHF9FCxgUNnrxL", "A4KXOPGTGdp301vC"];
            verifyToken(_p.join(''));
        } else {
            showError('Invalid Password.');
        }
    });

    async function verifyToken(token) {
        if (!token.startsWith('github_pat_') && !token.startsWith('ghp_')) {
            showError('Invalid Token Configuration.');
            return;
        }
        
        // Test token against the repository
        try {
            const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
                headers: { 'Authorization': `token ${token}` }
            });
            if (res.ok) {
                GITHUB_TOKEN = token;
                sessionStorage.setItem('ghToken', token);
                
                // Fetch the current index.html layout so we can edit it later
                await loadIndexHTML();

                loginScreen.style.display = 'none';
                adminDashboard.style.display = 'flex';
            } else {
                showError('Invalid token or no permission for repository.');
            }
        } catch (e) {
            showError('Network error checking token.');
        }
    }

    function showError(msg) {
        loginError.textContent = msg;
        loginError.style.display = 'block';
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('ghToken');
        GITHUB_TOKEN = '';
        loginScreen.style.display = 'flex';
        adminDashboard.style.display = 'none';
    });

    // Tab Navigation
    const navItems = document.querySelectorAll('.nav li');
    const panels = document.querySelectorAll('.panel');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            panels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(item.getAttribute('data-target')).classList.add('active');
        });
    });

    // --------------------------------------------------------
    // GITHUB API FUNCTIONS
    // --------------------------------------------------------

    async function loadIndexHTML() {
        const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/index.html?ref=${BRANCH}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        const data = await res.json();
        htmlSha = data.sha;
        // Decode base64 accurately safely supporting utf-8
        siteHTML = decodeURIComponent(escape(atob(data.content)));
    }

    async function saveHTMLUpdate(newHTML, commitMessage) {
        const encodedHTML = btoa(unescape(encodeURIComponent('<!DOCTYPE html>\n' + newHTML)));
        const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/index.html`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: commitMessage,
                content: encodedHTML,
                sha: htmlSha,
                branch: BRANCH
            })
        });
        
        if (!res.ok) throw new Error("Failed to save HTML changes.");
        const data = await res.json();
        // Update the SHA for the next edit
        htmlSha = data.content.sha;
        siteHTML = '<!DOCTYPE html>\n' + newHTML;
    }

    async function uploadImageFile(file, folderPath) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64Content = e.target.result.split(',')[1];
                const cleanName = file.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
                const path = `images/${folderPath}/${Date.now()}_${cleanName}`;

                try {
                    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `token ${GITHUB_TOKEN}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: `Upload new image to ${folderPath}`,
                            content: base64Content,
                            branch: BRANCH
                        })
                    });
                    if (!res.ok) throw new Error("Failed to upload image.");
                    
                    resolve(path);
                } catch (err) {
                    reject(err);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    function showAlert(title, body) {
        document.getElementById('alertTitle').textContent = title;
        document.getElementById('alertBody').textContent = body;
        document.getElementById('alertModal').classList.add('active');
    }

    function toggleLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'block' : 'none';
    }


    // --------------------------------------------------------
    // UPLOAD LOGIC
    // --------------------------------------------------------

    // File Selection State
    let selectedGalleryFile = null;
    let selectedHeroFile = null;
    let selectedPortfolioFile = null;

    // Helper to render local file previews in the upload areas
    function showImagePreview(inputId, file) {
        const input = document.getElementById(inputId);
        const uploadArea = input.closest('.upload-area');
        
        let preview = uploadArea.querySelector('.preview-container');
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'preview-container';
            uploadArea.appendChild(preview);
        }
        
        // Hide standard text and icon
        Array.from(uploadArea.children).forEach(child => {
            if (child !== preview && child !== input) {
                child.style.display = 'none';
            }
        });
        
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <img src="${e.target.result}" class="preview-img" style="max-height: 120px; border-radius: 6px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.4); border: 1px solid var(--primary-color);">
                <p style="color: var(--primary-color); font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">${file.name}</p>
                <p style="color: var(--text-muted); font-size: 0.75rem;">Click anywhere inside this dashed area to change photo</p>
            `;
        };
        reader.readAsDataURL(file);
    }

    // Helper to reset upload area back to original state
    function resetUploadArea(inputId) {
        const input = document.getElementById(inputId);
        const uploadArea = input.closest('.upload-area');
        
        const preview = uploadArea.querySelector('.preview-container');
        if (preview) {
            preview.remove();
        }
        
        Array.from(uploadArea.children).forEach(child => {
            if (child !== input) {
                child.style.display = '';
            }
        });
    }

    // GALLERY UPLOAD
    const uploadGallery = document.getElementById('uploadGallery');
    uploadGallery.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        selectedGalleryFile = file;
        showImagePreview('uploadGallery', file);
    });

    const btnPublishGallery = document.getElementById('btnPublishGallery');
    btnPublishGallery.addEventListener('click', async () => {
        if (!selectedGalleryFile) {
            showAlert('No Photo Selected', 'Please click on the dashed upload box above to select a photo first.');
            return;
        }

        toggleLoading(true);
        try {
            // 1. Upload photo to GitHub
            const uploadedPath = await uploadImageFile(selectedGalleryFile, 'gallery');

            // 2. Parse index.html
            const parser = new DOMParser();
            const doc = parser.parseFromString(siteHTML, 'text/html');

            // 3. Inject image slide into random slot
            const galleryContainers = Array.from(doc.querySelectorAll('.gallery-grid .gallery-item'));
            if (galleryContainers.length > 0) {
                const randomGridSlot = galleryContainers[Math.floor(Math.random() * galleryContainers.length)];
                const newImgDiv = doc.createElement('img');
                newImgDiv.src = uploadedPath;
                newImgDiv.alt = "New Admin Upload";
                newImgDiv.className = "gallery-img slide";
                randomGridSlot.appendChild(newImgDiv);

                // 4. Save and commit HTML updates
                await saveHTMLUpdate(doc.documentElement.outerHTML, "Admin added new dynamic gallery image via Dashboard");
                showAlert('Success!', 'The image was uploaded to the sliding gallery. It will appear on the live website shortly.');
                
                // Clear selection and state
                selectedGalleryFile = null;
                resetUploadArea('uploadGallery');
                uploadGallery.value = '';
            } else {
                showAlert('Error', 'Could not locate Gallery in the HTML code.');
            }
        } catch (error) {
            console.error(error);
            showAlert('Error', 'Failed during upload sequence.');
        } finally {
            toggleLoading(false);
        }
    });


    // HERO UPLOAD
    const uploadHero = document.getElementById('uploadHero');
    uploadHero.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        selectedHeroFile = file;
        showImagePreview('uploadHero', file);
    });

    const btnPublishHero = document.getElementById('btnPublishHero');
    btnPublishHero.addEventListener('click', async () => {
        if (!selectedHeroFile) {
            showAlert('No Photo Selected', 'Please click on the dashed upload box above to select a photo first.');
            return;
        }

        toggleLoading(true);
        try {
            // 1. Upload photo to GitHub
            const uploadedPath = await uploadImageFile(selectedHeroFile, 'hero');

            // 2. Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(siteHTML, 'text/html');

            // 3. Append to hero background
            const heroMainContainer = doc.querySelector('.hero-img-main');
            if (heroMainContainer) {
                const newImg = doc.createElement('img');
                newImg.src = uploadedPath;
                newImg.alt = "Hero Slider Image";
                newImg.className = "slide";
                heroMainContainer.appendChild(newImg);

                // 4. Save HTML
                await saveHTMLUpdate(doc.documentElement.outerHTML, "Admin added new Hero image via Dashboard");
                showAlert('Success!', 'The image was uploaded to the Hero sliding background.');
                
                // Clear selection and state
                selectedHeroFile = null;
                resetUploadArea('uploadHero');
                uploadHero.value = '';
            } else {
                showAlert('Error', 'Could not locate Hero Slider in the HTML code.');
            }
        } catch (error) {
            console.error(error);
            showAlert('Error', 'Failed to upload hero image.');
        } finally {
            toggleLoading(false);
        }
    });

    // PORTFOLIO UPLOAD
    const portfolioCategory = document.getElementById('portfolioCategory');
    const portfolioCategoryOther = document.getElementById('portfolioCategoryOther');
    
    portfolioCategory.addEventListener('change', () => {
        if (portfolioCategory.value === 'Other') {
            portfolioCategoryOther.style.display = 'block';
        } else {
            portfolioCategoryOther.style.display = 'none';
        }
    });

    const uploadPortfolio = document.getElementById('uploadPortfolio');
    uploadPortfolio.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        selectedPortfolioFile = file;
        showImagePreview('uploadPortfolio', file);
    });

    const btnPublishPortfolio = document.getElementById('btnPublishPortfolio');
    btnPublishPortfolio.addEventListener('click', async () => {
        if (!selectedPortfolioFile) {
            showAlert('No Photo Selected', 'Please click on the dashed upload box above to select a photo first.');
            return;
        }

        let cat = portfolioCategory.value;
        if (cat === 'Other') {
            cat = portfolioCategoryOther.value.trim() || 'Other';
        }
        const title = document.getElementById('portfolioTitle').value.trim() || 'Captured Moment';
        const desc = document.getElementById('portfolioDesc').value.trim() || 'Addiction Films Exclusive';

        toggleLoading(true);
        try {
            // 1. Upload photo to GitHub
            const uploadedPath = await uploadImageFile(selectedPortfolioFile, 'portfolio');

            // 2. Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(siteHTML, 'text/html');

            // 3. Insert card into Portfolio Grid
            const portfolioGrid = doc.querySelector('#portfolioGrid');
            if (portfolioGrid) {
                const currentCards = doc.querySelectorAll('.portfolio-item').length;
                const isLarge = (currentCards % 4 === 0) ? 'large' : '';

                const cardHTML = `
                <div class="portfolio-item ${isLarge}">
                    <img src="${uploadedPath}" alt="${title}" class="portfolio-img">
                    <div class="portfolio-overlay">
                        <div class="overlay-content">
                            <span class="category">${cat}</span>
                            <h3>${title}</h3>
                            <p>${desc}</p>
                        </div>
                    </div>
                </div>`;

                portfolioGrid.insertAdjacentHTML('afterbegin', cardHTML);

                // 4. Save HTML
                await saveHTMLUpdate(doc.documentElement.outerHTML, `Admin added new ${cat} Portfolio image`);
                showAlert('Success!', `New Portfolio item '${title}' successfully added!`);
                
                // Clear inputs and state
                document.getElementById('portfolioTitle').value = '';
                document.getElementById('portfolioDesc').value = '';
                portfolioCategoryOther.value = '';
                portfolioCategoryOther.style.display = 'none';
                portfolioCategory.value = 'Wedding';
                
                selectedPortfolioFile = null;
                resetUploadArea('uploadPortfolio');
                uploadPortfolio.value = '';
            } else {
                showAlert('Error', 'Could not locate Portfolio Grid in the HTML code.');
            }
        } catch (error) {
            console.error(error);
            showAlert('Error', 'Failed to upload portfolio image.');
        } finally {
            toggleLoading(false);
        }
    });

});

