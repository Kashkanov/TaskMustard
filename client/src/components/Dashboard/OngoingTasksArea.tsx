import type {completeTask} from "../../types/completeTask.ts";
import {type FC, useEffect, useState, /*useEffect*/} from "react";
import {AnimatePresence, Reorder} from "motion/react";
import {stagger, type Variants} from "motion";
import TaskPreview from "./TaskPreview.tsx";

type OngoingTasksAreaProps = {
    tasks: completeTask[]
    onChangeFocusedTask: (taskid: string) => void
}

const OngoingTasksArea: FC<OngoingTasksAreaProps> = ({tasks, onChangeFocusedTask}) => {

    const parentVars: Variants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 2,
                delayChildren: stagger(0.2),
            }
        },
    }

    const childrenVars: Variants = {
        hidden: {opacity: 0, x: -50},
        visible: {opacity: 1, x: 0},
    }

    const [ongoingTasks, setOngoingTasks] = useState<completeTask[]>(tasks)

    useEffect(() => {
        setOngoingTasks(tasks
        )
    }, [tasks]);

    return (
            <Reorder.Group
                variants={parentVars}
                initial="hidden"
                animate="visible"
                axis="y"
                onReorder={setOngoingTasks}
                values={ongoingTasks}
                className="flex flex-col items-center justify-start w-full h-[130px] border-1 border-secondary-100 bg-secondary-100 overflow-y-auto overflow-x-hidden"
            >
                <AnimatePresence>
                {ongoingTasks?.map((task) => (

                        <TaskPreview
                            key={task.taskid}
                            task={task}
                            onChangeFocusedTask={onChangeFocusedTask}
                            childrenVars={childrenVars}
                        />

                ))}
                </AnimatePresence>
            </Reorder.Group>
    )
}

export default OngoingTasksArea;