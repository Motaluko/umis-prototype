# UMIS Student Portal Prototype

A responsive, browser-only reconstruction of the supplied Babcock University UMIS student portal references. Built with plain HTML, CSS, and JavaScript; no build step or external dependency is required.

## Run

Open `index.html` in a modern browser. The app begins on the supplied student login screen. Use the prefilled sample ID and press **Login** to enter; authentication is simulated. If the browser restricts local storage for local files, serve this folder from a local static server (for example, `python -m http.server 8000`) and open `http://localhost:8000`.

## Registration workflow

1. Open **Commence Registration** in the left navigation and start registration. This opens **Select Meal**.
2. Select one meal row and press **Action**.
3. Select one residence and press **Action**.
4. Select one worship centre and press **Action**.
5. Select one or more courses and press **Action**.

Each step validates selection before saving and displays a top-right success or error message. Confirmed choices persist in `localStorage` and remain selected when revisiting a page or refreshing the browser. Course selection is multi-select; the other steps accept one choice. Refresh, sample search, navigation, and simulated export controls are interactive.

## Structure

- `index.html` loads the application shell and independent scripts.
- `css/styles.css` contains the responsive portal layout and table styles.
- `js/data.js` defines realistic sample student, meal, residence, worship, and course records.
- `js/storage.js` provides the simulated persistence/data-access boundary using browser `localStorage`.
- `js/notifications.js` renders accessible transient success and error notifications.
- `js/shell.js` renders the portal header, navigation, and footer.
- `js/pages.js` creates page content, selection tables, search, and confirmation validation.
- `js/app.js` maps URL hash routes to pages.

The DOCX contained seven additional portal screenshots and no text instructions. Screens that depicted finance, timetable, and other areas informed the navigation context, but those workflows were left as clearly labelled placeholders because the requested implementation scope is the registration flow. The screenshot's select-courses instruction appears before commencement, while the explicit functional workflow puts courses last; this prototype follows the explicit workflow and still leaves **Select Courses** available directly in the navigation. All names and records are sample data and do not connect to university systems.
