import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

//image
import dogImage from "../assets/pawsitivedog.jpg";

export default function Timer() {
  const [timerStart, setTimerStart] = useState(false);

  const Completionist = () => <img src={dogImage} alt="dog" />;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  return (
    <div>
      <Countdown
        onPause={timerStart}
        date={Date.now() + 3000}
        renderer={renderer}
      />
    </div>
  );
}
