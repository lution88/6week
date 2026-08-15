import { useState, useEffect } from "react";

import "../App.css";

const FOCUS_SECONDS = 1500;
function Timer() {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    const [newSubject, setNewSubject] = useState("");

    const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
    const [isRunning, setRunning] = useState(false);

    const onChange = (event) => setNewSubject(event.target.value);

    const getSubjects = async () => {
        const res = await fetch("http://127.0.0.1:5001/subjects");
        setLoading(false);
        if (!res.ok) {
            return console.error("response not ok getSubjects");
        }
        const json = await res.json();
        setSubjects(json);
    };

    const onAddSubject = async (e) => {
        e.preventDefault();

        if (newSubject === "") {
            return;
        }
        const response = await fetch("http://127.0.0.1:5001/subjects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newSubject }),
        });
        if (!response.ok) {
            return console.error("response not ok onAddSubject");
        }
        const json = await response.json();

        setSubjects([...subjects, json]);
        setNewSubject("");
    };

    const onDelete = async (subjectId) => {
        const response = await fetch(`http://127.0.0.1:5001/subjects/${subjectId}`, { method: "DELETE" });

        if (!response.ok) {
            return console.error("response not ok onDelete", subjectId);
        }

        const result = subjects.filter((subject) => subject.id !== subjectId);
        setSubjects(result);
    };

    const numToString = (number) => {
        return String(number).padStart(2, "0");
    };

    const isRunningToggle = () => {
        setRunning(!isRunning);
    };
    useEffect(() => {
        getSubjects();
    }, []);

    const resetAll = () => {
        setRunning(false);
        setSecondsLeft(FOCUS_SECONDS);
    };

    useEffect(() => {
        if (!isRunning) return;
        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    useEffect(() => {
        if (secondsLeft > 0) return;
        setRunning(false);
    }, [secondsLeft]);

    return (
        <div>
            <form onSubmit={onAddSubject}>
                <input
                    name="name"
                    value={newSubject}
                    type="text"
                    placeholder="Write subject"
                    onChange={onChange}
                ></input>
                <button>추가</button>
            </form>
            <h2>
                {numToString(Math.floor(secondsLeft / 60))}:{numToString(secondsLeft % 60)}
                <button onClick={isRunningToggle} disabled={secondsLeft <= 0}>
                    {isRunning ? `일시정지` : " 시  작 "}
                </button>
                <button onClick={resetAll}>RESET</button>
            </h2>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <ul>
                    {subjects.map((subject) => (
                        <li key={subject.id}>
                            <div>
                                <h3>
                                    {subject.name}
                                    <button onClick={() => onDelete(subject.id)}>삭제</button>
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Timer;
