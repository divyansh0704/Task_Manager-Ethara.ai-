// import Project from "../models/projectModel.js";
// import User from "../models/userModel.js";
const Project = require("../models/projectModel");
const User = require("../models/userModel");



const createProject = async (req, res) => {
    try {

        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Project created",
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getProjects = async (req, res) => {
    try {

        let projects;

        // admin sees created projects
        if (req.user.role === "admin") {

            projects = await Project.find({
                createdBy: req.user.id
            })
                .populate("members", "name email");

        }

        
        else {

            projects = await Project.find({
                members: req.user.id
            })
                .populate("members", "name email");

        }

        res.status(200).json({
            success: true,
            projects
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id)
            .populate("members", "name email")
            .populate("createdBy", "name email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateProject = async (req, res) => {
    try {

        const { title, description } = req.body;
       

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description
            },
            {
                new: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated",
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteProject = async (req, res) => {
    try {

        const project = await Project.findByIdAndDelete(
            req.params.id
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const addMember = async (req, res) => {
    try {

        const { email } = req.body;

        // check user exists
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // avoid duplicate members
        if (project.members.includes(user._id)) {
            return res.status(400).json({
                success: false,
                message: "User already added"
            });
        }

        project.members.push(user._id);

        await project.save();

        res.status(200).json({
            success: true,
            message: "Member added",
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject, addMember };