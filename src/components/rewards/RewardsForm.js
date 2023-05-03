import { click } from "@testing-library/user-event/dist/click"
import { useState } from "react"
import { json, useNavigate } from "react-router-dom"
import { createNewReward } from "./Rewards.js"

export const RewardForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [reward, update] = useState({
        rewardDescription: "",
        setPoints: "",
        expireOnDate: "Date"
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the reward list
    */

    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const rewardToSendToAPI = {
            userId: cookijarUserObject.id,
            rewardDescription: reward.description,
            setPoints: reward.setPoints,
            expireOnDate: reward.expireOnDate
        }
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/rewards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rewardToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/rewards")
            })
    }

    return (
        <form className="rewardForm">
            <h2 className="rewardForm__title">New reward</h2>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rewardDescription">reward Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of reward"
                        value={reward.description}
                        onChange={
                            (evt) => {
                                const copy = { ...reward }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
                  
            <fieldset>
                <div className="form-group">
                    <label htmlFor="expire">Expiration:</label>
                    <input type="time" id="expire" name="expire" min="09:00" max="18:00" required
                        value={reward.expireOnDate}
                        onChange={
                            (evt) => {
                                const copy = { ...reward }
                                copy.expireOnDate = evt.target.value
                                update(copy)
                                createNewReward(evt)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="submit">
                Submit
            </button>
        </form>
    )
}
