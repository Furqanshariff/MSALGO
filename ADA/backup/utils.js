// Utility functions for the AlgoVisualizer

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
        
        // Create bars container
        const barsContainer = document.createElement('div');
        barsContainer.className = 'bars-container';
        barsContainer.style.display = 'flex';
        barsContainer.style.alignItems = 'flex-end';
        barsContainer.style.justifyContent = 'center';
        barsContainer.style.gap = '2px';
        barsContainer.style.height = '300px';
        barsContainer.style.width = '100%';
        barsContainer.style.padding = '20px';
        
        const maxValue = Math.max(...array);
        const barWidth = Math.min(30, Math.floor(container.clientWidth / array.length) - 2);
        
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.width = `${barWidth}px`;
            bar.dataset.value = value;
            bar.dataset.index = index;
            barsContainer.appendChild(bar);
        });
        
        container.appendChild(barsContainer);

        // Create array values display
        const arrayDisplay = document.querySelector('.array-display');
        if (arrayDisplay) {
            arrayDisplay.innerHTML = '';
            array.forEach((value, index) => {
                const valueDiv = document.createElement('div');
                valueDiv.className = 'array-value';
                valueDiv.textContent = value;
                valueDiv.dataset.index = index;
                arrayDisplay.appendChild(valueDiv);
            });
        }
        
        console.log('Bars created successfully');
    },

    // Update bar colors during visualization
    updateBarColors: (indices, className) => {
        console.log('Updating bar colors:', { indices, className });
        const bars = document.querySelectorAll('.bar');
        const values = document.querySelectorAll('.array-value');
        
        // Reset all colors
        bars.forEach(bar => bar.classList.remove('comparing', 'sorted'));
        values.forEach(value => value.classList.remove('comparing', 'sorted'));
        
        // Update colors for selected indices
        indices.forEach(index => {
            if (bars[index]) {
                bars[index].classList.add(className);
            }
            if (values[index]) {
                values[index].classList.add(className);
            }
        });
    },

    // Sleep function for animation delays
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // Update explanation text
    updateExplanation: (text) => {
        const explanationText = document.getElementById('explanationText');
        if (explanationText) {
            explanationText.textContent = text;
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