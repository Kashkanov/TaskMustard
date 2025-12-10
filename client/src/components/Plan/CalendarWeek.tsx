import type {dateWeek} from "../../interfaces/dateWeek.ts";
import {type FC, useEffect, useMemo} from "react";
import {dateOnlyFromDate} from "../../functions/DateFormatters.ts";
import {AnimatePresence, motion} from "motion/react";
import type {completeTask} from "../../interfaces/completeTask.ts";
import DayArea from "./DayArea.tsx";
import type {Variants} from "motion";

type CalendarWeekProps = {
    currDate: Date,
    week: dateWeek[],
    onNextWeek: () => void,
    onPreviousWeek: () => void,
    setIsAddShowing: (isAddShowing: boolean) => void,
    direction: number,
    weeklyTasks: completeTask[]
}

const CalendarWeek: FC<CalendarWeekProps> = ({
                                                 week,
                                                 direction,
                                                 weeklyTasks
                                             }) => {

    // this function groups all tasks by date by saving them into a Record with a structure:
    // '202X-XX-XX' : { [ task1, task2, etc. }
    const tasksByDate = useMemo(() => {

        return weeklyTasks.reduce((acc, task) => {
            const startDate = new Date(task.startdatetime).toLocaleDateString()
            const endDate = new Date(task.enddatetime).toLocaleDateString()

            if (!acc[startDate])
                acc[startDate] = [];

            acc[startDate].push(task)

            //TODO: also add scenario if task spans more than two days. Will it take up the whole day between?

            // if the task spans two days
            if (startDate !== endDate) {
                if (!acc[endDate])
                    acc[endDate] = [];
                acc[endDate].push(task)
            }
            return acc;
        }, {} as Record<string, completeTask[]>)
    }, [weeklyTasks])

    // useEffect(() => {
    //     if (tasksByDate)
    //         console.log(tasksByDate)
    // }, [tasksByDate]);

    useEffect(() => {
        console.log(week[0]?.date.toISOString())
    }, [week[0]?.date]);

    const variants: Variants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 0.2
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? -500 : 500,
            transition: {
                type: "tween",
                duration: 0.5
            }
        })
    }

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={week[0]?.date.toISOString()}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-7 gap-0 w-full h-370 bg-white rounded-lg"
            >
                {week.map((day, index) => {

                        const tasks = tasksByDate[day.date.toLocaleDateString()];
                        // const hasTasks = tasks?.length > 0;1

                        return (
                            <div
                                key={index}
                                className="flex flex-col justify-top items-center w-full h-full border-secondary-100 py-3"
                            >
                                <div
                                    className="flex flex-col w-full h-1/18 justify-center items-center border-1 border-secondary-100 bg-primary-500">
                                    <h4 className="text-white">{dateOnlyFromDate(day.date)}</h4>
                                    <h3 className="text-lg font-medium text-white">{day.dayOfWeek}</h3>
                                </div>
                                <DayArea tasks={tasks}/>
                            </div>
                        )
                    }
                )}

            </motion.div>
        </AnimatePresence>
    )
}

export default CalendarWeek;