import {type FC, useEffect, useRef} from "react";
import type {completeTask} from "../../interfaces/completeTask.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullseye, faXmark} from "@fortawesome/free-solid-svg-icons";
import {timeOnly} from "../../functions/DateFormatters.ts";
import {motion} from "motion/react";

type TaskModalProps = {
    task: completeTask,
    setIsModalOpen: (isModalOpen: boolean) => void,
}

const TaskModal: FC<TaskModalProps> = ({task, setIsModalOpen }) => {

    const descRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descRef.current && task) {
            descRef.current.innerHTML = task.taskdescription;
        }
    }, [task?.taskdescription]);

    return (
        <div className="flex justify-center items-center fixed inset-0 z-40 w-screen h-screen">
            <div className="absolute h-full w-full bg-black/75"></div>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut"
                }}
                exit={{opacity: 0, y: 100}}
                className="flex flex-col justify-start items-center w-2/3 h-2/3 bg-white z-50 rounded-lg overflow-hidden"
            >
                <div className="flex justify-between items-center w-full h-1/6 text-start p-5 bg-primary-300">
                    <h3 className="font-bold text-2xl truncate">{task.tasktitle}
                        {task.isfocus && (
                            <FontAwesomeIcon icon={faBullseye}/>
                        )
                        }
                    </h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} color="red"/>
                    </button>
                </div>
                <div className=" h-5/6 w-full px-5">
                    <div className="flex justify-between items-center w-full h-1/6 text-lg">
                        <div className="flex items-center">
                            <div className="w-5 h-5 border-1" style={{background: task.priority.colorcode}}/>
                            &nbsp;
                            {task.priority.priorityname}
                        </div>
                        <span>{task.category.categoryname}</span>
                        <span>{timeOnly(task.startdatetime)} - {timeOnly(task.enddatetime)}</span>
                    </div>
                    <div
                        ref={descRef}
                        className="w-full border-1 ql-editor overflow-y-auto"
                        style={{height: "75%"}}
                    >
                        {task.taskdescription}
                    </div>
                </div>

            </motion.div>


        </div>
    )
}

export default TaskModal;