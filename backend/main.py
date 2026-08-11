from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


@app.route("/subjects", methods=["GET"])
def get_subjects():
    return jsonify([{"id": 1, "name": "Work"}, {"id": 2, "name": "Reading"}])


if __name__ == "__main__":
    app.run(debug=True, port=5001)
