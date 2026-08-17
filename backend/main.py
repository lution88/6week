from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(
    app,
    origins=[
        "http://localhost:5173",
        "http://localhost:4174",
        "https://lution88.github.io",
    ],
)

SUBJECTS_LIST = []
NEXT_ID = 3

SESSIONS_LIST = []
SESSION_COUNT = 1


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
    return jsonify(SUBJECTS_LIST)


@app.route("/sessions", methods=["GET"])
def get_sessions():
    # subjects list
    name_by_id = {s["id"]: s["name"] for s in SUBJECTS_LIST}
    # sessions list
    result = [
        {**s, "subject_name": name_by_id.get(s["subject_id"], "삭제된 항목")}
        for s in SESSIONS_LIST
    ]
    return jsonify(result)


@app.route("/sessions", methods=["POST"])
def add_session():
    global SESSION_COUNT
    front_data = request.get_json()
    data = {
        "id": SESSION_COUNT,
        "subject_id": front_data["subject_id"],
        "seconds": front_data["seconds"],
        "created_at": datetime.now().isoformat(),
    }
    SESSIONS_LIST.append(data)
    SESSION_COUNT += 1
    return data


if __name__ == "__main__":
    app.run(debug=True, port=5001)
