import {gql} from "@apollo/client";

export const GET_PRIORITIES = gql`{
    priorities {
        priorityid,
        priorityname
    }
}`;