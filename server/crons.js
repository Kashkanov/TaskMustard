const cron = require('node-cron');

function initCronJobs(){
    cron.schedule('*/5 * * * *', () => {
        console.log('CronJobs scheduled every 5 mins');
    })
}

module.exports = { initCronJobs };