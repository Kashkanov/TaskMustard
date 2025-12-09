import {gql} from "@apollo/client";

export const CHANGE_FOCUSED_TASK = gql`
    mutation ChangeFocus($taskid: UUID!){
        changeFocus(taskid: $taskid) {
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