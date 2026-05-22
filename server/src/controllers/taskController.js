const Task = require("../models/taskModel.js")
const Project = require("../models/projectModel.js")




const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      project,
      assignedTo,
      dueDate,
      priority
    } = req.body;

    
    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      priority,
      assignedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const getTasks = async (req, res) => {
  try {

    let tasks;
    if (req.user.role === "admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "title");

    }


    else {

      tasks = await Task.find({
        assignedTo: req.user.id
      })
      .populate("assignedTo", "name email")
      .populate("project", "title");

    }

    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const getTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email")
      .populate("project", "title description");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    
    if (
      req.user.role === "member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Task updated",
      task: updatedTask
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const deleteTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



module.exports =  {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};