import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../img/logo.svg";
import { API_ENDPOINTS } from "../../api/config";

export default function Login() {
  const [email, setEmail] = useState("molly@email.com");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
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

  return (
    <>
      <div className="login-background">
        <div className="login-card">
          <form onSubmit={handleLogin} className="form--login">
            <img
              alt=""
              src={logo}
              width="auto"
              height="450px"
              className="block mx-auto"
            />
            <fieldset>
              <label htmlFor="inputEmail">
                <h5>Email address:</h5>
              </label>
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
            <button type="submit" className="button-1">
              Sign in
            </button>
            <br /> <hr /> <br />
            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </button>
          </form>
        </div>
        <div className="explainer-card">
          <div>
            <h3>How it Works</h3>
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
          </div>
        </div>
      </div>
    </>
  );
}
