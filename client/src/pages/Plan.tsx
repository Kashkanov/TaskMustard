import {dateOnlyFromDate} from "../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong, faRightLong} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import type {dateWeek} from "../types/dateWeek.ts";
import CalendarWeek from "../components/Plan/CalendarWeek.tsx";

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

    useEffect(() => {
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
        setWeek(newWeek);
    }, [currDate]);



    const onNextWeek = () => {
        setCurrDate(prev => {
            const next = new Date(currDate)
            next.setDate(prev.getDate() + 7)
            return next;
        });
    }

    const onPreviousWeek = () => {
        setCurrDate(prev => {
            const previous = new Date(currDate)
            previous.setDate(prev.getDate() - 7)
            return previous;
        });
    }

    return (
        <div
            className="relative flex flex-col justify-center items-center w-full mx-auto h-screen bg-gray-200 pt-24 pb-5 px-10">
            {currDate && week.length > 0 &&
                <div className="w-full h-full bg-white p-2 rounded-md">
                    <CalendarWeek
                        currDate={currDate}
                        week={week}
                        onNextWeek={onNextWeek}
                        onPreviousWeek={onPreviousWeek}
                    />
                </div>
            }
        </div>
    )
}
export default Plan;
