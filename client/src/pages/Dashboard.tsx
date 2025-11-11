import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import type {taskPrevType} from "../types/taskPrevType.ts";
import TaskPreview from "../components/Dashboard/TaskPreview.tsx";
import {useEffect} from "react";

type GetTaskTodoPrevsData = {
    todoTasks: taskPrevType[]
}

type GetTaskOngoingPrevsData = {
    ongoingTasks: taskPrevType[]
}

const GET_TODO_TASKS = gql`{
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
        }
        enddatetime
        category {
            categoryid
            categoryname
        }
    }
}`;

const GET_ONGOING_TASKS = gql`{
    ongoingTasks {
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
        }
        enddatetime
        category {
            categoryid
            categoryname
        }
    }
}`;

const CHANGE_TASK_STATUS = gql`
    mutation ChangeTaskStatus($taskid: UUID!, $statusid: Int!) {
        changeTaskStatus(taskid: $taskid, statusid: $statusid) {
            taskid
            statusid
        }
    }
`;

const Dashboard = () => {

    const { loading: todoLoading, data: todoData } = useQuery<GetTaskTodoPrevsData>(GET_TODO_TASKS);
    const { loading: ongoingLoading, data: ongoingData } = useQuery<GetTaskOngoingPrevsData>(GET_ONGOING_TASKS);
    const [changeTaskStatus] = useMutation(CHANGE_TASK_STATUS);

    const onChangeStatus = (taskid: string, statusid: number) => {
        changeTaskStatus({
            variables: {
                taskid: taskid,
                statusid: statusid
            }
        })
    }

    useEffect(() => {
        console.log(todoData)
    }, [todoData]);

    return (
        <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 py-8 bg-primary-100">
            <div className="flex flex-col items-start justify-center w-5/6 p-5 rounded-lg gap-y-5">
                <h2 className="font-bold text-xl text-start h-1/12 w-full">Ongoing</h2>

                { ongoingLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-11/12 overflow-y-auto gap-y-5">
                        {ongoingData?.ongoingTasks.map((task)=>(
                            <TaskPreview
                                key={task.taskid}
                                task={task}
                                onChangeStatus={onChangeStatus}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start justify-center w-5/6 p-5 rounded-lg gap-y-5">
                <h2 className="font-bold text-xl text-start h-1/12 w-full">To do</h2>

                    { todoLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-11/12 overflow-y-auto gap-y-5">
                            {todoData?.todoTasks.map((task)=>(
                                <TaskPreview
                                    key={task.taskid}
                                    task={task}
                                    onChangeStatus={onChangeStatus}
                                />
                            ))}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Dashboard;