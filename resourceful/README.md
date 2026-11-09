# Game Collection

This is a website that lets users add, view, edit, and delete video games.

## Technologies Used
- Python and Flask
- SQLite
- HTML, CSS, JavaScript

## Database
The database stores games with these fields:
- id
- title
- platform
- genre
- release_year
- hours_played

## API Endpoints
- GET /games - Get all games
- GET /games/id - Get one game
- POST /games - Add a game
- PUT /games/id - Edit a game
- DELETE /games/id - Delete a game

## How to Run
1. Install Flask and Flask-CORS:
   `pip install flask flask-cors`
2. Run `python app.py`
3. Open `http://127.0.0.1:5001/` in your browser.

## Features
Users can add, view, edit, and delete games from the website.