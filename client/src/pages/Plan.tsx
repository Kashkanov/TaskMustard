import {useEffect, useState} from "react";
import type {dateWeek} from "../types/dateWeek.ts";
import CalendarWeek from "../components/Plan/CalendarWeek.tsx";
import AddTaskModal from "../components/Plan/AddTaskModal.tsx";
import {AnimatePresence} from "motion/react";
import {gql} from "@apollo/client";
import {useQuery} from "@apollo/client/react";
import type {completeTask} from "../types/completeTask.ts";
import { format } from 'date-fns';

type getWeeklyTasksProps = {
    tasksByWeek: completeTask[]
}

const GET_WEEKLY_TASKS = gql`
    query TasksByWeek($start: String!, $end: String!) {
        tasksByWeek(start: $start, end: $end) {
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

const Plan = () => {

    const days: string[] = [
        'Sun',
        'Mon',
        'Tues',
        'Wed',
        'Thurs',
        'Fri',
        'Sat',
    ]

    const [currDate, setCurrDate] = useState<Date>(new Date());
    const [week, setWeek] = useState<dateWeek[]>([]);

    const constructWeekDates = () => {
        const newWeek: dateWeek[] = [];
        const base = new Date(currDate)

        for (let i = 0; i < 7; i++) {
            const d = new Date(base);
            d.setDate(base.getDate() - base.getDay() + i);

            newWeek.push({
                date: d,
                dayOfWeek: days[i]
            });
        }
        return newWeek;
    }

    useEffect(() => {
        const newWeek = constructWeekDates();
        setWeek(newWeek);
    }, [currDate]);

    const [direction, setDirection] = useState<number>(0)

    const onNextWeek = () => {
        setDirection(1)
        setCurrDate(prev => {
            const next = new Date(prev)
            next.setDate(prev.getDate() + 7)
            return next;
        });
    }

    const onPreviousWeek = () => {
        setDirection(-1)
        setCurrDate(prev => {
            const previous = new Date(prev)
            previous.setDate(prev.getDate() - 7)
            return previous;
        });
    }

    const {data} = useQuery<getWeeklyTasksProps>(GET_WEEKLY_TASKS,{
        variables: {
            start: week[0] ? format(week[0].date, 'MM/dd/yyyy') : '',
            end: week[6] ? format(week[6].date, 'MM/dd/yyyy') : ''
        },
        skip: week.length === 0,
        fetchPolicy: 'network-only',
    });

    const [isAddShowing, setIsAddShowing] = useState<boolean>(false)

    useEffect(() => {
        console.log("week changed");
    }, [week]);

    // useEffect(() => {
    //     refetch()
    // }, [week, refetch]);

    return (
        <div
            className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 pt-24 pb-5 px-10 ">
            <AnimatePresence>
                {isAddShowing && (
                    <AddTaskModal setIsAddShowing={setIsAddShowing}/>
                )}
            </AnimatePresence>
            {currDate && data && week.length > 0 &&
                <div className="w-full h-full bg-white p-2 rounded-md">
                    <CalendarWeek
                        currDate={currDate}
                        week={week}
                        onNextWeek={onNextWeek}
                        onPreviousWeek={onPreviousWeek}
                        setIsAddShowing={setIsAddShowing}
                        direction={direction}
                        weeklyTasks={data.tasksByWeek}
                    />
                </div>
            }
        </div>
    )
}
export default Plan;
