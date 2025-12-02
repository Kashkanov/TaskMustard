import type {completeTask} from "../../types/completeTask.ts";
import {type FC, /*useEffect*/} from "react";
import {AnimatePresence, motion} from "motion/react";
import {stagger, type Variants} from "motion";
import TaskPreview from "./TaskPreview.tsx";

type OngoingTasksAreaProps = {
    tasks: completeTask[] | undefined
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


    return (
        <AnimatePresence>
            <motion.div
                className="flex flex-col items-center justify-start w-full h-[130px] border-1 bg-secondary-100 overflow-y-auto overflow-x-hidden"
                variants={parentVars}
                initial="hidden"
                animate="visible"
            >

                {tasks?.map((task) => (
                    <motion.div
                        key={task.taskid}
                        variants={childrenVars}
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -50}}
                        // whileHover={{
                        //     borderBottom: 0,
                        //     backgroundColor: "#c0faee",
                        // }}
                        layout
                        className="flex h-[26px] w-full border-b-1 bg-white"
                    >
                        <TaskPreview
                            task={task}
                            onChangeFocusedTask={onChangeFocusedTask}
                        />
                    </motion.div>
                ))}

            </motion.div>
        </AnimatePresence>
    )
}

export default OngoingTasksArea;