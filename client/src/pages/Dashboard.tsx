import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import FocusedTask from "../components/Dashboard/FocusedTask.tsx";
import type {completeTask} from "../types/completeTask.ts";
import {AnimatePresence, motion} from "motion/react";
import {useEffect} from "react";
import {useLoading} from "../components/contexts/LoadingContext.tsx";
import OngoingTasksArea from "../components/Dashboard/OngoingTasksArea.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsToEye} from "@fortawesome/free-solid-svg-icons";

type GetOngoingTasksData = {
    ongoingTasks: completeTask[]
}

type GetTaskFocusedData = {
    focusedTask: completeTask | null
}

type GetChangeTaskFocusedData = {
    changeFocus: completeTask | null
}

type GetChangeTaskStatusData = {
    changeTaskStatus: completeTask
}

type GetUnfocusData = {
    unfocusTask: completeTask | null
}

const GET_ONGOING_TASKS = gql`
    query GetOngoingTasks {
        ongoingTasks {
            taskid
            tasktitle
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

const CHANGE_TASK_STATUS = gql`
    mutation ChangeTaskStatus($taskid: UUID!, $statusid: Int!){
        changeTaskStatus(taskid: $taskid, statusid: $statusid) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
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
    }`

const UNFOCUS_TASK = gql`
    mutation unfocus($taskid: UUID!) {
        unfocusTask(taskid: $taskid) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
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
`


const Dashboard = () => {

    const {loading: todoLoading, data: todoData} = useQuery<GetOngoingTasksData>(GET_ONGOING_TASKS);
    const {loading: focusedLoading, data: focusedTask} = useQuery<GetTaskFocusedData>(GET_FOCUSED_TASK);

    const {setLoading} = useLoading();

    // if focus is changed, remove prevFocus from focus, add it back to the to-do. Then, add new focus to the focus
    const [changeFocus] = useMutation<GetChangeTaskFocusedData>(CHANGE_FOCUSED_TASK, {
        update(cache, {data}) {
            if (!data?.changeFocus) return;

            const newFocus = data.changeFocus;

            const existing = cache.readQuery<GetOngoingTasksData>({query: GET_ONGOING_TASKS})
            const focused = cache.readQuery<GetTaskFocusedData>({query: GET_FOCUSED_TASK})

            // console.log(newFocus?.tasktitle)

            if (!existing) return;

            const prevFocus = focused?.focusedTask;

            let newTodo
            if (prevFocus) {
                newTodo = existing.ongoingTasks
                    .filter((task) => task.taskid !== newFocus.taskid)
                    .concat(prevFocus);
            } else {
                newTodo = existing.ongoingTasks
                    .filter((task) => task.taskid !== newFocus.taskid)
            }
            console.log(newTodo)
            cache.writeQuery<GetOngoingTasksData>({
                query: GET_ONGOING_TASKS,
                data: {ongoingTasks: newTodo}
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

    // if done with task remove task from focus
    const [changeStatus] = useMutation<GetChangeTaskStatusData>(CHANGE_TASK_STATUS, {
        update(cache, {data}) {
            if (!data?.changeTaskStatus) return;

            cache.writeQuery<GetTaskFocusedData>({
                query: GET_FOCUSED_TASK,
                data: {focusedTask: null}
            })
        }
    })

    const onChangeStatus = async (taskid: string, statusid: number) => {
        try {
            changeStatus({variables: {taskid: taskid, statusid: statusid}})
        } catch (error) {
            console.log(error);
        }
    }

    //  if focus is removed, remove prevFocus from focus, add it back to the to-do.
    const [unfocus] = useMutation<GetUnfocusData>(UNFOCUS_TASK, {
        update(cache, {data}) {
            if (!data?.unfocusTask) return

            const removedFocus = data?.unfocusTask
            const existing = cache.readQuery<GetOngoingTasksData>({query: GET_ONGOING_TASKS})

            if (!existing) return;

            console.log(removedFocus)

            cache.writeQuery<GetTaskFocusedData>({
                query: GET_FOCUSED_TASK,
                data: {focusedTask: null}
            })

            if (removedFocus) {
                const newTodo = existing.ongoingTasks.concat(removedFocus)

                console.log(newTodo)

                cache.writeQuery<GetOngoingTasksData>({
                    query: GET_ONGOING_TASKS,
                    data: {ongoingTasks: newTodo}
                })
            }
        }
    })

    const onUnfocus = (taskid: string) => {
        console.log(taskid)
        try {
            unfocus({variables: {taskid: taskid}})
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (focusedLoading || todoLoading)
            setLoading(true)
        else
            setLoading(false)
    }, [focusedLoading, todoLoading]);

    return (
        <div className="flex flex-col justify-between items-center w-full mx-auto bg-gray-200 pt-24 pb-5 h-full">
            {focusedTask &&
                <div className="flex flex-col items-center justify-center w-5/6 h-80 gap-y-5">
                    <motion.h2
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay: 0.5}}
                        className="font-medium text-xl text-start h-1/12 w-full"
                    >
                        Focus on this 🔥
                    </motion.h2>
                    {/*focus area*/}
                    <motion.div
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.5,
                            type: "tween",
                            ease: "easeOut",
                        }}
                        className="w-full h-11/12 bg-white rounded-lg overflow-hidden shadow-md"
                    >
                        <AnimatePresence>
                            {focusedTask?.focusedTask ? (
                                <FocusedTask
                                    key={focusedTask?.focusedTask.taskid}
                                    task={focusedTask.focusedTask}
                                    onChangeStatus={onChangeStatus}
                                    onUnfocus={onUnfocus}
                                />
                            ) : (
                                <div className="relative flex flex-col justify-center items-center w-full h-full">
                                    <img
                                        className="absolute top-0 left-0 transform w-full h-full object-cover opacity-25"
                                        src="/assets/nofocus.png"
                                        alt="nofocus"
                                    />
                                    <motion.h1
                                        className="z-20 underline text-black decoration-red-600 p-3 font-medium "
                                        animate={{
                                            opacity: 1,
                                            scale: [1, 1, 1, 1.1, 1, 1.1, 1, 1, 1]
                                        }}
                                        transition={{
                                            repeat: Infinity
                                        }}
                                    >
                                        No Focused Task!
                                    </motion.h1>
                                    <p className="w-1/2 text-lg text-green-600">
                                        Click  the <FontAwesomeIcon icon={faArrowsToEye} /> on any of the ongoing tasks below and GET STUFF DONE TODAY
                                    </p>
                                </div>
                            )
                            }
                        </AnimatePresence>
                    </motion.div>
                </div>
            }
            <div
                className="flex flex-col items-start justify-center w-5/6 rounded-lg mt-3 p-5 bg-white shadow-md">
                <h2 className="font-medium text-xl text-start h-1/12 w-full">To do</h2>
                {todoData?.ongoingTasks &&
                    <OngoingTasksArea
                        tasks={todoData?.ongoingTasks}
                        onChangeFocusedTask={onChangeFocusedTask}
                    />
                }
            </div>
        </div>
    )
}

export default Dashboard;