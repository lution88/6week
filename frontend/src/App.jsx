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
                            <h3>{subject.name}</h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
