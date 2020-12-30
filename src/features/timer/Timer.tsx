import React, { useEffect, useState } from "react";
import { Temporal } from "proposal-temporal";
import { StartStop } from "./types";
import spinner from "./spinner.svg";

function sum(timestamps: number[]) {
  return timestamps.reduce((a, s) => a + s, 0);
}
function timeDifference(t: StartStop) {
  return t.end - t.start;
}
function now() {
  return Temporal.now.instant().epochSeconds;
}

const SECONDS_IN_MINS = 60;
const MINS_IN_HOURS = 60;

function Timer({ uuid }: { uuid: string }) {
  const [started, toggleStarted] = useState(false);
  const [timestamps, setTimestamps] = useState<StartStop[]>([]);

  function seconds() {
    return sum(timestamps.map(timeDifference));
  }

  const hours = seconds() / (SECONDS_IN_MINS * MINS_IN_HOURS);

  const whole_hours = hours.toFixed(0);

  function tenths() {
    const remainder = hours - Math.floor(hours);

    if (hours < 1 && remainder < 0.1) return "1";
    return Math.round(remainder * 10).toFixed(0);
  }

  function computedHours() {
    if (hours === 0) return "0";
    return `${whole_hours}.${tenths()}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (started) {
        const start = timestamps.pop();
        if (!start) return;
        setTimestamps([...timestamps, { start: start.start, end: now() }]);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  function toggleTimer() {
    if (started) {
      const start = timestamps.pop();
      if (!start) return;
      setTimestamps([...timestamps, { start: start.start, end: now() }]);
    } else {
      setTimestamps([
        ...timestamps,
        {
          start: now(),
          end: now(),
        },
      ]);
    }
    toggleStarted(!started);
  }

  return (
    <article>
      <input type="text" placeholder="Client" />
      <input type="text" placeholder="Matter" />
      <div className="startRow">
        <button onClick={toggleTimer}>{started ? "Stop" : "Start"}</button>
        <img src={spinner} alt="Running" className={started ? "" : "hide"} />
      </div>
      <p>{computedHours()} hours</p>
      <textarea
        name="Description"
        id="description"
        placeholder="Description"
        cols={30}
        rows={10}
      ></textarea>
    </article>
  );
}

export default Timer;
