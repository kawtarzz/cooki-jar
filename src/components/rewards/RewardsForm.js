export const RewardsForm = ({ reward, setReward, submitReward }) => {
  return (
    <>
      <div className="mx-auto reward__section">
        <h3 className="reward__header">{reward.id ? 'Edit reward' : 'Add New reward'}</h3>
        <div className="reward__card">
          <form>
            <fieldset>
              <div className="reward__list">
                <label htmlFor="rewardDescription">Reward Description:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="w-full form__text"
                  placeholder="Short reward description"
                  value={reward.rewardDescription || ""}
                  onChange={(e) => {
                    setReward({ ...reward, rewardDescription: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="reward__list">
                <label htmlFor="points">Set Point Value:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 form__text"
                  placeholder="Enter Point Value"
                  value={reward.points}
                  onChange={(e) => {
                    setReward({ ...reward, points: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <div className="flex gap-2 mt-3 button__container">

              <button
                type="submit"
                onClick={submitReward}
              >
                Add Reward
              </button>
            </div>
          </form >
        </div >
      </div >
    </>
  );
};

// <div className="reward__header">
//   <div className="reward__form">
//     <h3>Add New reward</h3>
//   </div>
//   <div className="reward__list">
//     <form>
//       <fieldset>
//         <div className="reward__list">
//           <label htmlFor="form__text">Reward Description:</label>
//           <input
//             required
//             autoFocus
//             type="text"
//             className="w-full form__text"
//             placeholder="short reward description"
//             value={reward.rewardsDescription}
//             onChange={(e) => {
//               setReward({
//                 ...reward,
//                 rewardsDescription: e.target.value,
//               });
//             }}
//           />
//         </div>
//       </fieldset>
//       <fieldset>
//         <div className="rewards__list">
//           <label htmlFor="reward__points form__text">Enter Point Value:</label>
//           <input
//             required
//             autoFocus
//             type="text"
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="point value"
//             value={reward.points}
//             onChange={(e) => {
//               setReward({ ...reward, points: e.target.value });
//             }}
//           />
//         </div>
//       </fieldset>