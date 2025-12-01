import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import TaskPreview from "../components/Dashboard/TaskPreview.tsx";
import FocusedTask from "../components/Dashboard/FocusedTask.tsx";
import type {completeTask} from "../types/completeTask.ts";
import {AnimatePresence, motion} from "motion/react";

type GetTaskTodoPrevsData = {
    todoTasks: completeTask[]
}

type GetTaskFocusedData = {
    focusedTask: completeTask
}

type GetChangeTaskFocusedData = {
    changeFocus: completeTask
}

const GET_TODO_TASKS = gql`
    query GetTodoTasks {
        todoTasks {
            tasktitle
            taskid
            taskdescription
            status {
                statusid
                statusname
            }
            startdatetime
            priority {
                priorityid
                priorityname
                colorcode
            }
            enddatetime
            category {
                categoryid
                categoryname
            }
        }
    }
`;

const GET_FOCUSED_TASK = gql`
    query GetFocusedTask {
        focusedTask {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priority {
                priorityid
                priorityname
                colorcode
            }
            category {
                categoryid
                categoryname
            }
            status {
                statusid
                statusname
            }
            isfocus
        }
    }
`;

const CHANGE_FOCUSED_TASK = gql`
    mutation ChangeFocus($taskid: UUID!){
        changeFocus(taskid: $taskid) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priority {
                priorityid
                priorityname
                colorcode
            }
            category {
                categoryid
                categoryname
            }
            status {
                statusid
                statusname
            }
            isfocus
        }
    }
`;


const Dashboard = () => {

    const {loading: todoLoading, data: todoData} = useQuery<GetTaskTodoPrevsData>(GET_TODO_TASKS);
    const {loading: focusedLoading, data: focusedTask} = useQuery<GetTaskFocusedData>(GET_FOCUSED_TASK);

    const [changeFocus] = useMutation<GetChangeTaskFocusedData>(CHANGE_FOCUSED_TASK, {
        update(cache, {data}) {
            if (!data?.changeFocus) return;

            const newFocus = data.changeFocus;

            const existing = cache.readQuery<GetTaskTodoPrevsData>({query: GET_TODO_TASKS})
            const focused = cache.readQuery<GetTaskFocusedData>({query: GET_FOCUSED_TASK})

            if (!existing || !focused) return;

            const prevFocus = focused.focusedTask;

            const newTodo = existing.todoTasks
                .filter((task) => task.taskid !== newFocus.taskid)
                .concat(prevFocus);

            cache.writeQuery<GetTaskTodoPrevsData>({
                query: GET_TODO_TASKS,
                data: {todoTasks: newTodo}
            })

            cache.writeQuery<GetTaskFocusedData>({
                query: GET_FOCUSED_TASK,
                data: {focusedTask: newFocus}
            })
        }
    });


    const onChangeFocusedTask = async (taskid: string) => {
        try {
            changeFocus({variables: {taskid: taskid}})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 py-5 h-full">
            {focusedLoading ? (
                <p>Loading...</p>
            ) : (
                focusedTask &&
                <motion.div
                    key={focusedTask.focusedTask.taskid}
                    className="relative flex flex-col items-center justify-center w-5/6 h-70 gap-y-5"
                    initial={{
                        opacity: 0,
                        y: 200,
                        scale: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            delay: 0.2,
                            type: "tween",
                            duration: 0.5
                        }
                    }}
                    exit={{
                        opacity: 0,
                        y: 200,
                        scale: 0,
                        transition: {
                            type: "tween",
                            duration: 0.2
                        }
                    }}
                >
                    <h2 className="font-bold text-xl text-start h-1/12 w-full">Focus on this 🔥</h2>
                    <div className="relative w-full h-11/12 bg-white rounded-lg overflow-hidden shadow-md">
                        <AnimatePresence>
                            <FocusedTask task={focusedTask.focusedTask}/>
                        </AnimatePresence>
                    </div>
                </motion.div>

            )}
            <div
                className="flex flex-col items-start justify-center w-5/6 rounded-lg mt-3 p-5 bg-white shadow-md">
                <h2 className="font-bold text-xl text-start h-1/12 w-full">To do</h2>

                {todoLoading ? (
                    <p>Loading...</p>
                ) : (
                    <AnimatePresence>
                        <div
                            className="flex flex-col items-center justify-start w-full max-h-35 border border-b-0 bg-secondary-100 r">
                            {todoData?.todoTasks.map((task) => (
                                <motion.div
                                    key={task.taskid}
                                    initial={{opacity: 0, x: -50}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -50}}
                                    whileHover={{
                                        scaleY: 1.02,
                                        scaleX: 1.02,
                                        borderBottom: 0,
                                        backgroundColor: "#c0faee",
                                        boxShadow: "8px"
                                    }}
                                    layout
                                    className="flex h-7 w-full border-b-1 bg-white"
                                >
                                    <TaskPreview
                                        task={task}
                                        onChangeFocusedTask={onChangeFocusedTask}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}

export default Dashboard;