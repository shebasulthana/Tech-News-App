import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handling form input changes
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Toggling password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handling form submission
  const postData = async (event) => {
    event.preventDefault();
    const { firstName, lastName, userName, email, phone, password, cpassword } = user;

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, userName, email, phone, password, cpassword }),
      });

      if (response.status === 422) {
        window.alert("Email is already in use");
      } else if (response.status === 401) {
        window.alert("Passwords don't match");
      } else if (response.ok) {
        window.alert("Registered Successfully");
        navigate("/login");
      } else {
        window.alert("Failed to register");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-center mt-3 mt-5">SIGN UP TO YOUR ACCOUNT</h1>
      <div className="container p-4 shadow-lg card">
        <div className="container">
          <form method="POST" onSubmit={postData}>
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
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
