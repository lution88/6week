import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <h1>FOCUS TIMER</h1>

            <Link to="/"> Timer </Link>
            <Link to="/history"> History </Link>
            <Link to="/dashboard"> Dashboard </Link>

            <Outlet />
        </div>
    );
};

export default Layout;
