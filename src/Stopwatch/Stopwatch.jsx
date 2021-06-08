import React, { useEffect, useState } from "react";

const StopWatch = ({ timePassed }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let hours = Math.floor(timePassed / 3600);
    setHours(() => (hours.toString().length === 1 ? "0" : "") + hours);

    let minutes = Math.floor((timePassed % 3600) / 60);
    setMinutes(() => (minutes.toString().length === 1 ? "0" : "") + minutes);

    let seconds = timePassed % 60;
    setSeconds(() => (seconds.toString().length === 1 ? "0" : "") + seconds);
  }, [timePassed]);

  return (
    <>
      <h2>
        {hours}:{minutes}:{seconds}
      </h2>
    </>
  );
};


export default StopWatch;