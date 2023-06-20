// import { click } from "@testing-library/user-event/dist/click"
// import { useState } from "react"
// import { json, useNavigate } from "react-router-dom"
// import RewardsList from "./Rewards.js"
// import { FormControl } from "react-bootstrap"
// import { Card } from "react-bootstrap"
// import CardHeader from "react-bootstrap/esm/CardHeader.js"
// import { useEffect } from "react"

// export const RewardsForm = ({ reward, setReward, submitReward }) => {
//     const [rewards, setRewards] = useState();
//     const localcookiJarUser = localStorage.getItem("cookijar_user")
//     const cookijarUserObject = JSON.parse(localcookiJarUser)

//     useEffect(() => {
//         fetch(`http://localhost:8088/rewards?userId=${cookijarUserObject.id}&redeemed=false`)
//             .then((res) => res.json())
//             .then((res) => JSON.stringify(setRewards))
//     }, [])


//     return (<>
//         <Card>
//             <Card.Header className="reward__header">
//                 Add New Reward
//             </Card.Header>
//             <Card.Body>
//                 <form>
//                     <fieldset>
//                         <div className="reward__list">
//                             <label htmlFor="rewardDescription">
//                                 Reward Description:
//                             </label>
//                             <input required autoFocus type="text"
//                                 className="form-control"
//                                 placeholder="short reward description"
//                                 value={reward.rewardsDescription}
//                                 onChange={(event) => {
//                                     setRewards({ ...reward, rewardsDescription: event.target.value })
//                                 }} />
//                         </div>

//                     </fieldset>
//                 </form>

//             </Card.Body>
//         </Card>
//     </>

//     )
// }
