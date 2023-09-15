const database = require('../../cooki-jar-api/database.json');


const pointsManager = () => {
  const points = 0;

  const addPoints = (amount) => {
    points += amount;
  };

  const getPoints = () => points;

  return {
    addPoints,
    getPoints,
  };
};

export default pointsManager;

// Path: components/tasks/TaskList.js
