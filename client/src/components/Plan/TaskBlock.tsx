import type {completeTask} from "../../interfaces/completeTask.ts";
import {type FC, useEffect, useState} from "react";
import TaskModal from "./TaskModal.tsx";
import {AnimatePresence} from "motion/react";

type TaskBlockProps = {
    task: completeTask
}

const TaskBlock: FC<TaskBlockProps> = ({ task }) => {

    const getHeightDuration = (start: string, end: string) => {
        const startTime = new Date(start)
        const endTime = new Date(end)
        console.log(`startTime = ${startTime} and endtime =${endTime}`)     //<===
        return Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    }

    const getStartPos = (start: string) => {
        const startTime = new Date(start)
        const startHour = startTime.getHours();
        const startMinute = startTime.getMinutes();
        return startHour * 60 + startMinute; // in pixels
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        console.log(isModalOpen)
    }, [isModalOpen]);

    return (
        <div
            key={task.taskid}
            className="absolute right-0 flex items-start w-5/6 p-2 bg-primary-400/60 shadow-sm"
            style={{
                top: `${getStartPos(task.startdatetime)}px`,
                height: `${getHeightDuration(task.startdatetime, task.enddatetime)}px`,
            }}
        >
            <h4
                className="text-sm truncate font-bold hover:underline cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                {task.tasktitle}
            </h4>
            <AnimatePresence>
                {isModalOpen && (
                    <TaskModal
                        task={task}
                        setIsModalOpen={setIsModalOpen}
                    />
                )
                }
            </AnimatePresence>
        </div>
    )
}

export default TaskBlock;