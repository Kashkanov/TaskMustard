import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullseye} from "@fortawesome/free-solid-svg-icons";
import {dateDiff} from "../../functions/DateFormatters.ts";
import type {completeTask} from "../../types/completeTask.ts";

type TaskPreviewProps = {
    task: completeTask
    onChangeFocusedTask: (taskid: string) => void
};

const TaskPreview: FC<TaskPreviewProps> = ({task, onChangeFocusedTask}) => {

    return (
        <>
            <div className="flex items-center justify-start w-3/8 h-full truncate px-5">
                {task.tasktitle}
            </div>
            <button
                className="flex flex-col items-center justify-center w-1/8 h-full"
                onClick={()=>onChangeFocusedTask(task.taskid)}
            >
                <FontAwesomeIcon icon={faBullseye}/>
            </button>
            <div className="flex items-center text-start w-1/8 h-full">
                {task.category.categoryname}
            </div>
            <div className="flex items-center text-start w-1/8 h-full">
                <div
                    className="w-3 h-3"
                    style={{background:task.priority.colorcode }}
                />&nbsp;
                {task.priority.priorityname}
            </div>
            <div className="flex items-center text-end w-2/8 h-full px-5">
                <span>{dateDiff(task.startdatetime, task.enddatetime)}</span>
            </div>
        </>
    )
}

export default TaskPreview;