import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsToEye, faGripVertical} from "@fortawesome/free-solid-svg-icons";
import {dateDiff} from "../../functions/DateFormatters.ts";
import type {completeTask} from "../../types/completeTask.ts";
import {motion, Reorder, useDragControls} from "motion/react";
import type {Variants} from "motion";

type TaskPreviewProps = {
    task: completeTask
    onChangeFocusedTask: (taskid: string) => void
    childrenVars: Variants
};

const TaskPreview: FC<TaskPreviewProps> = ({ task, onChangeFocusedTask, childrenVars }) => {

    const dragControls = useDragControls();

    return (
        <Reorder.Item
            className="flex h-[32.5px] w-full border-b-1 border-secondary-100 bg-white"
            value={task}
            dragListener={false}
            dragControls={dragControls}
            key={task.taskid}
            id={task.taskid}
            variants={childrenVars}
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            layout
        >
            <div className="flex items-center justify-start w-3/8 h-full truncate px-5">
                {task.tasktitle}
            </div>
            <div className="flex flex-col items-center justify-center w-1/8 h-full">
                <motion.button
                    title="Focus on this task"
                    whileHover={{color: "#00ff55"}}
                    onClick={() => onChangeFocusedTask(task.taskid)}
                >
                    <FontAwesomeIcon icon={faArrowsToEye} />
                </motion.button>
            </div>
            <div className="flex items-center text-start w-1/8 h-full">
                {task.category.categoryname}
            </div>
            <div className="flex items-center text-start w-1/8 h-full">
                <div
                    className="w-3 h-3"
                    style={{background: task.priority.colorcode}}
                />
                &nbsp;
                {task.priority.priorityname}
            </div>
            <div className="flex items-center text-end w-2/8 h-full px-5 text-red-600">
                <span>{dateDiff(task.startdatetime, task.enddatetime)} remaining</span>
            </div>
            <button
                className="h-full flex items-center"
                onPointerDown={(event)=> dragControls.start(event)}
            >
                <FontAwesomeIcon icon={faGripVertical}/>
            </button>

        </Reorder.Item>
    )
}

export default TaskPreview;