const {parse, startOfDay, endOfDay} = require("date-fns")
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
                                     WHERE statusid = 1
                                       AND isfocus = false`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        ongoingTasks: async () => {
            try {
                return await db.any(`SELECT *
                                     FROM task
                                     WHERE (statusid = 2
                                       OR statusid = 4)
                                       AND isfocus = false`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        task: async (_, {taskid}) => {
            try {
                return await db.any(`SELECT *
                                     FROM task
                                     WHERE taskid = '${taskid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        focusedTask: async () => {
            try {
                return await db.oneOrNone(`SELECT *
                                           FROM task
                                           WHERE isfocus = true`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        tasksByWeek: async (_, {start, end}) => {
            const s = parse(start, 'MM/dd/yyyy', new Date());
            const startDate = startOfDay(s);
            const e = parse(end, 'MM/dd/yyyy', new Date());
            const endDate = endOfDay(e);

            console.log(`${typeof start} - ${typeof end}`);

            try {
                return await db.manyOrNone(`SELECT *
                                            FROM task
                                            WHERE startdatetime BETWEEN $1 AND $2
                                               OR enddatetime BETWEEN $1 AND $2`,
                    [startDate, endDate]
                );
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
                                     FROM priority
                                     ORDER BY priorityid`, [true]);
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
            statusid,
            isfocus,
        }) => {
            try {
                const newTask = await db.one(`INSERT INTO task(tasktitle, taskdescription, startdatetime, enddatetime,
                                                               priorityid, categoryid, statusid, isfocus)
                                              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                                              RETURNING *`, [tasktitle, taskdescription, startdatetime, enddatetime, priorityid, categoryid, statusid, isfocus]);
                return newTask;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        changeTaskStatus: async (_, {taskid, statusid}) => {
            try {
                const updatedTask = await db.one(`UPDATE task
                                                  SET statusid = '${statusid}',
                                                      isfocus  = false
                                                  WHERE taskid = '${taskid}'
                                                  RETURNING *`, [taskid]);
                return updatedTask
            } catch (err) {
                throw new Error(err.message);
            }
        },
        changeFocus: async (_, {taskid}) => {
            try {
                // set current focused task to false
                await db.any(`UPDATE task
                              SET isfocus = false
                              WHERE isfocus = true`, [taskid]);
                // set new task isfocus to true
                const focusedTask = await db.one(`UPDATE task
                                                  SET isfocus = true
                                                  WHERE taskid = '${taskid}'
                                                  RETURNING *`, [taskid]);
                return focusedTask;

            } catch (err) {
                throw new Error(err.message);
            }
        },
        unfocusTask: async (_, {taskid}) => {
            try {
                const unfocusedTask = await db.one(`UPDATE task
                                                    SET isfocus = false
                                                    WHERE taskid = '${taskid}'
                                                    RETURNING *`, [taskid]);

                return unfocusedTask;
            } catch (err) {
                throw new Error(err.message);
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
                return await db.one(`
                    SELECT *
                    FROM category
                    WHERE categoryid = '${task.categoryid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        priority: async (task) => {
            try {
                return await db.one(`
                    SELECT *
                    FROM priority
                    WHERE priorityid = '${task.priorityid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        status: async (task) => {
            try {
                return await db.one(`
                    SELECT *
                    FROM status
                    WHERE statusid = '${task.statusid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}


module.exports = resolvers;