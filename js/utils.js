// Utility functions for the AlgoVisualizer

// Store explanation history globally
window.explanationHistory = [];

const utils = {
    // Generate a random array of numbers
    generateArray: (size = 20, min = 5, max = 100) => {
        console.log('Generating array of size:', size);
        const array = Array.from({ length: size }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
        console.log('Generated array:', array);
        return array;
    },

    // Create bars for visualization
    createBars: (array) => {
        console.log('Creating bars for array:', array);
        const container = document.getElementById('visualization');
        if (!container) {
            console.error('Visualization container not found!');
            return;
        }
        container.innerHTML = '';

        // --- New array display with boxes and indices ---
        const arrayDisplay = document.querySelector('.array-display');
        if (arrayDisplay) {
            arrayDisplay.innerHTML = '';

            // Row for value boxes
            const valueRow = document.createElement('div');
            valueRow.className = 'value-row';
            valueRow.style.display = 'flex';
            valueRow.style.justifyContent = 'flex-start';
            valueRow.style.alignItems = 'center';
            valueRow.style.gap = '0.5rem';

            // Row for indices
            const indexRow = document.createElement('div');
            indexRow.className = 'index-row';
            indexRow.style.display = 'flex';
            indexRow.style.justifyContent = 'flex-start';
            indexRow.style.alignItems = 'center';
            indexRow.style.gap = '0.5rem';
            indexRow.style.marginTop = '0.4rem';

            array.forEach((value, index) => {
                // Value box
                const box = document.createElement('div');
                box.className = 'bar';
                box.textContent = value;
                box.setAttribute('data-index', index);
                box.setAttribute('title', value);
                valueRow.appendChild(box);

                // Index below
                const idx = document.createElement('div');
                idx.className = 'array-index';
                idx.textContent = index;
                indexRow.appendChild(idx);
            });

            arrayDisplay.appendChild(valueRow);
            arrayDisplay.appendChild(indexRow);
        }
        // --- End new array display ---

        // (Optional) If you want to keep the old bar chart for height-based visualizations, you can keep this block, or remove it if not needed:
        // container.appendChild(barsContainer);

        console.log('Bars created successfully');
    },

    // Update bar colors during visualization
    updateBarColors: (indices, className) => {
        console.log('Updating bar colors:', { indices, className });
        const bars = document.querySelectorAll('.bar');
        // Reset all color classes
        bars.forEach(bar => bar.classList.remove('comparing', 'sorted', 'active', 'swap'));
        // Update colors for selected indices
        indices.forEach(index => {
            if (bars[index]) {
                bars[index].classList.add(className);
            }
        });
    },

    // Sleep function for animation delays
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // Update explanation text to accumulate all steps
    updateExplanation: (text) => {
        const explanationText = document.getElementById('explanationText');
        if (explanationText) {
            window.explanationHistory.push(text);
            explanationText.innerHTML = window.explanationHistory.map(e => `<div>${e}</div>`).join('');
        }
    },

    // Toggle control buttons
    toggleControls: (enabled, isRunning = false) => {
        console.log('Toggling controls:', { enabled, isRunning });
        
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (!startBtn || !stopBtn || !nextBtn || !prevBtn || !resetBtn) {
            console.error('One or more control buttons not found!');
            return;
        }

        if (isRunning) {
            console.log('Setting running state');
            startBtn.disabled = true;
            stopBtn.disabled = false;
            nextBtn.disabled = true;
            prevBtn.disabled = true;
            resetBtn.disabled = true;
        } else {
            console.log('Setting normal state');
            startBtn.disabled = !enabled;
            stopBtn.disabled = true;
            nextBtn.disabled = !enabled;
            prevBtn.disabled = !enabled;
            resetBtn.disabled = !enabled;
        }
    }
}; 