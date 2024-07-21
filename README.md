# mable-takehome

## Setting the correct NodeJS version

Before running the apps, run `nvm use`. This will set the NodeJS version.

## Backend

cd to the `backend` directory and run `npm i` to install the required packages.

Then run `npm run dev` to start the local server on `http://localhost:8000`

There are 2 endpoints: `/people` and `/pokemon`.

- `/people` returns a list of people (id, name, age, location) and is consumed by the frontend React app.
- `/pokemon` fetches a list of Pokemons from the Pokemon API and sorts them via alphabetical order.

## Frontend

cd to the `frontend` directory and run `npm i` to install the required packages.

Then run `npm start` to start the local server on `http://localhost:3000`

NOTE: for this takehome, I committed the `.env` file for convenience to reviewer. I would never do this in a production app.

Run `npm test` for the tests.
