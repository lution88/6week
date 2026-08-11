import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState([]);
    const getName = async () => {
        const res = await fetch("http://127.0.0.1:5001/subjects");
        const json = await res.json();
        console.log(json);
    };
    useEffect(() => {
        getName();
    }, []);

    return (
        <div>
            <ul>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}

export default App;
