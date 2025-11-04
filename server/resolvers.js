const {students, colleges} = require("./db");
const db = require("./db");

const resolvers = {
    Query: {
        hello: () => 'Test Success, GraphQL is up & running !!',
        tasks: async () => {
            try{
                return await db.any(`SELECT * FROM task`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        task: async (_, {taskid}) => {
            try{
                return await db.one(`SELECT * FROM task WHERE taskid = '${taskid}'`);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        categories: async () => {
            try{
                return await db.any(`SELECT * FROM category`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        priorities: async () => {
            try{
                return await db.any(`SELECT * FROM priority`, [true]);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },

    Mutation: {
        createTask: async (_, { tasktitle, taskdescription, startdatetime, enddatetime, priorityid, categoryid, statusid }) => {
            try {
                return await db.one(`INSERT INTO task(tasktitle, taskdescription, startdatetime, enddatetime, priorityid, categoryid, statusid)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING *`, [tasktitle, taskdescription, startdatetime, enddatetime, priorityid, categoryid, statusid]);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}


module.exports = resolvers;