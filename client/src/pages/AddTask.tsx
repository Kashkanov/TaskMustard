import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Editor from "../components/Editor.tsx";
import {useForm} from "react-hook-form";
import type {taskType} from "../types/taskType.ts";
import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import type {priorityType} from "../types/priorityType.ts";
import type {categoryType} from "../types/categoryType.ts";
import {useNavigate} from "react-router-dom";

type GetPrioritiesData = {
    priorities: priorityType[];
};

type GetCategoriesData = {
    categories: categoryType[];
};

const CREATE_TASK = gql`
    mutation CreateTask($tasktitle: String!, $taskdescription: String, $startdatetime: String!, $enddatetime: String,  $priorityid: Int!, $categoryid: Int!, $statusid: Int, $isfocus: Boolean!) {
        createTask(tasktitle: $tasktitle, taskdescription: $taskdescription, startdatetime: $startdatetime, enddatetime: $enddatetime, priorityid: $priorityid, categoryid: $categoryid, statusid: $statusid, isfocus: $isfocus) {
            taskid
            tasktitle
            taskdescription
            startdatetime
            enddatetime
            priorityid
            categoryid
            statusid
            isfocus
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

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: {errors},
    } = useForm<taskType>({
        mode: "all",
        defaultValues: {
            taskTitle: "",
            taskDescription: "",
            startDateTime: "",
            endDateTime: null,
            priorityID: 3,
            categoryID: 0
        }
    });
    const [createTask] = useMutation(CREATE_TASK);
    const {loading: categLoading, data: categData} = useQuery<GetCategoriesData>(GET_CATEGORIES);
    const {loading: prioLoading, data: prioData} = useQuery<GetPrioritiesData>(GET_PRIORITIES);

    const [description, setDescription] = useState<string>("");

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue("taskDescription", value);
        trigger("taskDescription");
    }

    const onSubmit = async (data: taskType) => {
        console.log(data);
        try {
            const res = await createTask({
                variables: {
                    tasktitle: data.taskTitle,
                    taskdescription: data.taskDescription,
                    startdatetime: data.startDateTime,
                    enddatetime: data.endDateTime,
                    priorityid: parseInt(data.priorityID.toString()),
                    categoryid: parseInt(data.categoryID.toString()),
                    statusid: 1,
                    isfocus: false
                }
            })
            if(res)
                navigate("/tasks");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 pt-24 pb-5 h-full">
            {categLoading || prioLoading ? (
                <p>Loading...</p>
            ) : (
                <form
                    className="flex flex-col items-center justify-center w-2/3 h-4/6 bg-secondary-white rounded-lg gap-y-2 shadow-lg bg-white p-4"
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
                            className="w-full h-2/3 bg-white border-1 border-secondary-100 rounded-sm"
                            type="text"
                        />
                        <label>
                            Title {errors.taskTitle &&
                            <span className="text-red-500 font-bold">{errors.taskTitle?.message}</span>}
                        </label>
                    </div>

                    <div className="flex justify-between text-start w-full h-[60px] gap-10">
                        <div className="flex flex-col w-1/2 h-full gap-y-1">
                            <input
                                {...register("startDateTime", {required: "Required"})}
                                className="w-full h-2/3 bg-white border-1 border-secondary-100 rounded-sm"
                                type="datetime-local"
                            />
                            <label>
                                Start Date Time {errors.startDateTime &&
                                <span className="text-red-500 font-bold">{errors.startDateTime?.message}</span>}
                            </label>
                        </div>
                        <div className="flex flex-col w-1/2 h-full gap-y-1">
                            <input
                                {...register("endDateTime")}
                                className="w-full h-2/3 bg-white border-1 border-secondary-100 rounded-sm"
                                type="datetime-local"
                            />
                            <label>
                                End Date Time {errors.endDateTime &&
                                <span className="text-red-500 font-bold">{errors.endDateTime?.message}</span>}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-start w-full h-[200px] gap-y-1 my-5">
                        <label>
                            Description {errors.taskDescription &&
                            <span className="text-red-500 font-bold">{errors.taskDescription?.message}</span>}
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
                                className="w-full h-2/3 bg-white border-1 border-secondary-100 rounded-sm"
                            >
                                <option className="text-gray-300" selected hidden value={0}>--Select Category--</option>
                                {categData?.categories.map(category => (
                                    <option
                                        key={category.categoryid}
                                        value={category.categoryid}
                                    >
                                        {category.categoryname}
                                    </option>
                                ))

                                }
                            </select>

                            <label>
                                Category {errors.categoryID &&
                                <span className="text-red-500 font-bold">{errors.categoryID?.message}</span>}
                            </label>
                        </div>
                        <div className="flex flex-col w-1/2 h-full gap-y-1">
                            <select
                                className="w-full h-2/3 bg-white border-1 border-secondary-100 rounded-sm"
                                {...register("priorityID", {required: "Required"})}
                            >
                                {prioData?.priorities.map((priority) => (
                                    <option
                                        key={priority.priorityid}
                                        value={priority.priorityid}
                                    >
                                        {priority.priorityname}
                                    </option>
                                ))
                                }
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
            )}
        </div>
    )
}

export default AddTask;