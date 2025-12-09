import {gql} from "@apollo/client";

export const GET_ONGOING_TASKS = gql`
    query GetOngoingTasks {
        ongoingTasks {
            taskid
            tasktitle
            taskdescription
            status {
                statusid
                statusname
            }
            startdatetime
            priority {
                priorityid
                priorityname
                colorcode
            }
            enddatetime
            category {
                categoryid
                categoryname
            }
        }
    }
`;