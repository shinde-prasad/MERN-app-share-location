import React, { useState, useEffect } from "react";

function Clock() {
    const [clock, setClock] = useState(new Date().toLocaleTimeString())
    // useEffect hook to update the time every second
    useEffect(() => {

        //mounting phase and willmount()
        const interval = setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        }, 1000);

        //unmounting phase
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            Current Time is -
            {clock};
        </div>
    )
}

export default Clock;