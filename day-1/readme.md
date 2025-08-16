# Restart-ReactNative-journey

A simple React Native app to document my React Native learning journey.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Styling](#styling)

## Introduction

This project is a React Native application created as a personal learning exercise to refresh my React Native skills.

## Project Structure

The project has the following structure:

- `app/`: Contains the application's source code.
  - `_layout.tsx`: Defines the layout for the app, likely using Expo Router.
  - `(tabs)/`: Contains the tab navigation structure.
    - `_layout.tsx`: Defines the layout for the tabs.
    - `explore.tsx`: The Explore screen.
    - `index.tsx`: The main screen or home screen.
- `assets/`: Contains images (adaptive icon, favicon, icon, splash icon) and fonts (SpaceMono-Regular.ttf).
- `constants/`: Contains constant values, such as colors (`Colors.ts`).
- `app.json`: Configuration file for Expo.
- `package.json`: Lists project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Dependencies

The project uses the following main dependencies:

- `expo`: Core Expo SDK.
- `expo-router`: Expo Router for navigation.
- `react-native`: React Native framework.
- `@react-navigation/native`: React Navigation library.
- `@expo/vector-icons`: Vector icons for Expo.
- Other Expo modules for font loading, linking, splash screen, status bar, system UI, and web browser functionality.

## Getting Started

1.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

2.  Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

## Scripts

The following scripts are available in `package.json`:

- `start`: Starts the Expo development server.
- `android`: Starts the Expo development server for Android.
- `ios`: Starts the Expo development server for iOS.
- `web`: Starts the Expo development server for web.
- `test`: Runs Jest tests.

## Configuration

The `app.json` file configures various aspects of the app, including:

- Name and slug: `"day1"`
- Version: `"1.0.0"`
- Orientation: `"portrait"`
- Icon and splash screen images.
- Support for tablets on iOS.
- Adaptive icon configuration for Android.
- Web bundler and favicon.
- Plugins: `"expo-router"`
- Experiments: `"typedRoutes": true`

## Styling

The `constants/Colors.ts` file defines the app's color scheme, including light and dark mode colors for text, background, tint, and tab icons.
