import {useEffect, useState} from "react";
import dayjs from "dayjs";

interface TimerResult {
    timeLeft: string | null;
    isDeadlineExpired: boolean;
}

const useTimer = (status: boolean, deadline: string | null): TimerResult => {
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [isDeadlineExpired, setIsDeadlineExpired] = useState<boolean>(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!status && deadline) {
                const deadlineDateFormated = dayjs(dayjs(deadline).format('YYYY-MM-DD'));
                const nowFormated = dayjs(dayjs().format('YYYY-MM-DD'));

                const isDeadlineToday = deadlineDateFormated.isSame(nowFormated);
                const isDeadlinePassed = nowFormated.isAfter(deadlineDateFormated);

                if (isDeadlineToday && !isDeadlinePassed) {
                    const now = dayjs();
                    const endOfToday = dayjs(now.endOf('day'));

                    const difference = Math.max(0, endOfToday.diff(now));
                    const hours = Math.floor(difference / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                    setIsDeadlineExpired(false);

                } else if (isDeadlinePassed) {
                    setTimeLeft("");
                    setIsDeadlineExpired(true);
                } else {
                    setTimeLeft("");
                    setIsDeadlineExpired(false);
                }

            } else {
                setTimeLeft("");
                setIsDeadlineExpired(false);
            }
        }

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);

    }, [deadline, status]);

    return {timeLeft, isDeadlineExpired};
};

export default useTimer;