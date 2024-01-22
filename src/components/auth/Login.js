import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button } from "react-bootstrap";
import logo from "../img/logo.svg";
import Icon from "../img/logo-icon.svg";

export const Login = () => {
  const [email, set] = useState("molly@email.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUser) => {
        if (foundUser.length === 1) {
          const user = foundUser[0];
          localStorage.setItem(
            "cookijar_user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              userPoints: user.userPoints,
            })
          );
          navigate("/");
          window.alert("Welcome back " + user.name + "!");
        } else {
          window.alert("Invalid login. Please Try again.");
        }
      });
  };

  return (
    <>
      <div className="section">
        <div className="login container">
          <form className="form--login" onSubmit={handleLogin}>
            <img
              alt=""
              src={logo}
              width="auto"
              height="450px"
              className="mx-auto d-block align-center"
            />{" "}
            <fieldset>
              <label htmlFor="inputEmail">
                <h5>Email address: </h5>
              </label>
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
            <Button type="submit" className="button-1">
              Sign in
            </Button>{" "}
            <br /> <hr /> <br />
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </Button>
          </form>
          <div className="promo section">
            <div className="promo container">
              <h3>How it works:</h3> <hr />
              <p>1. Create a task.</p>
              <p>2. Assign a point value to the task.</p>
              <p>
                3. When the task is complete, mark it as complete and receive
                points!
              </p>
              <p>4. Cash in your points for rewards!</p>
              <img
                alt=""
                src={Icon}
                width="auto"
                height="200px"
                className="mx-auto d-block align-center"
              />{" "}
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
