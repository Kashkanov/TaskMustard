import type {dateWeek} from "../../types/dateWeek.ts";
import type {FC} from "react";
import {dateOnlyFromDate} from "../../functions/DateFormatters.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong, faRightLong} from "@fortawesome/free-solid-svg-icons";

type CalendarWeekProps = {
    currDate: Date,
    week: dateWeek[],
    onNextWeek: () => void,
    onPreviousWeek: () => void,
}

const CalendarWeek: FC<CalendarWeekProps> = ({ currDate, week, onNextWeek, onPreviousWeek }) => {
    return (
        <>
            <div className="flex items-end w-full h-1/12 text-start pb-3 gap-3">
                <h2 className="text-2xl font-medium">Plan the week</h2>
                <h3 className="w-50 text-xl">({dateOnlyFromDate(week[0].date)} - {dateOnlyFromDate(week[6].date)})</h3>
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
            </div>
            <div className="grid grid-cols-7 gap-0 w-full h-11/12 bg-white rounded-lg">
                {week.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-top items-center w-full h-full border-1 border-secondary-100 py-3"
                    >
                        <h4>{dateOnlyFromDate(day.date)}</h4>
                        <h3 className="text-lg font-medium">{day.dayOfWeek}</h3>
                    </div>
                ))
                }

            </div>
        </>
    )
}

export default CalendarWeek;