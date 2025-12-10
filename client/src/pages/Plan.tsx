import {useEffect, useState} from "react";
import type {dateWeek} from "../interfaces/dateWeek.ts";
import CalendarWeek from "../components/Plan/CalendarWeek.tsx";
import AddTaskModal from "../components/Plan/AddTaskModal.tsx";
import {AnimatePresence} from "motion/react";
import {useQuery} from "@apollo/client/react";
import type {completeTask} from "../interfaces/completeTask.ts";
import {format} from 'date-fns';
import {GET_WEEKLY_TASKS} from "../hooks/queries/GetWeeklyTasks.ts";
import {dateOnlyFromDate} from "../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong, faPlus, faRightLong} from "@fortawesome/free-solid-svg-icons";

type getWeeklyTasksProps = {
    tasksByWeek: completeTask[]
}

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

    const {data, refetch} = useQuery<getWeeklyTasksProps>(GET_WEEKLY_TASKS, {
        variables: {
            start: week[0] ? format(week[0].date, 'MM/dd/yyyy') : '',
            end: week[6] ? format(week[6].date, 'MM/dd/yyyy') : ''
        },
        skip: week.length === 0,
        fetchPolicy: 'network-only',
    });

    const [isAddShowing, setIsAddShowing] = useState<boolean>(false)

    // const {addToast} = useToast()

    return (
        <div
            className="flex flex-col justify-center items-center w-full mx-auto bg-gray-200 pt-24 pb-5 px-10 ">
            <AnimatePresence>
                {isAddShowing && (
                    <AddTaskModal refetch={refetch} setIsAddShowing={setIsAddShowing}/>
                )}
            </AnimatePresence>

            <div className="w-full h-full bg-white p-2 rounded-md">
                <div className="flex items-end w-full h-1/12 text-start pb-3 gap-3">
                    <div className="flex justify-between w-full h-10">
                        <div className="flex items-center justify-start w-1/2 h-full gap-2">
                            <h2 className="text-2xl font-medium">Plan the week</h2>
                            {week.length > 0 &&
                                <h3 className="w-60 text-2xl">({dateOnlyFromDate(week[0].date)} - {dateOnlyFromDate(week[6].date)})</h3>
                            }
                        </div>
                        <div className="flex items-center justify-center h-full gap-2">
                            {/*/!* Toast test *!/*/}
                            {/*<button*/}
                            {/*    className="border-1"*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => addToast("您赢得积分", "Success", 5000)}*/}
                            {/*>*/}
                            {/*    Success*/}
                            {/*</button>*/}
                            {/*<button*/}
                            {/*    className="border-1"*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => addToast("你会死的", "失败", 5000)}*/}
                            {/*>*/}
                            {/*    Fail*/}
                            {/*</button>*/}
                            <button
                                className="h-full w-30 border-1 border-secondary-100 hover:bg-gray-100"
                                onClick={() => setIsAddShowing(true)}
                            >
                                <FontAwesomeIcon icon={faPlus}/> &nbsp; Add Task
                            </button>
                            <button
                                className="h-full w-10 border-1 border-secondary-100 hover:bg-gray-100"
                                onClick={onPreviousWeek}
                            >
                                <FontAwesomeIcon icon={faLeftLong}/>
                            </button>
                            <button
                                className="h-full w-10 border-1 border-secondary-100 hover:bg-gray-100"
                                onClick={onNextWeek}
                            >
                                <FontAwesomeIcon icon={faRightLong}/>
                            </button>
                        </div>
                    </div>
                </div>

                {data && week.length > 0 && (
                    <CalendarWeek
                        currDate={currDate}
                        week={week}
                        onNextWeek={onNextWeek}
                        onPreviousWeek={onPreviousWeek}
                        setIsAddShowing={setIsAddShowing}
                        direction={direction}
                        weeklyTasks={data?.tasksByWeek ?? []}
                    />
                )}
            </div>
        </div>
    )
}
export default Plan;
