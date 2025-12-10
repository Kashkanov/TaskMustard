import type {completeTask} from "../../interfaces/completeTask.ts";
import {type FC} from "react";
import TaskBlock from "./TaskBlock.tsx";

type DayAreaProps = {
    tasks: completeTask[] | undefined;
}

const DayArea: FC<DayAreaProps> = ({ tasks }) => {

    const times: string[] = Array.from({ length: 23 }, (_, i) => {
        const hour = (i + 1) % 12 || 12;
        const suffix = i < 11 ? "AM" : "PM";
        return `${hour} ${suffix}`;
    });

    // useEffect(() => {
    //     if(tasks)
    //         console.log(tasks)
    // }, [tasks]);


    return (
        <div className="relative w-full">
            { tasks &&
                tasks.map((task)=>{

                    return (
                        <TaskBlock
                            key={task.taskid}
                            task={task}
                        />
                    )
                })
            }
            {times.map((time)=>(
                <div
                    key={time}
                    className="flex w-full h-[60px] border-b-1 border-secondary-100 items-end text-start text-xs text-secondary-100"
                >
                    {time}
                </div>
            ))}

        </div>
    )
}

export default DayArea;