const cron = require('node-cron');
const db = require("./db");

function initCronJobs() {
    cron.schedule('* * * * *', async () => {
        // check overdue tasks

        try {
            const today = new Date();

            const res = await db.any(`UPDATE task
                                      SET statusid = 4
                                      WHERE statusid != 4
                                        AND enddatetime < $1
                                      RETURNING taskid`,
                [today])
            console.log(res);
        } catch (err) {
            console.log(err)
        }

    })

    cron.schedule('* * * * *', async () => {
        try {
            const today = new Date().toISOString().split('T')[0];

            const res = await db.any(`UPDATE task
                                      SET statusid = 2
                                      WHERE statusid = 1
                                        AND startdatetime::date = $1
                                      RETURNING taskid`,
                [today])
        } catch (err) {
            console.log(err)
        }
    })
}

module.exports = {initCronJobs};