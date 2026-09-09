# WTWR (What to Wear?)

## About the project

WTWR is a React front-end application that recommends clothing based on the current weather. Users can browse their wardrobe, view item details, add new garments through modal forms, and manage their profile page.

## Functionality

- View weather information and a clothing wardrobe filtered by current conditions
- Navigate between the main page (`/`) and profile page (`/profile`) using React Router
- Browse all clothing items on the profile page
- Open item preview modals by clicking clothing cards
- Add new clothing items through a validated form modal (persisted via json-server)
- Delete clothing items with a confirmation modal
- Toggle temperature units (Fahrenheit / Celsius)

## Technologies and techniques

- React 18 with functional components and hooks
- React Router v6 for client-side routing
- Custom `useForm` hook for controlled form inputs
- json-server as a mock REST API
- Vite for development and production builds
- CSS with BEM methodology
- Cabinet Grotesk font (self-hosted)
- ESLint and Prettier for code quality

## Links

- [Figma Design (Sprint 11)](https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433)
- Project Pitch Video: _(https://drive.google.com/file/d/1d5joUB0QTwJqcCPThqa5sUQAIQps1Q_x/view?usp=drive_link)_

## Running locally

This project requires two terminals — one for the React app and one for the mock API server.

**Terminal 1 — start the mock server:**

```bash
npm run server
```

Or, if json-server is installed globally:

```bash
json-server --watch db.json --id _id --port 3001
```

**Terminal 2 — start the React app:**

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) (Vite default) and the API at [http://localhost:3001](http://localhost:3001).
