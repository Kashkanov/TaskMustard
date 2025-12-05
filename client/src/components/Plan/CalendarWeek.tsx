import type {dateWeek} from "../../types/dateWeek.ts";
import {type FC, useMemo} from "react";
import {dateOnlyFromDate} from "../../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong, faPlus, faRightLong} from "@fortawesome/free-solid-svg-icons";
import WeekArea from "./WeekArea.tsx";
import {AnimatePresence} from "motion/react";
import type {completeTask} from "../../types/completeTask.ts";

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
                                                 currDate,
                                                 week,
                                                 onNextWeek,
                                                 onPreviousWeek,
                                                 setIsAddShowing,
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

    return (
        <>
            <div className="flex items-end w-full h-1/12 text-start pb-3 gap-3">
                <h2 className="text-2xl font-medium">Plan the week</h2>
                <h3 className="w-45 text-xl">({dateOnlyFromDate(week[0].date)} - {dateOnlyFromDate(week[6].date)})</h3>
                <div className="flex items-center justify-center h-full">
                    <button
                        className="h-full w-10 bg-primary-300 border-1 border-secondary-100"
                        onClick={onPreviousWeek}
                    >
                        <FontAwesomeIcon icon={faLeftLong}/>
                    </button>
                    <button
                        className="h-full w-10 bg-primary-300 border-1 border-secondary-100"
                        onClick={onNextWeek}
                    >
                        <FontAwesomeIcon icon={faRightLong}/>
                    </button>
                </div>
                <div className="flex items-center justify-center w-30 h-full">
                    <button
                        className="h-full w-full bg-primary-400 border-1 border-secondary-100 text-white"
                        onClick={() => setIsAddShowing(true)}
                    >
                        <FontAwesomeIcon icon={faPlus}/> &nbsp; Add Task
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {week &&
                    <WeekArea
                        week={week}
                        direction={direction}
                        currDate={currDate}
                        weeklyTasks={tasksByDate}
                    />
                }
            </AnimatePresence>
        </>
    )
}

export default CalendarWeek;