const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    let task = await Task.findOne({ where: { id, userId: req.user.userId } });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task = await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
