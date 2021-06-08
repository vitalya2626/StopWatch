import { useState } from "react";

import { interval } from "rxjs";
import { map } from "rxjs/operators";
import "./App.css";
import StopWatch from "./Stopwatch/Stopwatch";

const delay = 1000;

function App() {
  const [timer, setTimer] = useState(0);
  const [difference, setDifference] = useState(0);

  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(delay)
        .pipe(map((v) => v + 1))
        .subscribe((v) => {
          setTimer(v + difference);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDifference(0);
      setSubscription("");
    }
  };

  const pause = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }

      setDifference(timer);
      setSubscription("");
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timerSubscription = interval(delay).subscribe((v) => {
      setTimer(v);
    });
    setSubscription(timerSubscription);
  };

  return (
    <div className="App">
      <h1>RxJS Timer</h1>
      <hr />
      <StopWatch timePassed={timer ? timer : difference} />
      <div>
        <button onClick={onStartHandler} className="btn btn-success">
          Start/Stop
        </button>
        <button 
          onClick={pause} 
          className="btn btn-warning"
          title={'Use doubleclick to activate'}
        >
          Pause
        </button>
        <button onClick={onResetHandler} className="btn btn-danger">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;