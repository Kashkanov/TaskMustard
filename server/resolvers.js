const {students, colleges} = require("./db");

const Query = {
    hello: () => 'Test Success, GraphQL is up & running !!',
    students: () => students
}

const Student = {
    college: (parent) => colleges.find(c => c.id === parent.collegeId)
}

module.exports = {Query, Student};