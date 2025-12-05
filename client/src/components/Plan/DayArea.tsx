import type {completeTask} from "../../types/completeTask.ts";
import {type FC, useEffect} from "react";
import {timeOnly} from "../../functions/DateFormatters.ts";

type DayAreaProps = {
    tasks: completeTask[] | undefined;
}

const DayArea: FC<DayAreaProps> = ({ tasks }) => {

    const times: string[] = Array.from({ length: 23 }, (_, i) => {
        const hour = (i + 1) % 12 || 12;
        const suffix = i < 11 ? "AM" : "PM";
        return `${hour} ${suffix}`;
    });

    useEffect(() => {
        if(tasks)
            console.log(tasks)
    }, [tasks]);

    const getHeightDuration = (start: string, end: string ) => {
        const startTime = new Date(start)
        const endTime = new Date(end)
        console.log(`startTime = ${startTime} and endtime =${endTime}`)     //<===
        return Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    }

    const getStartPos = (start: string) => {
        const startTime = new Date(start)
        const startHour = startTime.getHours();
        const startMinute = startTime.getMinutes();
        return startHour * 60 + startMinute; // in pixels
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div className="relative flex flex-col justify-start w-full">
            { tasks &&
                tasks.map((task)=>{

                    return (
                        <div
                            key={task.taskid}
                            className="absolute w-full bg-blue-300 text-sm truncate text-white hover:z-50 p-2"
                            style={{
                                top: `${getStartPos(task.startdatetime)}px`,
                                left: 0,
                                height: `${getHeightDuration(task.startdatetime, task.enddatetime)}px`,
                                background: getRandomColor()
                            }}
                        >
                            {task.tasktitle}
                        </div>
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