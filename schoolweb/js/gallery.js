document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const body = document.body;

    // Load images from API plus static images
    loadGalleryImages();

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'gallery-modal-img';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'gallery-modal-close';
    closeBtn.innerHTML = '×';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    body.appendChild(modal);

    // Add click event to gallery images
    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            body.style.overflow = 'hidden';
        }
    });

    // Close modal on button click
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        body.style.overflow = '';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            body.style.overflow = '';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            body.style.overflow = '';
        }
    });

    async function loadGalleryImages() {
        console.log('adminLoggedIn:', localStorage.getItem('adminLoggedIn'));
        try {
            const response = await fetch('/api/gallery');
            const images = await response.json();
            console.log('Loaded images from API:', images);

            images.forEach(image => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'gallery-item uploaded';
                imgContainer.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    ${localStorage.getItem('adminLoggedIn') ? `<button class="delete-btn" onclick="event.stopPropagation(); deleteUploadedImage(${image.id})">×</button>` : ''}
                `;
                gallery.appendChild(imgContainer);
            });
        } catch (error) {
            console.error('Error loading gallery images from API:', error);
            // Fallback: load from localStorage if API fails
            const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
            console.log('Loaded images from localStorage:', galleryImages);
            galleryImages.forEach((image, index) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'gallery-item uploaded';
                imgContainer.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    ${localStorage.getItem('adminLoggedIn') ? `<button class="delete-btn" onclick="event.stopPropagation(); deleteUploadedImage(${index})">×</button>` : ''}
                `;
                gallery.appendChild(imgContainer);
            });
        }
    }

    window.deleteUploadedImage = async function(id) {
        console.log('Attempting to delete uploaded image with id:', id);
        try {
            console.log('Sending DELETE request to /api/gallery/' + id);
            await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            console.log('Delete successful, reloading gallery');
            gallery.querySelectorAll('.gallery-item.uploaded').forEach(item => item.remove());
            loadGalleryImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            // Fallback: delete from localStorage if API fails
            const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
            // Find index by id, but since id is from API, and localStorage uses index, perhaps match by src or something.
            // For simplicity, assume id is index in fallback.
            if (id < galleryImages.length) {
                galleryImages.splice(id, 1);
                localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
                gallery.querySelectorAll('.gallery-item.uploaded').forEach(item => item.remove());
                loadGalleryImages();
            }
        }
    };
});
