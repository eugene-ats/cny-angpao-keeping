# Angpao Keeping Web App Development Plan

## Framework Analysis

To determine the best framework that satisfies the criteria—**lightweight**, **powerful**, and **not overkill**, while maintaining **modularity for future extensions**—we evaluated several options:

1. **Vanilla JS/HTML/CSS (Without Framework)**
   - *Pros:* Smallest possible footprint, no build tools required, complete control.
   - *Cons:* Managing complex state (like a list of items to add, edit, or delete with confirmation dialogs) quickly leads to tangled, spaghetti DOM manipulation code. Not ideal for future extensibility.
   - *Verdict:* Too raw; fails the "powerful" and "easily extended" criteria when UI reactivity increases.

2. **React (via Vite)**
   - *Pros:* Ultimate modularity, massive ecosystem, easy state management.
   - *Cons:* Heavy runtime (~130kb bare minimum) for a simple app.
   - *Verdict:* A bit overkill for a simple interactive overlay app with LocalStorage, though very clean.

3. **Preact (via Vite)**
   - *Pros:* The same modularity and API as React but in a 3kB package. Extremely lightweight.
   - *Cons:* Still requires Virtual DOM overhead and full build process.

4. **Svelte (via Vite)**
   - *Pros:* **Exceptional fit.** Svelte fundamentally compiles down to tiny JavaScript bundles without needing a chunky runtime Virtual DOM. It is incredibly easy to write (standard HTML/CSS/JS feel), handles state reactivity beautifully out of the box, and naturally scopes styling to components.
   - *Cons:* Slightly different state paradigm than React, but easier to pick up.
   - *Verdict:* **Best Match.** It is lightweight (compiles to lean vanilla JS), powerful (handles reactive state seamlessly), and not overkill (no heavy runtime), while enforcing clean component architecture.

### Final Choice: **Svelte (with Vite)**
Svelte provides the best balance. It keeps the bundle size negligible, allows us to break down the UI into modular components (`DeskImage`, `Notebook`, `AngpaoOverlay`, `Dialog`), and maintains code clarity as the interactive complexity (like hover animations later on) increases. Next up, if zero build step is desired, HTML + Alpine.js or Petite Vue could be used but Svelte remains king for future-proof robust modularity.

---

## Execution Stages

The execution is grouped into the following distinct stages to build the application iteratively.

### Stage 1: Scaffolding and Layout Foundation
**Goal:** Setup the environment, import the base assets, and establish the responsive desk layout.
- **Input:** 
  - Svelte Vite template setup.
  - The background image (`gemini angpao and notebook on desk.png`).
- **Execution Steps:**
  1. Initialize Vite project with the Svelte template.
  2. Clear out boilerplate code.
  3. Create `App.svelte` and implement a full-screen, responsive container (`background-size: cover`).
  4. Ensure the background scales appropriately regardless of desktop aspect ratios.
- **Output (Expected):**
  - A running local dev server.
  - The app displays the full background image taking up 100% of the viewport width/height seamlessly.

### Stage 2: State Management & Local Storage
**Goal:** Establish the data structures for managing Angpao records locally.
- **Input:**
  - Base Layout from Stage 1.
- **Execution Steps:**
  1. Define the data schema (e.g., `id`, `from`, `amount`, `timestamp`).
  2. Create a reactive Svelte store (`store.ts` or directly in `App.svelte`) to hold the list of angpao objects.
  3. Implement data synchronization with `window.localStorage` so data survives page refreshes.
  4. Add temporary placeholder mock data.
- **Output (Expected):**
  - A reactive array that persisted across browser refresh instances via LocalStorage.

### Stage 3: Interactive Hotspots & Target Mapping
**Goal:** Create invisible, clickable regions exactly overlaid over the angpao and pen illustrations on the background.
- **Input:** 
  - Stage 2 logic.
  - Responsive background container.
- **Execution Steps:**
  1. Create absolutely-positioned `div` components (hotspots) layered correctly over the background.
  2. Map percentage-based coordinations (`top`, `left`, `width`, `height`) for the "Angpao" hotspot.
  3. Map percentage-based coordinations for the "Pen" hotspot.
  4. Apply subtle CSS `cursor: pointer` and simple initial hover states (e.g., slight glow/backdrop-filter) to hint at interactivity.
- **Output (Expected):**
  - Two invisible but clickable regions accurately aligned with the Angpao and Pen visuals regardless of window resizing.

### Stage 4: Dialog Components & Interactions
**Goal:** Implement the "Add" and "Edit/Delete" dialog UI and wire them to the hotspots.
- **Input:** 
  - Stage 3 hotspots.
  - Stage 2 data store.
- **Execution Steps:**
  1. Build a `Modal.svelte` component. Focus on a CNY theme (reds/golds).
  2. Implement the **Add Angpao Form** triggered by clicking the Angpao hotspot. It must accept "From" and "Amount" and update the state.
  3. Implement the **Confirmation Dialog** for deletions.
  4. *Note:* The pen interaction logic will toggle an "Edit Mode" which isn't a dialog itself, but enables editing list entries.
- **Output (Expected):**
  - Clicking the Angpao opens a form. Submitting it adds a new item to LocalStorage.

### Stage 5: Notebook Rendering List & Edit Mode
**Goal:** Render the stored data cleanly inside the visual confines of the notebook, applying the required styling and the behavior of the Pen toggle.
- **Input:** 
  - Data entries from Stage 4.
- **Execution Steps:**
  1. Map out a third rectangular region corresponding to the Notebook pages. Define its boundaries and optionally apply CSS transforms to match perspectival skew if necessary.
  2. Render the state list inside this notebook container.
  3. Apply a custom handwritten web font (e.g., Google Fonts 'Caveat' or similar) to the rendered list items.
  4. Wire up the "Pen" hotspot to toggle an `isEditMode` state. 
  5. While in `isEditMode`, list items become clickable, revealing the edit dialog or a delete button (with confirmation).
- **Output (Expected):**
  - A functioning application where records added via the Angpao hotspot visually appear like handwritten ink traces on the notebook. Clicking the pen permits interaction with those traces.

### Stage 6: Theming, Polish, and Preparation for Hosting
**Goal:** Refining the CNY aesthetic and preparing for deployment.
- **Input:** 
  - The completed functional App from Stage 5.
- **Execution Steps:**
  1. Standardize UI colors across the app (gold trims, crimson backgrounds for dialogs).
  2. Review "cleanliness" of the code and abstract out any overly complex markup into separate Svelte components.
  3. Update Vite configs (base paths if needed) suitable for GitHub Pages deployment.
  4. Test edge cases (e.g., maximum string length for names to prevent overflowing the notebook).
- **Output (Expected):**
  - A polished, bug-free interactive desktop web application codebase ready for a `npm run build` deployment.
