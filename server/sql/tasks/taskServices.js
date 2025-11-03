const db = require("../../db");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const tasks = await db.any(`SELECT * FROM task`, [true]);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get("/:taskId", async (req, res) => {
    try{
        const taskId = req.params.taskId;
        const task = await db.one(`SELECT * FROM task WHERE taskid = '${taskId}'`);
        res.json(task);
    }catch (err){
        if(err.message === "No data returned from the query.")
            res.status(404).json({error: "Task does not exist."});
        else res.status(500).json({error: err});
    }
})

router.post("/", async (req, res) => {
    try {
        const { taskTitle, taskDescription, startDateTime, endDateTime, priorityID, categoryID, statusID } = req.body
        const newTask = await db.one(`INSERT INTO task(taskTitle, taskDescription, startDateTime, endDateTime, priorityID,
                                                 categoryID, statusID)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING *`, [taskTitle, taskDescription, startDateTime, endDateTime, priorityID, categoryID, statusID]);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;

