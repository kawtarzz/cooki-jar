import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        points: 0
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("cookijar_user", JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.name,
                        email: createdUser.email,
                        points: createdUser.points
                    }))
                    navigate("/")
       }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
                <main style={{ textAlign: "center" }}>  
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for cookiJar </h1>
                <fieldset>
                    <label htmlFor="name"> Name: </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Whats your name?" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address: </label>
                    <input onChange={updateUser}
                        type="text" id="email" className="form-control"
                        placeholder="Email address" required autoFocus/>
                </fieldset>
               
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}



