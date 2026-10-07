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
│   └── images/              # App and screen images
├── App.tsx                  # Application root and root stack
├── src/
│   ├── components/          # Reusable UI components
│   ├── features/
│   │   ├── account/         # Profile and account details
│   │   ├── actions/         # Send, receive, and top-up flows
│   │   ├── auth/            # Authentication context, screens, and theme
│   │   ├── dashboard/       # Home screen
│   │   ├── transactions/    # Transaction data and history screen
│   │   └── wallet/          # Wallet screen
│   └── navigation/          # Navigators and route types
├── package.json
└── README.md
```

The project uses React Navigation, not Expo Router. Feature-specific screens and state live under `src/features`; shared UI belongs in `src/components`, and navigation definitions belong in `src/navigation`. `App.tsx` is the Expo application entry point.

## Useful commands

```bash
npm run lint
npx tsc --noEmit
```
