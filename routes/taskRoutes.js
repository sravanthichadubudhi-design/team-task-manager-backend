const express = require("express");
const Task = require("../models/Task");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


// 🔐 CREATE TASK (PROTECTED)
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            project,
            assignedTo,
            dueDate
        } = req.body;

        const task = new Task({
            title,
            description,
            project,
            assignedTo,
            dueDate
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// 🔐 GET ALL TASKS (PROTECTED)
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("project", "name")
            .populate("assignedTo", "name email");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// 🔐 UPDATE TASK STATUS (PROTECTED)
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            message: "Task updated",
            task
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;