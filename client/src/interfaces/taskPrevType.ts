import type {categoryType} from "./categoryType.ts";
import type {priorityType} from "./priorityType.ts";
import type {statusType} from "./statusType.ts";

export interface taskPrevType {
    taskid: string,
    tasktitle: string,
    taskdescription: string,
    startdatetime: string,
    enddatetime: string,
    category: categoryType,
    priority: priorityType,
    status: statusType
}