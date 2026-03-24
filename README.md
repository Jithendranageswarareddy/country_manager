# Country State City Management Application

## Overview
This React application manages hierarchical location data in the form:

`Country -> State -> City`

It supports prompt-based CRUD operations and confirmation dialogs for edit and delete actions.

## Features Implemented
- Add, edit, and delete countries
- Add, edit, and delete states under a selected country
- Add and delete cities under a selected state
- Cascade delete behavior for country and state removal
- Immediate UI updates after every confirmed action
- Functional component structure with lifted state in `App.js`

## Tech Stack
- ReactJS
- JavaScript (ES6)
- Functional components
- `useState` for state management

## Project Structure
```text
src/
|-- App.js
|-- index.js
|-- index.css
`-- components/
    |-- CountryList.js
    |-- StateList.js
    `-- CityList.js
```

## Setup Instructions
```bash
npm install
npm start
```

The app runs locally at `http://localhost:3000`.

## Known Limitations
- Data is stored only in React state, so it resets on page refresh.
- Names are collected with `prompt()`, which is intentional for this assignment but limited compared to custom form inputs.

## Live URL
https://cdn.jsdelivr.net/gh/Jithendranageswarareddy/country_manager@master/docs/index.html
