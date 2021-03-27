import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = (props) => {
    return (
        <nav className="nav justify-content-center bg-white shadow p-3 mb-2">
            <NavLink exact className="font-weight-light mx-5" activeClassName="text-primary font-weight-bold" to="/">Home</NavLink>
            <NavLink className="font-weight-light mx-5" activeClassName="text-primary font-weight-bold" to="/compose">Compose</NavLink>
        </nav>
    );
}

interface NavBarProps {}

export default NavBar;   