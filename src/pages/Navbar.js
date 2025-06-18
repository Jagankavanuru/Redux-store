import { NavLink } from "react-router-dom";
function Navbar(){
    return(
        <>
        <nav className="nav nav-navbar navbar-collapse">
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/registration'>Register</NavLink></li>
                
            </ul>
            </nav>
        </>
    )
}
export default Navbar;