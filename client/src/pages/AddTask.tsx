import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Editor from "../components/Editor.tsx";
import {useForm} from "react-hook-form";
import type {taskType} from "../types/taskType.ts";
// import {createTask} from "../services/taskServices.ts";
import {gql} from "@apollo/client";
import {useMutation} from "@apollo/client/react";
import type {priorityType} from "../types/priorityType.ts";
import type {categoryType} from "../types/categoryType.ts";

const CREATE_TASK = gql`
    mutation CreateTask($tasktitle: String!, $taskdescription: String, $startdatetime: String!, $enddatetime: String,  $priorityid: Int!, $categoryid: Int!, $statusid: Int) {
        createTask(tasktitle: $tasktitle, taskdescription: $taskdescription, startdatetime: $startdatetime, enddatetime: $enddatetime, priorityid: $priorityid, categoryid: $categoryid, statusid: $statusid) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
        }
    }
`;

const GET_CATEGORIES = gql`{
    categories {
        categoryid,
        categoryname
    } 
}`;

const GET_PRIORITIES = gql`{
    priorities {
        priorityid,
        priorityname
    }
}`;

const AddTask = () => {

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<taskType>({
        mode: "all",
        defaultValues:{
            priorityID: 3,
            categoryID: 0
        }
    });
    const [createTask, { loading, error }] = useMutation(CREATE_TASK)

    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<priorityType[]>([]);
    const [category, setCategory] = useState<categoryType[]>([]);

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue("taskDescription", value);
        trigger("taskDescription");
    }

    const onSubmit = async (data: taskType) => {
        console.log(data);
        setValue("statusID", 1);        // set status to To-Do
        // const res = await createTask(data);
        // console.log(res);
        createTask({
            variables: {
                tasktitle: data.taskTitle,
                taskdescription: data.taskDescription,
                startdatetime: data.startDateTime,
                enddatetime: data.endDateTime,
                priorityid: parseInt(data.priorityID),
                categoryid: parseInt(data.categoryID),
                statusid: data.statusID
            } })
    }

    useEffect(() => {
        register("taskDescription", {
            validate: (value) =>
                value.replace(/<[^>]+>/g, "").trim().length > 0 ||
                "Required"
        });
    }, [description]);


    return (
        <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 py-8 bg-primary-100">
            <form
                className="flex flex-col items-center justify-center w-5/6 h-5/6 bg-secondary-100 p-5 rounded-lg gap-y-5 shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="flex justify-between items-center w-full text-start">
                    <span className="font-bold text-xl">Add Task</span>
                    <button
                        type="button"
                    >
                        <FontAwesomeIcon icon={faXmark} color="red"/>Cancel
                    </button>
                </div>

                <div className="flex flex-col justify-center text-start w-full h-[60px] gap-y-1">
                    <input
                        {...register("taskTitle", {required: "Required"})}
                        className="w-full h-2/3 bg-white border-1 rounded-sm"
                        type="text"
                    />
                    <label>
                        Title {errors.taskTitle && <span className="text-red-500 font-bold">{errors.taskTitle?.message}</span>}
                    </label>
                </div>

                <div className="flex justify-between text-start w-full h-[60px] gap-10">
                    <div className="flex flex-col w-1/2 h-full gap-y-1">
                        <input
                            {...register("startDateTime", {required: "Required"})}
                            className="w-full h-2/3 bg-white border-1 rounded-sm"
                            type="datetime-local"
                        />
                        <label>
                            Start Date Time {errors.startDateTime && <span className="text-red-500 font-bold">{errors.startDateTime?.message}</span>}
                        </label>
                    </div>
                    <div className="flex flex-col w-1/2 h-full gap-y-1">
                        <input
                            {...register("endDateTime", {required: "Required"})}
                            className="w-full h-2/3 bg-white border-1 rounded-sm"
                            type="datetime-local"
                        />
                        <label>
                            End Date Time {errors.endDateTime && <span className="text-red-500 font-bold">{errors.endDateTime?.message}</span>}
                        </label>
                    </div>
                </div>

                <div className="flex flex-col justify-center text-start w-full h-[200px] gap-y-1 my-5">
                    <label>
                        Description {errors.taskDescription && <span className="text-red-500 font-bold">{errors.taskDescription?.message}</span>}
                    </label>
                    <Editor
                        content={description}
                        handleContentChange={handleDescriptionChange}
                    />
                </div>

                <div className="flex justify-between text-start w-full h-[60px] gap-10">
                    <div className="flex flex-col w-1/2 h-full gap-y-1">
                        <select
                            {...register("categoryID", {required: "Required"})}
                            className="w-full h-2/3 bg-white border-1 rounded-sm"
                        >
                            <option className="text-gray-300" selected hidden value="">--Select Category--</option>
                            <option value={1}>General</option>
                            <option value={2}>Chores</option>
                            <option value={3}>Work</option>
                        </select>

                        <label>
                            Category {errors.categoryID && <span className="text-red-500 font-bold">{errors.categoryID?.message}</span>}
                        </label>
                    </div>
                    <div className="flex flex-col w-1/2 h-full gap-y-1">
                        <select
                            className="w-full h-2/3 bg-white border-1 rounded-sm"
                            {...register("priorityID", {required: "Required"})}
                        >
                            <option value={1}>Lowest</option>
                            <option value={2}>Low</option>
                            <option value={3}>Medium</option>
                            <option value={4}>High</option>
                            <option value={5}>Critical</option>
                        </select>

                        <label
                            htmlFor="priorityID"
                        >
                            Priority
                        </label>
                    </div>
                </div>

                <div className="flex justify-end w-full h-[40px] text-start gap-y-1">
                    <button
                        className="w-1/6 h-full bg-blue-700 p-1 text-white font-semibold rounded-md text-base"
                        type="submit"
                    >
                        Create
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddTask;