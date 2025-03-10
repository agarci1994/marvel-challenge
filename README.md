# Marvel Challenge

This is a React-based application that allows users to browse and search for Marvel characters, view detailed information, and manage their favorite characters.

## Features
- Display a list of 50 Marvel characters retrieved from the Marvel API.
- Search functionality to filter characters by name.
- Character detail view showing information and comics.
- Add/remove characters to/from favorites.
- Responsive design for both desktop and mobile views.
- Data caching to minimize API requests.
- ESLint and Prettier configured for code quality.
- Jest-based testing for main components.

## Technologies Used
- **React 19** (Frontend framework)
- **Vite** (Development server and build tool)
- **TypeScript** (Static typing)
- **Tailwind CSS** (Styling framework)
- **Jest & Testing Library** (Testing framework)
- **Marvel API** (Data source)

## Installation & Setup

### Clone the repository
```sh
git clone <repository-url>
cd marvel-challenge
```

### Install dependencies
```sh
pnpm install
```

### Environment Variables
Create a `.env` file and add your Marvel API keys:
```
VITE_MARVEL_PUBLIC_KEY=your_public_key
VITE_MARVEL_PRIVATE_KEY=your_private_key
```

### Run the development server
```sh
pnpm run dev
```
The application will be available at `http://localhost:5173/`.

### Build for production
```sh
pnpm run build
```

### Run tests
```sh
pnpm run test
```

## Project Structure
```
marvel-challenge/
│── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state management
│   ├── pages/            # Application views
│   ├── services/         # API calls and external services
│   ├── assets/           # Static assets
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│── public/               # Static files
│── package.json          # Project dependencies and scripts
│── vite.config.ts        # Vite configuration
│── tailwind.config.ts    # Tailwind configuration
│── tsconfig.json         # TypeScript configuration
```
## DEPLOY
- MARVEL CHALLENGE: [https://marvel-challenge-nu.vercel.app/](https://marvel-challenge-nu.vercel.app/)

## API Documentation
- Marvel API: [https://developer.marvel.com/documentation/getting_started](https://developer.marvel.com/documentation/getting_started)
