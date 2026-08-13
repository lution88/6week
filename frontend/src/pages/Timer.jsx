import { useState, useEffect } from "react";

import "../App.css";

function Timer() {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);

    const [newSubject, setNewSubject] = useState("");
    const onChange = (event) => setNewSubject(event.target.value);

    const getSubjects = async () => {
        const res = await fetch("http://127.0.0.1:5001/subjects");
        const json = await res.json();
        setSubjects(json);
        setLoading(false);
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
        const json = await response.json();

        setSubjects([...subjects, json]);
        setNewSubject("");
    };

    const onDelete = async (subjectId) => {
        const response = await fetch(`http://127.0.0.1:5001/subjects/${subjectId}`, { method: "DELETE" });

        if (!response.ok) {
            return console.error("response not ok", subjectId);
        }

        const result = subjects.filter((subject) => subject.id !== subjectId);
        setSubjects(result);
    };
    useEffect(() => {
        getSubjects();
    }, []);

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
