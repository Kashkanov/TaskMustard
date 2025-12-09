import {gql} from "@apollo/client";

export const CHANGE_TASK_STATUS = gql`
    mutation ChangeTaskStatus($taskid: UUID!, $statusid: Int!){
        changeTaskStatus(taskid: $taskid, statusid: $statusid) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
            priority {
                priorityid
                priorityname
                colorcode
            }
            category {
                categoryid
                categoryname
            }
            status {
                statusid
                statusname
            }
            isfocus
        }
    }`