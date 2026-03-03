import { angpaoStore } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded. Mounting Interaction Hooks.');

    const angpaoClicker = document.getElementById('hotspot-angpao');
    const penClicker = document.getElementById('hotspot-pen');

    // Subscribe to state changes simply to log them for now
    angpaoStore.subscribe((state) => {
        console.log("Current Angpao Data:", state);
    });

    // Stage 4 triggers
    if (angpaoClicker) {
        angpaoClicker.addEventListener('click', () => {
            console.log('Angpao Clicked! Open add form...');
            // Temporary addition to test store sync natively!
            const num = angpaoStore.data.length + 1;
            angpaoStore.addEntry(`Relative ${num}`, Math.floor(Math.random() * 100) + 10);
        });
    }

    if (penClicker) {
        penClicker.addEventListener('click', () => {
            console.log('Pen Clicked! Toggle edit mode...');
            // Logic handling for edit toggles
        });
    }
});
