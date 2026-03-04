import { angpaoStore } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    // Stage 3 bindings
    const angpaoClicker = document.getElementById('hotspot-angpao');
    const penClicker = document.getElementById('hotspot-pen');
    const notebookListContainer = document.getElementById('notebook-container');
    const angpaoList = document.getElementById('angpao-list');

    // Stage 4 Modal Elements
    const addAngpaoModal = document.getElementById('add-angpao-modal');
    const addAngpaoForm = document.getElementById('add-angpao-form');
    const btnCancelAdd = document.getElementById('btn-cancel-add');

    // State mode
    let isEditMode = false;
    let currentEditId = null;

    // --- State rendering logic ---
    const renderList = (data) => {
        if (!angpaoList) return;
        angpaoList.innerHTML = ''; // Clear currently rendered list

        data.forEach(entry => {
            const li = document.createElement('li');
            li.setAttribute('data-id', entry.id);

            // Format rendering visually mimicking pen on notebook
            const nameSpan = document.createElement('span');
            nameSpan.textContent = entry.from;

            const amountSpan = document.createElement('span');
            amountSpan.className = 'entry-amount';
            amountSpan.textContent = `$${entry.amount.toFixed(0)}`;

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.textContent = '❌';
            delBtn.title = 'Delete this entry';

            delBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent li click bubble
                if (confirm(`Are you sure you want to delete the Angpao from ${entry.from}?`)) {
                    angpaoStore.removeEntry(entry.id);
                }
            });

            // Edit logic on list item click (only when in edit mode)
            li.addEventListener('click', () => {
                if (isEditMode) {
                    currentEditId = entry.id;
                    document.getElementById('modal-title').textContent = 'Edit Angpao';
                    document.getElementById('btn-submit-modal').textContent = 'Save';

                    document.getElementById('angpao-from').value = entry.from;
                    document.getElementById('angpao-amount').value = entry.amount;

                    addAngpaoModal.showModal();
                }
            });

            li.appendChild(nameSpan);
            li.appendChild(amountSpan);
            li.appendChild(delBtn);
            angpaoList.appendChild(li);
        });
    };

    // Subscribing the renderer function implicitly ensures HTML accurately reflects LocalStorage
    angpaoStore.subscribe(renderList);

    // --- Hotspot Behaviors (Stage 3 & 4 overlay interactions) ---

    // Clicking Angpao hotspots opens the Add dialog
    if (angpaoClicker && addAngpaoModal) {
        angpaoClicker.addEventListener('click', () => {
            currentEditId = null;
            document.getElementById('modal-title').textContent = 'Add Angpao';
            document.getElementById('btn-submit-modal').textContent = 'Add Record';
            addAngpaoForm.reset();
            addAngpaoModal.showModal();
        });
    }

    // Clicking Pen toggles edit mode rendering
    if (penClicker && notebookListContainer) {
        penClicker.addEventListener('click', () => {
            isEditMode = !isEditMode;
            if (isEditMode) {
                notebookListContainer.classList.add('edit-mode');
                penClicker.classList.add('active'); // Highlight pen actively via CSS class
            } else {
                notebookListContainer.classList.remove('edit-mode');
                penClicker.classList.remove('active'); // Remove highlight class
            }
        });
    }

    // --- Dialog Bindings (Stage 4 Native Dialog Event Systems) ---
    if (addAngpaoForm && btnCancelAdd) {

        const resetModalState = () => {
            currentEditId = null;
            addAngpaoForm.reset();
            document.getElementById('modal-title').textContent = 'Add Angpao';
            document.getElementById('btn-submit-modal').textContent = 'Add Record';
            addAngpaoModal.close();
        };

        btnCancelAdd.addEventListener('click', () => {
            resetModalState();
        });

        // Add form submission captures inputs and sets Data
        addAngpaoForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop native dialog logic temporarily

            const fromVal = document.getElementById('angpao-from').value;
            const amountVal = document.getElementById('angpao-amount').value;

            if (fromVal && amountVal) {
                if (currentEditId) {
                    angpaoStore.updateEntry(currentEditId, fromVal, amountVal);
                } else {
                    angpaoStore.addEntry(fromVal, amountVal);
                }
            }

            resetModalState();
        });
    }
});
