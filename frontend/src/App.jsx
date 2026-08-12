import { useState, useEffect } from "react";
import "./App.css";

function App() {
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

    const onSubmit = async (e) => {
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

    const onDelete = async (subject_id) => {
        const response = await fetch(`http://127.0.0.1:5001/subjects/${subject_id}`, { method: "DELETE" });

        const result = subjects.filter((subject) => subject.id !== subject_id);
        setSubjects(result);
    };
    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="name"
                    value={newSubject}
                    type="text"
                    placeholder="Write exercise"
                    onChange={onChange}
                ></input>
                <button>Click</button>
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
                                    <button onClick={() => onDelete(subject.id)}>click me</button>
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
