import {gql} from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CreateTask($tasktitle: String!, $taskdescription: String, $startdatetime: String!, $enddatetime: String,  $priorityid: Int!, $categoryid: Int!, $statusid: Int, $isfocus: Boolean!) {
        createTask(tasktitle: $tasktitle, taskdescription: $taskdescription, startdatetime: $startdatetime, enddatetime: $enddatetime, priorityid: $priorityid, categoryid: $categoryid, statusid: $statusid, isfocus: $isfocus) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
            isfocus
        }
    }
`;