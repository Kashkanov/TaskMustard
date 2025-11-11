import type {FC} from "react";
import type {taskPrevType} from "../../types/taskPrevType.ts";
import {gql} from "@apollo/client";

type TaskPreviewProps = {
    task: taskPrevType
    onChangeStatus: (taskid: string, statusid: number) => void
};

const TaskPreview: FC<TaskPreviewProps> = ({task, onChangeStatus}) => {

    const dateDiff = (rawDate: string) => {
        const now = new Date();
        const end = new Date(rawDate);
        console.log(`now: ${now}, end: ${rawDate}`);
        const diffMs = end - now;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days >= 1) {
            return `${days} day${days > 1 ? "s" : ""} remaining`;
        } else if (hours >= 1) {
            return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
        } else if (minutes >= 1) {
            return `${minutes} minute${minutes > 1 ? "s" : ""} remaining`;
        } else {
            return `${seconds} second${seconds !== 1 ? "s" : ""} remaining`;
        }
    }

    return (
        <div className="flex h-25 w-full bg-[#E0E0E0] rounded-md shadow-md">
            <div className="flex flex-col items-start justify-center w-1/2 h-full p-5">
                <div className="w-full h-1/2 text-start truncate">{task.tasktitle}</div>
                <button className=" h-1/2 bg-blue-700 px-3 text-white font-semibold rounded-md" onClick={() => {
                    onChangeStatus(task.taskid, 2)
                }}
                >
                    Start Task
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-1/8 h-full">
                {task.category.categoryname}
            </div>
            <div className="flex flex-col items-center justify-center w-1/8 h-full">
                {task.priority.priorityname}
            </div>
            <div className="flex flex-col items-end justify-center w-2/8 h-full px-5">
                <span>Start - End</span>
                <span>{dateDiff(task.enddatetime)}</span>
            </div>
        </div>
    )
}

export default TaskPreview;