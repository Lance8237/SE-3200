from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

message_file = "messages.txt"

@app.route("/messages", methods=["POST"])
def add_messages():
    data = request.get_json()
    message = data.get("message", "")

    with open(message_file, "a") as file:
        file.write(message + "\n")

    return "", 201

@app.route("/messages", methods=["GET"])
def get_messages():
    try:
        with open(message_file, "r") as file:
            messages = [line.rstrip("\n") for line in file]
    except FileNotFoundError:
        messages = []

    return jsonify(messages), 200

@app.errorhandler(404)
def not_found(error):
    return "The requested route was not found,", 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)