import type {dateWeek} from "../../types/dateWeek.ts";
import {type FC} from "react";
import {dateOnlyFromDate} from "../../functions/DateFormatters.ts";
import {motion} from "motion/react";
import type {Variants} from "motion";
import DayArea from "./DayArea.tsx";
import type {completeTask} from "../../types/completeTask.ts";

type WeekAreaProps = {
    week: dateWeek[]
    direction: number;
    currDate: Date;
    weeklyTasks: Record<string, completeTask[]>;
}

const WeekArea: FC<WeekAreaProps> = ({week, direction, currDate, weeklyTasks}) => {

    const variants: Variants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            transition: {
                delay: 0.05,
                type: "tween",
                duration: 0.2
            }
        }),
        center: {
            x: 0
        },
        exit: (direction) => ({
            x: direction > 0 ? -500 : 500,
            transition: {
                delay: 0.05,
                type: "tween",
                duration: 0.2
            }
        })
    }

    return (
        <motion.div
            key={currDate.toDateString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-7 gap-0 w-full h-370 bg-white rounded-lg"
        >
            {week.map((day, index) => {

                const tasks = weeklyTasks[day.date.toLocaleDateString()];
                // const hasTasks = tasks?.length > 0;

                return (
                        <div
                            key={index}
                            className="flex flex-col justify-top items-center w-full h-full border-secondary-100 py-3"
                        >
                            <div
                                className="flex flex-col w-full h-1/18 justify-center items-center border-1 border-secondary-100">
                                <h4>{dateOnlyFromDate(day.date)}</h4>
                                <h3 className="text-lg font-medium">{day.dayOfWeek}</h3>
                            </div>
                            <DayArea tasks={tasks}/>
                        </div>
                    )
                }
            )}

        </motion.div>
    )
}

export default WeekArea;