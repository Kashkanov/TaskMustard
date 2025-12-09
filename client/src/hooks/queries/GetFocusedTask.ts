import {gql} from "@apollo/client";

export const GET_FOCUSED_TASK = gql`
    query GetFocusedTask {
        focusedTask {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
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
`;