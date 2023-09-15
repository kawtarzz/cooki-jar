import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Login = () => {
    const [email, set] = useState("molly@email.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUser => {
                if (foundUser.length === 1) {
                    const user = foundUser[0]
                    localStorage.setItem("cookijar_user", JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        points: user.points
                    }))
                    navigate("/home")
                    window.alert('Welcome back ' + user.name + '!')
                }
                else {
                    window.alert("Invalid login. Please Try again.")
                }
            })
    }
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>cookiJar</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">
                            Email address
                        </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}


