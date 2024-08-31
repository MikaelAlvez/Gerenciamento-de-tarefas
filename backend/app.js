const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/db');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
});

module.exports = app;
