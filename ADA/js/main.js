// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navAuth = document.querySelector('.nav-auth');

    mobileMenuBtn.addEventListener('click', () => {
        // Toggle mobile menu
        navLinks.classList.toggle('active');
        navAuth.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(6px, 6px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(6px, -6px)' 
            : 'none';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            navAuth.classList.remove('active');
            
            // Reset hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Create visualizer instance
    const visualizer = new Visualizer();

    // Get DOM elements
    const algorithmSelect = document.getElementById('algorithmSelect');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Handle algorithm selection
    algorithmSelect.addEventListener('change', (e) => {
        const algorithm = e.target.value;
        visualizer.currentAlgorithm = algorithm;
        visualizer.updatePseudocode(algorithm);
        visualizer.reset();
    });

    // Handle control buttons
    startBtn.addEventListener('click', () => visualizer.start());
    stopBtn.addEventListener('click', () => visualizer.stop());
    nextBtn.addEventListener('click', () => visualizer.next());
    prevBtn.addEventListener('click', () => visualizer.previous());
    resetBtn.addEventListener('click', () => visualizer.reset());

    // Initialize with default algorithm
    const defaultAlgorithm = 'quickSort';
    algorithmSelect.value = defaultAlgorithm;
    visualizer.currentAlgorithm = defaultAlgorithm;
    visualizer.updatePseudocode(defaultAlgorithm);
    visualizer.reset();
}); 