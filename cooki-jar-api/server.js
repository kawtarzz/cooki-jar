const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8088;
const dbPath = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

const readDatabase = () => {
 try {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
 } catch (error) {
  console.error('Error reading database:', error);
  return { users: [], tasks: [], rewards: [], types: [] };
 }
};

const writeDatabase = (data) => {
 try {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  return true;
 } catch (error) {
  console.error('Error writing database:', error);
  return false;
 }
};

app.get('/api/users', (req, res) => {
 const db = readDatabase();
 res.json(db.users);
});

app.get('/api/users/:id', (req, res) => {
 const db = readDatabase();
 const user = db.users.find(u => u.id === req.params.id);
 if (user) {
  res.json(user);
 } else {
  res.status(404).json({ error: 'User not found' });
 }
});

app.post('/api/users/login', (req, res) => {
 const db = readDatabase();
 const { email } = req.body;
 const user = db.users.find(u => u.email === email);

 if (user) {
  res.json(user);
 } else {
  res.status(401).json({ error: 'Invalid credentials' });
 }
});


app.get('/api/tasks', (req, res) => {
 const db = readDatabase();
 const { userId } = req.query;

 let tasks = db.tasks;
 if (userId) {
  tasks = tasks.filter(task => task.userId === userId);
 }

 res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
 const db = readDatabase();
 const task = db.tasks.find(t => t.id === req.params.id);

 if (task) {
  res.json(task);
 } else {
  res.status(404).json({ error: 'Task not found' });
 }
});

app.post('/api/tasks', (req, res) => {
 const db = readDatabase();
 const newTask = {
  ...req.body,
  id: Date.now().toString(36) + Math.random().toString(36).substr(2)
 };

 db.tasks.push(newTask);

 if (writeDatabase(db)) {
  res.status(201).json(newTask);
 } else {
  res.status(500).json({ error: 'Failed to save task' });
 }
});

app.put('/api/tasks/:id', (req, res) => {
 const db = readDatabase();
 const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);

 if (taskIndex !== -1) {
  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };

  if (req.body.completed && db.tasks[taskIndex].points) {
   const user = db.users.find(u => u.id === db.tasks[taskIndex].userId);
   if (user) {
    user.userPoints = (user.userPoints || 0) + db.tasks[taskIndex].points;
   }
  }

  if (writeDatabase(db)) {
   res.json(db.tasks[taskIndex]);
  } else {
   res.status(500).json({ error: 'Failed to update task' });
  }
 } else {
  res.status(404).json({ error: 'Task not found' });
 }
});

app.delete('/api/tasks/:id', (req, res) => {
 const db = readDatabase();
 const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);

 if (taskIndex !== -1) {
  db.tasks.splice(taskIndex, 1);

  if (writeDatabase(db)) {
   res.json({ message: 'Task deleted successfully' });
  } else {
   res.status(500).json({ error: 'Failed to delete task' });
  }
 } else {
  res.status(404).json({ error: 'Task not found' });
 }
});

// REWARD ROUTES
app.get('/api/rewards', (req, res) => {
 const db = readDatabase();
 const { userId } = req.query;

 let rewards = db.rewards;
 if (userId) {
  rewards = rewards.filter(reward => reward.userId === userId);
 }

 res.json(rewards);
});

app.get('/api/rewards/:id', (req, res) => {
 const db = readDatabase();
 const reward = db.rewards.find(r => r.id === req.params.id);

 if (reward) {
  res.json(reward);
 } else {
  res.status(404).json({ error: 'Reward not found' });
 }
});

app.post('/api/rewards', (req, res) => {
 const db = readDatabase();
 const newReward = {
  ...req.body,
  id: Date.now().toString(36) + Math.random().toString(36).substr(2),
  redeemed: false
 };

 db.rewards.push(newReward);

 if (writeDatabase(db)) {
  res.status(201).json(newReward);
 } else {
  res.status(500).json({ error: 'Failed to save reward' });
 }
});

app.put('/api/rewards/:id/redeem', (req, res) => {
 const db = readDatabase();
 const reward = db.rewards.find(r => r.id === req.params.id);

 if (reward) {
  const user = db.users.find(u => u.id === reward.userId);

  if (user && user.userPoints >= reward.points) {
   user.userPoints -= reward.points;
   reward.redeemed = true;

   if (writeDatabase(db)) {
    res.json({ reward, user });
   } else {
    res.status(500).json({ error: 'Failed to redeem reward' });
   }
  } else {
   res.status(400).json({ error: 'Insufficient points' });
  }
 } else {
  res.status(404).json({ error: 'Reward not found' });
 }
});

app.get('/api/types', (req, res) => {
 const db = readDatabase();
 res.json(db.types);
});

app.get('/api/database', (req, res) => {
 const db = readDatabase();
 res.json(db);
});

app.get('/api/health', (req, res) => {
 res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
 console.log(`Cookie Jar API server is running on port ${PORT}`);
 console.log(`Database file: ${dbPath}`);
});

module.exports = app;