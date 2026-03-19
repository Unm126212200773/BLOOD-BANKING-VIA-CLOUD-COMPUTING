# Blood Bank App - Advanced Cloud Platform

## Overview
Modern single-page blood bank management system with cloud-like localStorage data persistence. Features dashboard stats, donor registry, inventory tracking, and request management.

## Key Features
- **Responsive Design**: Mobile-first, clamp()-based scaling, auto-fit modals.
- **Glassmorphism UI**: Gradient backgrounds, blur effects, black glass dialogs.
- **Navigation**: Smooth section switching, mobile hamburger menu.
- **Data Management**: Donors, inventory, requests stored in localStorage.
- **Modals**: Black glass dialogs for adding inventory/requests.

## Recent Updates
- Dialog box colors: Black glassmorphism theme (rgba(0,0,0,0.8), subtle white borders).
- Blood Group selects: Dark black backgrounds (`rgba(0,0,0,0.5)`) in forms/modals.
- Responsive modals: Perfect fit on all devices.

## Quick Start
1. Open `index.html` in browser (`start index.html`).
2. **Register Donor**: Fill form in Register section.
3. **Test Modals**: Inventory → + Add Stock | Requests → + New Request.
4. **Search**: Donors section.

## File Structure
```
.
├── index.html       # Main app (HTML structure)
├── style.css        # Glassmorphism styling, black dialogs
├── script.js        # JS logic, localStorage
├── TODO*.md         # Task tracking
└── README.md        # This file
```

## Tech Stack
- HTML5, CSS3 (custom properties, clamp, backdrop-filter).
- Vanilla JS (no frameworks).
- Font Awesome icons.
- LocalStorage as "cloud" DB.

## Customization
- Colors: Edit CSS vars in :root.
- Add real backend: Replace localStorage calls.

© 2026 BloodBank Cloud App
