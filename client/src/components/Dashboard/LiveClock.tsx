import {useEffect, useRef, useState} from "react";

const LiveClock = () => {

    const [now, setNow] = useState<Date>(()=> new Date());
    const intervalRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const tick = () => setNow(new Date());

        const msToNextSecond = 1000 - (Date.now() % 1000);

        timeoutRef.current = setTimeout(() => {
            tick()
            intervalRef.current = setInterval(tick, 1000)

        }, msToNextSecond)

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            if (intervalRef.current) clearTimeout(intervalRef.current)
        };
    },[])

    const timeString = now.toLocaleTimeString('en-PH', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <span>{timeString}</span>
    )
}

export default LiveClock;