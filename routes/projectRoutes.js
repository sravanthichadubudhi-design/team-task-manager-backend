const express = require("express");
const Project = require("../models/Project");

const router = express.Router();


// CREATE PROJECT
router.post("/create", async (req, res) => {
    try {

        const { name, description, admin, members } = req.body;

        const project = new Project({
            name,
            description,
            admin,
            members
        });

        await project.save();

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// GET ALL PROJECTS
router.get("/", async (req, res) => {
    try {

        const projects = await Project.find()
            .populate("admin", "name email")
            .populate("members", "name email");

        res.json(projects);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;