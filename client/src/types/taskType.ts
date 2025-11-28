export interface taskType {
    taskTitle: string,
    taskDescription: string,
    startDateTime: string,
    endDateTime: string | null,
    categoryID: number,
    priorityID: number,
    statusID: number,
    isFocus: boolean,
}