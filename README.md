# WTWR (What to Wear?)

## About the project

WTWR is a React frontend connected to the [WTWR Express backend](https://github.com/TheFizzzz/se_project_express). Users can browse clothing by weather, register, sign in, manage their own wardrobe, and update their profile.

## Functionality

- View weather information and a clothing wardrobe filtered by current conditions
- Navigate between the main page (`/`) and profile page (`/profile`) using React Router
- View only your own clothing items on the protected profile page
- Open item preview modals by clicking clothing cards
- Register, sign in, and resume a session from a saved token
- Add and delete your own clothing items with authenticated requests
- Like and unlike clothing items, with likes saved on the backend
- Update your profile name and avatar
- Toggle temperature units (Fahrenheit / Celsius)

## Technologies and techniques

- React 18 with functional components and hooks
- React Router v6 for client-side routing
- Custom `useForm` hook for controlled form inputs
- Express and MongoDB backend
- Vite for development and production builds
- CSS with BEM methodology
- Cabinet Grotesk font (self-hosted)
- ESLint and Prettier for code quality

## Links

- [Figma Design (Sprint 11)](https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433)
- [Figma Design (Sprint 14)](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1)
- [Backend repository](https://github.com/TheFizzzz/se_project_express)
- [Project pitch video](https://drive.google.com/file/d/1d5joUB0QTwJqcCPThqa5sUQAIQps1Q_x/view?usp=drive_link)

## Running locally

Run MongoDB, the [Express backend](https://github.com/TheFizzzz/se_project_express), and this React app. The backend defaults to port 3001; Vite uses port 5173.

**Terminal 1 — start MongoDB** (if it is not already running):

```bash
mongod --dbpath /path/to/mongodb-data
```

**Terminal 2 — start the backend** from its repository:

```bash
npm install
npm run start
```

**Terminal 3 — start the frontend** from this repository:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Set `VITE_API_URL` if the backend runs somewhere other than `http://localhost:3001`.
