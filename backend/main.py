from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

SUBJECTS_LIST = [{"id": 1, "name": "Work"}, {"id": 2, "name": "Reading"}]
NEXT_ID = 3


@app.route("/subjects", methods=["GET"])
def get_subjects():
    return jsonify(SUBJECTS_LIST)


@app.route("/subjects", methods=["POST"])
def add_subject():
    global NEXT_ID
    exercise = request.get_json()
    data = {"id": NEXT_ID, "name": exercise["name"]}
    SUBJECTS_LIST.append(data)
    NEXT_ID = NEXT_ID + 1
    return data


@app.route("/subjects/<int:id>", methods=["DELETE"])
def delete_subject(id):
    global SUBJECTS_LIST
    SUBJECTS_LIST = [sub for sub in SUBJECTS_LIST if sub["id"] != id]
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=True, port=5001)
