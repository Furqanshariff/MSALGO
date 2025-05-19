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

    // Initialize with first algorithm
    if (algorithmSelect.value) {
        console.log('Initializing with algorithm:', algorithmSelect.value);
        visualizer.init(algorithmSelect.value);
        utils.toggleControls(true);
    }

    // Event Listeners
    algorithmSelect.addEventListener('change', () => {
        console.log('Algorithm selected:', algorithmSelect.value);
        if (algorithmSelect.value) {
            visualizer.init(algorithmSelect.value);
            utils.toggleControls(true);
        } else {
            utils.toggleControls(false);
        }
    });

    startBtn.addEventListener('click', async () => {
        console.log('Start button clicked');
        await visualizer.start();
    });

    stopBtn.addEventListener('click', () => {
        console.log('Stop button clicked');
        visualizer.stop();
    });

    nextBtn.addEventListener('click', async () => {
        console.log('Next button clicked');
        await visualizer.nextStep();
    });

    prevBtn.addEventListener('click', () => {
        console.log('Previous button clicked');
        visualizer.previousStep();
    });

    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked');
        visualizer.reset();
    });
}); 