import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import FocusedTask from "../components/Dashboard/FocusedTask.tsx";
import type {completeTask} from "../types/completeTask.ts";
import {AnimatePresence} from "motion/react";
import {useEffect} from "react";
import {useLoading} from "../components/contexts/LoadingContext.tsx";
import OngoingTasksArea from "../components/Dashboard/OngoingTasksArea.tsx";

type GetTaskTodoPrevsData = {
    todoTasks: completeTask[]
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

const GET_TODO_TASKS = gql`
    query GetTodoTasks {
        todoTasks {
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

    const {loading: todoLoading, data: todoData} = useQuery<GetTaskTodoPrevsData>(GET_TODO_TASKS);
    const {loading: focusedLoading, data: focusedTask} = useQuery<GetTaskFocusedData>(GET_FOCUSED_TASK);

    const {setLoading} = useLoading();

    // if focus is changed, remove prevFocus from focus, add it back to the to-do. Then, add new focus to the focus
    const [changeFocus] = useMutation<GetChangeTaskFocusedData>(CHANGE_FOCUSED_TASK, {
        update(cache, {data}) {
            if (!data?.changeFocus) return;

            const newFocus = data.changeFocus;

            const existing = cache.readQuery<GetTaskTodoPrevsData>({query: GET_TODO_TASKS})
            const focused = cache.readQuery<GetTaskFocusedData>({query: GET_FOCUSED_TASK})

            console.log(newFocus?.tasktitle)

            if (!existing) return;

            const prevFocus = focused?.focusedTask;

            let newTodo
            if (prevFocus) {
                newTodo = existing.todoTasks
                    .filter((task) => task.taskid !== newFocus.taskid)
                    .concat(prevFocus);
            } else {
                newTodo = existing.todoTasks
                    .filter((task) => task.taskid !== newFocus.taskid)
            }

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
            if(!data?.unfocusTask) return

            const removedFocus = data?.unfocusTask
            const existing = cache.readQuery<GetTaskTodoPrevsData>({query: GET_TODO_TASKS})

            if (!existing) return;

            console.log(removedFocus)

            cache.writeQuery<GetTaskFocusedData>({
                query: GET_FOCUSED_TASK,
                data: {focusedTask: null}
            })

            if (removedFocus) {
                const newTodo = existing.todoTasks.concat(removedFocus)

                console.log(newTodo)

                cache.writeQuery<GetTaskTodoPrevsData>({
                    query: GET_TODO_TASKS,
                    data: {todoTasks: newTodo}
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
        <div className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 py-5 h-full">
            {focusedTask &&
                <div className="flex flex-col items-center justify-center w-5/6 h-80 gap-y-5">
                    <h2 className="font-bold text-xl text-start h-1/12 w-full">Focus on this 🔥</h2>
                    <div className="w-full h-11/12 bg-white rounded-lg overflow-hidden shadow-md">
                        <AnimatePresence>
                            <FocusedTask
                                task={focusedTask.focusedTask}
                                onChangeStatus={onChangeStatus}
                                onUnfocus={onUnfocus}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            }
            <div
                className="flex flex-col items-start justify-center w-5/6 rounded-lg mt-3 p-5 bg-white shadow-md">
                <h2 className="font-bold text-xl text-start h-1/12 w-full">To do</h2>
                {todoData?.todoTasks &&
                    <OngoingTasksArea
                        tasks={todoData?.todoTasks}
                        onChangeFocusedTask={onChangeFocusedTask}
                    />
                }
            </div>
        </div>
    )
}

export default Dashboard;