import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function History() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSessions = async () => {
        const res = await fetch(`${API_URL}/sessions`);
        setLoading(false);
        if (!res.ok) {
            return console.error("response not ok getSessions");
        }
        const json = await res.json();
        const newJson = [...json].reverse();
        setSessions(newJson);
    };

    const changeNewDate = (created_at) => {
        const newDate = new Date(created_at).toLocaleString("ko-KR");
        return newDate;
    };

    useEffect(() => {
        getSessions();
    }, []);

    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <h1>History</h1>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        {session.subject_name} - {Math.floor(session.seconds / 60)} 분 -
                        {changeNewDate(session.created_at)}{" "}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
