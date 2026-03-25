import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Button, Card, Form, Container } from "react-bootstrap";
import logo from "../img/logo.svg";
import Icon from "../img/logo-icon.svg";
import { API_ENDPOINTS } from "../../api/config";

export default function Login() {
  const [email, setEmail] = useState("molly@email.com");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers
          : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Invalid login");

      const user = await res.json();

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
    } catch (error) {
      console.log("Login error", error);
      window.alert("Login failed. Please check your email and try again.");
    }
  };

  // const handleGuestLogin = () => {
  //   const guestUser = {
  //     id: 0,
  //     name: "Guest",
  //     email: "guest@cookijar.com",
  //     userPoints: 0,
  //   };

  //   localStorage.setItem("cookijar_guest", JSON.stringify(guestUser));
  //   localStorage.setItem('cookijar_guest_mode', 'true');
  //   navigate("/");
  //   window.alert("Welcome Guest! Feel free to explore the app.");
  // }

  return (
    <>
      <Container fluid className="p-0 login-background">
        <Card className="login-card container mx-auto mt-5 p-4">
          <Form onSubmit={handleLogin} className="form--login">
            <img
              alt=""
              src={logo}
              width="auto"
              height="450px"
              className="mx-auto d-block align-center"
            />
            <fieldset>
              <label htmlFor="inputEmail">
                <h5>Email address:</h5>
              </label>
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
            <Button type="submit" className="button-1">
              Sign in
            </Button>
            <br /> <hr /> <br />
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </Button>
          </Form>
        </Card>
        <Card className="explainer-card container mx-auto mt-5 p-4">
          <Card.Body>
            <Card.Title>How it Works</Card.Title>
            <ol>
              <li>
                <strong>Register:</strong> Create an account to start using
                cookiJar. Your account will track your points and rewards.
              </li>
              <li>
                <strong>Create Tasks:</strong> Add tasks you want to complete.
                Assign point values to each task based on difficulty or
                importance.
              </li>
              <li>
                <strong>Complete Tasks:</strong> Finish your tasks and earn
                points. Use your points to unlock rewards and track your
                progress.
              </li>
              <li>
                <strong>Redeem Rewards:</strong> Create rewards that you can
                redeem with your points. Treat yourself for a job well done!
              </li>
            </ol>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}