import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState();

    useEffect(() => {
        const res = fetch("http://127.0.0.1:5001/subjects").then((data) => {
            res.json();
        });
        console.log(data);
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
