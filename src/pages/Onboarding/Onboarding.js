import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";
import axios from "axios";
import logo from "../../assets/codebox-low-resolution-logo-color-on-transparent-background1.png";

const Onboarding = () => {
  const [cntr, setCntr] = useState(<div></div>);
  const [errorRegister, setErrorRegister] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const [loginDetails, setLoginDetails] = useState({
    email2: "",
    password3: "",
  });

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const toggler = () => {
    // console.log(cntr)
    cntr.classList.toggle("sign-in");
    cntr.classList.toggle("sign-up");
  };

  useEffect(() => {
    let container = document.getElementById("container");
    setCntr(container);

    setTimeout(() => {
      container.classList.add("sign-in");
    }, 200);
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      if (registerDetails.password === registerDetails.password2) {
        const res = await axios.post("https://codebox-server.vercel.app/api/user/register", {
          firstName: registerDetails.firstName,
          lastName: registerDetails.lastName,
          email: registerDetails.email,
          mobile: registerDetails.mobile,
          password: registerDetails.password,
        });

        console.log(res);

        if (res.message === "New user added!") {
        //   localStorage.setItem("user", JSON.stringify(res.data.result.user));
          setLoginDetails({email:registerDetails.email, password:registerDetails.password});
          login();
        } else {
          setErrorRegister(res.data.message);
          setRegisterDetails({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            password2: "",
          });
        }
      } else {
        setErrorRegister("Passwords do not match!");
        setRegisterDetails({
         firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
          password2: "",
        });
      }
    } catch (error) {
      setErrorRegister(error.response.data.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("https://codebox-server.vercel.app/api/user/login", {
        email: loginDetails.email2,
        password: loginDetails.password3,
      });
      // console.log(res);

      if (res.data.message === "Login Successful!") {
        const user = {firstName: res.data.firstName,
                     lastName: res.data.lastName,
                     email: res.data.email,
                     mobile: res.data.mobile,
                     _id: res.data._id,
                     token: res.data.token}
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setErrorLogin("Invalid Credentials!");
        setLoginDetails({
          email2: "",
          password3: "",
        });
      }
    } catch (error) {
      setErrorLogin(error.response.data.message);
    }
  };

  return (
    <div>
      <div id="container" className="container">
        {/* Form Section */}
        <div className="row">
          {/* Sign-up */}
          <div className="col align-items-center flex-col sign-up">
            <form className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <div className="align-items-center error">
                    {errorRegister}
                  </div>
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-user" />
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleRegisterChange}
                    name="firstName"
                    value={registerDetails.firstName}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-user" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleRegisterChange}
                    name="lastName"
                    value={registerDetails.lastName}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-envelope" />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={handleRegisterChange}
                    name="email"
                    value={registerDetails.email}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-phone"></i>
                  <input
                    type="tel"
                    placeholder="Mobile"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={handleRegisterChange}
                    name="mobile"
                    value={registerDetails.mobile}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handleRegisterChange}
                    name="password"
                    value={registerDetails.password}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    onChange={handleRegisterChange}
                    name="password2"
                    value={registerDetails.password2}
                    required
                  />
                </div>
                <button type="submit" onClick={register}>
                  Sign up
                </button>
                <p>
                  <span>Already have an account? &nbsp;</span>
                  <b onClick={toggler} className="pointer">
                    Sign in here
                  </b>
                </p>
              </div>
            </form>
          </div>
          {/* End of Sign-up */}

          {/* Sign-in */}
          <div className="col align-items-center flex-col sign-in">
            <form className="form-wrapper align-items-center">
              <div className="form sign-in">
                <div className="input-group">
                  <div className="align-items-center error">{errorLogin}</div>
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-user" />
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={handleLoginChange}
                    name="email2"
                    value={loginDetails.email2}
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    name="password3"
                    value={loginDetails.password3}
                    required
                  />
                </div>
                <button type="submit" onClick={login}>
                  Sign in
                </button>
                <p>
                  <b>Forgot password?</b>
                </p>
                <p>
                  <span>Don't have an account? &nbsp;</span>
                  <b onClick={toggler} className="pointer">
                    Sign up here
                  </b>
                </p>
              </div>
            </form>
            <div className="form-wrapper"></div>
          </div>
          {/* End of Sign-in */}
        </div>
        {/* End of Form Section */}

        {/* Content Section */}
        <div className="row content-row">
          {/* Sign-in Content */}
          <div className="col align-items-center flex-col">
            <div className="img sign-in">
              <img src={logo} alt="" />
            </div>
            <div className="text sign-in">
              <h2>Welcome Back!</h2>
            </div>
            <div className="img sign-in"></div>
          </div>
          {/* End of Sign-in Content */}

          {/* Sign-up Content */}
          <div className="col align-items-center flex-col">
            <div className="img sign-up">
              <img src={logo} alt="" />
            </div>
            <div className="text sign-up">
              <h2>Welcome! Join us here</h2>
            </div>
          </div>
          {/* End of Sign-up Content */}
        </div>
        {/* End of Content Section */}
      </div>
    </div>
  );
};

export default Onboarding;
