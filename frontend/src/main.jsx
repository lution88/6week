import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Timer from "./pages/Timer.jsx";
import History from "./pages/History.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./components/Layout.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Timer />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
