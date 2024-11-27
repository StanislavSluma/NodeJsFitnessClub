import { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="datetime-container">
            <h1 className="date">{currentTime.toLocaleDateString()}</h1>
            <h2 className="time">{currentTime.toLocaleTimeString()}</h2>
            <p className="timezone">Time Zone: {timeZone}</p>
        </div>
    );
};

export default DateTimeDisplay;