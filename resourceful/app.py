from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from database import GameDatabase

app = Flask(__name__)
CORS(app)
db = GameDatabase()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/games", methods=["GET"])
def get_games():
    games = db.get_all_games()
    return jsonify(games), 200

@app.route("/games/<int:games_id>", methods=["GET"])
def get_game(games_id):
    game = db.get_game(games_id)
    if game:
        return jsonify(game), 200
    return jsonify({"error": "Game not found"}), 404
    
@app.route("/games", methods=["POST"])
def create_game():
    data = request.get_json(silent=True)

    if not isinstance(data, dict) or any(
        data.get(field) is None
        for field in ["title", "platform", "genre", "release_year", "hours_played"]
    ):
        return jsonify({"error": "Missing or invalid game data"}), 400
    
    title = data.get("title")
    platform = data.get("platform")
    genre = data.get("genre")
    release_year = data.get("release_year")
    hours_played = data.get("hours_played")

    game_id = db.create_game(title, platform, genre, release_year, hours_played)

    return jsonify({"id": game_id, "message": "Game created successfully"}), 201

@app.route("/games/<int:games_id>", methods=["PUT"])
def update_game(games_id):
    data = request.get_json(silent=True)

    if not isinstance(data, dict) or any(
        data.get(field) is None
        for field in ["title", "platform", "genre", "release_year", "hours_played"]
):
        return jsonify({"error": "Missing or invalid game data"}), 400

    title = data.get("title")
    platform = data.get("platform")
    genre = data.get("genre")
    release_year = data.get("release_year")
    hours_played = data.get("hours_played")

    updated = db.update_game(games_id, title, platform, genre, release_year, hours_played)

    if updated:
        return jsonify({"id": games_id, "message": "Game updated successfully"}), 200
    return jsonify({"error": "Game not found"}), 404

@app.route("/games/<int:games_id>", methods=["DELETE"])
def delete_game(games_id):
    deleted = db.delete_game(games_id)

    if deleted:
        return jsonify({"id": games_id, "message": "Game deleted successfully"}), 200
    return jsonify({"error": "Game not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5001)