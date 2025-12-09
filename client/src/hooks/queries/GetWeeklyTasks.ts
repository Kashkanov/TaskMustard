import {gql} from "@apollo/client";

export const GET_WEEKLY_TASKS = gql`
    query TasksByWeek($start: String!, $end: String!) {
        tasksByWeek(start: $start, end: $end) {
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