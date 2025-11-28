import {type FC, useEffect, useRef} from "react";
import type {completeTask} from "../../types/completeTask.ts";
import {dateDiff} from "../../functions/DateFormatters.ts";

type FocusedTaskProps = {
    task: completeTask
}

const FocusedTask: FC<FocusedTaskProps> = ({task}) => {

    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descRef.current) {
            descRef.current.innerHTML = task.taskdescription;
        }
    }, [task.taskdescription]);

    return (
        <div
            className="absolute left-0 top-0 flex flex-col items-center justify-start w-full h-full bg-whiterounded-lg p-5"
        >
            <div className="flex justify-between items-start w-full h-2/6">
                <span className="text-start font-semibold w-1/2 text-2xl truncate">
                    {task.tasktitle}
                </span>
                <span className="w-1/8 text-lg truncate">
                    {task.category.categoryname}
                </span>
                <span className="flex items-center w-1/8 text-lg truncate">
                    <div
                        className="w-5 h-5 border-1 border-black"
                        style={{background:task.priority.colorcode }}
                    />&nbsp;
                    {task.priority.priorityname}
                </span>
                <span className="w-1/8 text-end text-lg truncate font-bold text-red-600">
                    {dateDiff(task.startdatetime, task.enddatetime)} remaining
                </span>
                <div className="w-1/8 pl-10 h-5/6">
                    <button className="h-full w-full bg-secondary-800 font-bold text-white rounded-md">
                        Done!
                    </button>

                </div>
            </div>
            <div
                className="w-full h-5/6 ql-editor border-1"
                ref={descRef}
            >
                {task.taskdescription}
            </div>
        </div>
    )
}

export default FocusedTask;