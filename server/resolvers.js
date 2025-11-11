const {students, colleges} = require("./db");
const db = require("./db");

const resolvers = {
    Query: {
        hello: () => 'Test Success, GraphQL is up & running !!',
        tasks: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM task`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        todoTasks: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM task
                                     WHERE statusid = 1`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        ongoingTasks: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM task
                                     WHERE statusid = 2`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        task: async (_, {taskid}) => {
            try {
                return await db.one(`SELECT *
                                     FROM task
                                     WHERE taskid = '${taskid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },

        categories: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM category`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        priorities: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM priority`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },

    Mutation: {
        createTask: async (_, {
            tasktitle,
            taskdescription,
            startdatetime,
            enddatetime,
            priorityid,
            categoryid,
            statusid
        }) => {
            try {
                await db.one(`INSERT INTO task(tasktitle, taskdescription, startdatetime, enddatetime,
                                                      priorityid, categoryid, statusid)
                                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                                     RETURNING *`, [tasktitle, taskdescription, startdatetime, enddatetime, priorityid, categoryid, statusid]);
                return {
                    success: true,
                    message: "Task created successfully"
                }
            } catch (err) {
                return {
                    success: false,
                    message: err.message
                };
            }
        },
        changeTaskStatus: async (_, {taskid, statusid}) => {
            try {
                await db.none(`UPDATE task
                                     SET statusid = '${statusid}'
                                     WHERE taskid = '${taskid}'`);
                return {
                    success: true,
                    message: "Status changed successfully"
                }
            } catch (err) {
                return {
                    success: false,
                    message: err.message
                };
            }
        }
    },

    task: {
        startdatetime: (task) => {
            // console.log(task.startdatetime.toISOString())
            return task.startdatetime.toISOString()
        },
        enddatetime: (task) => {
            return task.enddatetime.toISOString()
        },
        category: async (task) => {
            try {
                return await db.one(`SELECT *
                                     FROM category
                                     WHERE categoryid = '${task.categoryid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        priority: async (task) => {
            try {
                return await db.one(`SELECT *
                                     FROM priority
                                     WHERE priorityid = '${task.priorityid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        status: async (task) => {
            try {
                return await db.one(`SELECT *
                                     FROM status
                                     WHERE statusid = '${task.statusid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}


module.exports = resolvers;