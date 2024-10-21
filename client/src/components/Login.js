import { React, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function Login() {

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();

    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")

    // let name, value;
    const handleEmail = (e) => {
        email = e.target.value;
        setemail(email);
    }

    function handlePassword(event) {
        password = event.target.value;
        setpassword(password);
    }

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            const data = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email, password: password
                })
            });

            const response = await data.json();

            if (response) {
                navigate('/profile');
                dispatch({ type: "USER", payload: true })
            }
            else if (data.status === 404 || !response || data.status === 400) {
                window.alert("Invalid Credentials");
            }

        } catch (error) {
            window.alert('User not found');
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <>
            <h1 className="text-center mt-5">LOGIN TO YOUR ACCOUNT</h1>
            <div className="card p-4 mt-5 shadow-lg container">
                <form method="post">
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="emailLogin" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailLogin" placeholder="name@example.com" value={email} onChange={handleEmail} name="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordLogin" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="passwordLogin"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePassword}
                                    name="password"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={handleShowPassword}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login