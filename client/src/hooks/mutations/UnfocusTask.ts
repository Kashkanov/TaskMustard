import {gql} from "@apollo/client";

export const UNFOCUS_TASK = gql`
    mutation unfocus($taskid: UUID!) {
        unfocusTask(taskid: $taskid) {
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
    }
`