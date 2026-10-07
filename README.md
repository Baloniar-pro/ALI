# Baloniar

Baloniar is a React Native app built with Expo SDK 54 and React Navigation.

## Getting started

Install dependencies and start the Expo development server:

```bash
npm install
npx expo start
```

Use the terminal shortcuts to open the app in an Android emulator, iOS simulator, or web browser.

## Project structure

```text
.
├── assets/
│   └── images/             # App and screen images
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # Shared application state and authentication
│   ├── data/               # Sample app data
│   ├── navigation/         # Navigators and route types
│   ├── screens/            # Application screens
│   └── theme/              # Shared colors and typography
├── App.tsx                 # Application root and root stack
└── package.json
```

The project uses React Navigation, not Expo Router. Put screens in `src/screens`, reusable UI in `src/components`, and navigation definitions in `src/navigation`.
`App.tsx` is the Expo application entry point.

## Useful commands

```bash
npm run lint
npx tsc --noEmit
```
