document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const body = document.body;

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
            body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    });

    // Close modal on button click
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            body.style.overflow = ''; // Restore scrolling
        }
    });
});
