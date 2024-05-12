import {useEffect, useState} from "react";

interface TimerStyle {
    color: string;
    backgroundColor: string;
}

interface TimerResult {
    timeLeft: string;
    style: TimerStyle;
}

const useTimer = (status: boolean, deadline: string | null): TimerResult => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [style, setStyle] = useState<TimerStyle>({
        color: '',
        backgroundColor: ''
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!status && deadline) {
                const deadlineDate = new Date(deadline);
                const currentDate = new Date();
                const difference = deadlineDate.getTime() - currentDate.getTime();

                if (difference > 0 && difference <= 24 * 60 * 60 * 1000) {
                    const hours = String(Math.floor(difference / (1000 * 60 * 60))).padStart(2, '0');
                    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
                    setTimeLeft(`Осталось: ${hours}:${minutes}:${seconds}`);
                    setStyle({
                        color: 'white',
                        backgroundColor: ''
                    });
                } else {
                    setTimeLeft('');
                    setStyle({
                        color: '',
                        backgroundColor: 'red'
                    });
                }
            } else {
                setTimeLeft('');
                setStyle({
                    color: '',
                    backgroundColor: ''
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [status, deadline]);

    return {timeLeft, style};
};

export default useTimer;
