import {type FC, useEffect, useRef} from "react";
import type {completeTask} from "../../interfaces/completeTask.ts";
import {dateDiff} from "../../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExpand} from "@fortawesome/free-solid-svg-icons";
import {motion} from "motion/react";

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

        <motion.div
            key={task?.taskid}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                duration: 0.2,
                ease: "easeOut"
            }}
            className="flex flex-col items-center justify-start w-full h-full bg-white rounded-lg p-5"
        >
            <div className="flex justify-between items-center w-full h-2/6">
                <div className="text-start font-semibold w-3/8">
                    <motion.div
                        initial={{width: 0}}
                        animate={{width: 'auto'}}
                        transition={{
                            delay: 0.5,
                            duration: 0.2,
                        }}
                        className="text-2xl truncate bg-black text-secondary-300 "
                    >
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: 0.7,
                                duration: 0.2
                            }}
                        >
                            {task?.tasktitle}
                        </motion.span>
                    </motion.div>
                </div>
                <div className="w-1/8 text-lg truncate">
                    <span>{task?.category.categoryname}</span>
                </div>
                <div className="flex items-center w-1/8 text-lg truncate">
                    <div
                        className="w-5 h-5 border-black"
                        style={{background: task?.priority.colorcode}}
                    />
                    &nbsp;
                    <span>{task?.priority.priorityname}</span>
                </div>
                {task && (
                    <>
                        <span className="w-2/8 text-start text-lg truncate font-bold text-red-600">
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
                                className="h-full w-full bg-white hover:bg-gray-400 hover:text-white rounded-sm border-1"
                                onClick={() => onUnfocus(task?.taskid)}
                            >
                                Unfocus &nbsp; <FontAwesomeIcon icon={faExpand}/>
                            </button>

                        </div>
                    </>
                )}
            </div>
            <div
                className="w-full h-5/6 ql-editor border-1 border-secondary-100"
                ref={descRef}
            >
                {task?.taskdescription}
            </div>
        </motion.div>

    )
}

export default FocusedTask;