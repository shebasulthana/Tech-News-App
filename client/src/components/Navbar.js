import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../App';

function Navbar() {
    const { state, dispatch } = useContext(UserContext)
    function changeToDark() {
        document.body.setAttribute("data-bs-theme", "dark");
    }
    function changeToLight() {
        document.body.setAttribute("data-bs-theme", "light");
    }
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <Link className="btn btn-primary mx-2" to="/logout">Logout</Link>
                </>
            )
        }
        else {
            return (
                <>
                    <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup">Sign Up</Link>
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-brand">TechLens</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">All</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Artificial-intelligence">Artificial Intelligence</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Gadgets">Gadgets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Software">Software</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cloud-computing">Cloud Computing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Blockchain">Blockchain</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cybersecurity">Cybersecurity</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Gaming">Gaming</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Profile">Your Profile</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Change Theme
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button className="dropdown-item d-flex justify-content-between" onClick={changeToLight}>
                                            <div className="lightMode">Light</div>
                                            <div className="lightModeIco"><i className="fa-solid fa-sun"></i></div>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item d-flex justify-content-between" onClick={changeToDark}>
                                            <div className="darkMode">Dark</div>
                                            <div className="darkModeIco"><i className="fa-solid fa-moon"></i></div>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-flex" role="search">
                            <RenderMenu />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
