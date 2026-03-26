import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/config";
import "./Login.css";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    userPoints: 0,
  });

  const submitUser = (event) => {
    event.preventDefault();

    const newUserToAPI = {
      id: user.id,
      email: user.email,
      name: user.name,
      userPoints: 0,
    };

    fetch(API_ENDPOINTS.USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserToAPI),
    })
      .then((res) => {
        console.log("API response status:", res.status);
        if (!res.ok) throw new Error("Failed to create user");
        return res.json();
      })
      .then((createdUser) => {
        localStorage.setItem(
          "cookijar_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            userPoints: createdUser.userPoints,
          })
        );
        window.alert(`Welcome to cookiJar, ${createdUser.name}!`);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        window.alert("Error creating user. Please try again.");
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <>
      <div className="flex justify-center items-center" style={{ minHeight: "100vh" }}>
        <form className="form--login" onSubmit={submitUser}>
          <h1>Please Register for cookiJar</h1>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="What's your name?"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email address:</label>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <button type="submit">Register</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
