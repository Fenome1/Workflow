import {useEffect, useState} from "react";

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
                const deadlineDate = new Date(deadline);
                const now = new Date();

                const isDeadlineToday = deadlineDate.toDateString() === now.toDateString();
                const isDeadlinePassed = now > deadlineDate;

                if (isDeadlineToday && !isDeadlinePassed) {
                    const endOfToday = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                        23,
                        59,
                        59);

                    const difference = Math.max(0, endOfToday.getTime() - now.getTime());
                    const hours = Math.floor(difference / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                    setIsDeadlineExpired(false);
                } else if (!isDeadlineToday && !isDeadlinePassed) {
                    setTimeLeft("")
                    setIsDeadlineExpired(false)
                } else if (!isDeadlineToday && isDeadlinePassed) {
                    setTimeLeft("");
                    setIsDeadlineExpired(true);
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