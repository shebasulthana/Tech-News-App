import React, { useState } from 'react'

function SignUpForm() {

    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })

    // Handling the inputs
    let name, value;
    const handleInputs = (event) => {
        name = event.target.name;
        value = event.target.value;

        setuser({ ...user, [name]: value });
    }


    let userData = user;

    const postData = async (event) => {

        // Prevents the reloading of the page
        event.preventDefault();
        const { firstName, lastName, userName, email, phone, password, cpassword } = userData;

        // Fetching the data and sending to the server
        const data = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, userName, email, phone, password, cpassword
            })
        });

        // Getting the response
        const response = await data.json();

        // Checking the status
        if (data.status === 422) {
            window.alert("Email is already in use");
        }
        else if (data.status === 401) {
            window.alert("Passwords Doesn't match");
        }
        else if (!response) {
            window.alert("Unable to register user")
        }
        else {
            window.alert("Registered Successfully");
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <div className="container">
                <form method="POST">
                    <div className="mb-3">
                        <label htmlFor="signupFname" className="form-label">First Name</label>
                        <input type="text" value={user.firstName} className="form-control" id="signupFname" placeholder="First Name" onChange={handleInputs} name="firstName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signUpLname" className="form-label">Last name</label>
                        <input type="text" value={user.lastName} className="form-control" id="signUpLname" placeholder="Last Name" onChange={handleInputs} name="lastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupUname" className="form-label">Username</label>
                        <input type="text" value={user.userName} className="form-control" id="signupUname" placeholder="Username" onChange={handleInputs} name="userName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupPhone" className="form-label">Phone Number</label>
                        <input type="number" value={user.phone} className="form-control" id="signupPhone" placeholder="Phone Number" onChange={handleInputs} name="phone" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">Email address</label>
                        <input type="email" value={user.email} className="form-control" id="signupEmail" placeholder="name@example.com" onChange={handleInputs} name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={user.password}
                                className="form-control"
                                id="signupPassword"
                                placeholder="Password"
                                onChange={handleInputs}
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
                    <div className="mb-3">
                        <label htmlFor="signupCpassword" className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={user.cpassword}
                                className="form-control"
                                id="signupCpassword"
                                placeholder="Confirm password"
                                onChange={handleInputs}
                                name="cpassword"
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

                    {/* Error: Cannot post the data */}
                    {/* Solution: Added onClick event to the submit button */}
                    <button type="submit" onClick={postData} className="btn btn-primary ">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUpForm