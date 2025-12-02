import {type FC, useEffect, useRef} from "react";
import type {completeTask} from "../../types/completeTask.ts";
import {dateDiff} from "../../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faRectangleXmark} from "@fortawesome/free-solid-svg-icons";

type FocusedTaskProps = {
    task: completeTask | null
    onChangeStatus: (taskid: string, statusid: number) => void
    onUnfocus: (taskid: string) => void
}

const FocusedTask: FC<FocusedTaskProps> = ({task, onChangeStatus, onUnfocus}) => {

    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descRef.current && task) {
            descRef.current.innerHTML = task.taskdescription;
        }
    }, [task?.taskdescription]);

    return (
        <>
            {task && (
                <div
                    className="flex flex-col items-center justify-start w-full h-full bg-white rounded-lg p-5"
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
                                style={{background: task.priority.colorcode}}
                            />
                            &nbsp;
                            {task.priority.priorityname}
                        </span>
                        <span className="w-1/8 text-end text-lg truncate font-bold text-red-600">
                            {dateDiff(task.startdatetime, task.enddatetime)} remaining
                        </span>
                        <div className="flex flex-col justify-between items-center w-1/8 pl-10 py-1 h-full gap-1">
                            <button
                                className="h-full w-full bg-green-600 hover:bg-green-400 font-bold text-white rounded-sm"
                                onClick={() => onChangeStatus(task?.taskid, 3)}
                            >
                                I'm done &nbsp; <FontAwesomeIcon icon={faCheck}/>
                            </button>
                            <button
                                className="h-full w-full bg-red-600 hover:bg-red-400 font-bold text-white rounded-sm"
                                onClick={() => onUnfocus(task?.taskid)}
                            >
                                Unfocus &nbsp; <FontAwesomeIcon icon={faRectangleXmark} />
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
            )}
        </>
    )
}

export default FocusedTask;