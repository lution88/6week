import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const getName = async () => {
        const res = await fetch("http://127.0.0.1:5001/subjects");
        const json = await res.json();
        setSubjects(json);
        setLoading(false);
    };
    useEffect(() => {
        getName();
    }, []);

    return (
        <div>
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
