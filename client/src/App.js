import React, { useState, useEffect } from "react";

//styles
import "./styles/app.scss";
import logo from "./assets/enso-logo.png";
// icons
import camera from "./assets/camera.png";
import microphone from "./assets/microphone.png";
import screenShare from "./assets/screen-share.png";
import options from "./assets/options.png";
import phone from "./assets/phone.png";
import add from "./assets/add.png";
import previous from "./assets/previous.png";
import pause from "./assets/pause.png";
import next from "./assets/next.png";
// users
import user1 from "./assets/lea.png";
import user2 from "./assets/benett.png";
import user3 from "./assets/tina.png";
// poses
import pose1 from "./assets/yoga.png";
import pose2 from "./assets/yoga2.png";
import pose3 from "./assets/yoga3.png";

//socket.io
import io from "socket.io-client";

//components
import VidBtn from "./components/VidBtn";
import User from "./components/User";

const socket = io("http://localhost:5001");

function App() {
  const [timer, setTimer] = useState(0);
  const [pose, setPose] = useState(0);

  const dummy = {
    users: [
      {
        name: "Lea",
        img: user1,
      },
      {
        name: "Benett",
        img: user2,
      },
      {
        name: "Tina",
        img: user3,
      },
    ],
    poses: [
      {
        name: "Standing Half Forward Fold",
        img: pose1,
      },
      {
        name: "Child's Pose",
        img: pose2,
      },
      {
        name: "Steps",
        img: pose3,
      },
    ],
  };

  useEffect(() => {
    socket.on("timer", (time) => {
      setTimer(time);
    });

    return function cleanup() {
      socket.removeEventListener("timer");
    };
  });

  useEffect(() => {
    socket.once("next", (pose) => {
      console.log(pose);

      setPose(pose - 1);
      // let queue = pose + 1;
      // if (queue === dummy.poses.length) {
      //   queue = 0;
      // }
      // setPose(queue);
    });

    return function cleanup() {
      socket.removeEventListener("next");
    };
  });

  return (
    <div className="App">
      {/* layout for the background */}
      <div className="layout">
        <div className="layout__black-top" />
        <div className="layout__black-bottom" />
        <img className="layout__logo" src={logo} alt="logo" />
      </div>

      {/* main content container */}
      <div className="main">
        <div className="vid-chat">
          <div className="vid-chat__controller">
            <div className="vid-chat__time">3:10:12</div>
            <VidBtn icon={camera} alt="toggle video" />
            <VidBtn icon={microphone} alt="toggle microphone" />
            <VidBtn icon={screenShare} alt="screen share" />
            <VidBtn icon={options} alt="options" />
            <VidBtn icon={phone} alt="end call" background="red" />
          </div>

          <div className="vid-chat__participants">
            <div className="vid-chat__container">
              <h2 className="vid-chat__label">Participants</h2>
              <button className="vid-chat__add-user">
                Add
                <img className="vid-chat__add" src={add} alt="add user" />
              </button>
            </div>
            <div className="vid-chat__users">
              {dummy.users.map((user, index) => {
                return <User key={user.name + index} user={user} />;
              })}
            </div>
          </div>
        </div>

        <div className="display">
          <div className="display__container">
            <div className="display__header">
              <div className="display__info">
                <h2 className="display__stretch-info">
                  Sun Salutation | Round 1/4
                </h2>
                <h1 className="display__pose-info">Pose {pose + 1}/9</h1>
              </div>
              <div className="display__timer">
                {/* TODO timer will go in here */}
                00:{timer < 10 ? "0" + timer : timer}
              </div>
            </div>
            <div className="display__pose">
              <img
                className="display__pose-img"
                src={dummy.poses[pose].img}
                alt="current pose"
              />
              <p className="display__pose-name">{dummy.poses[pose].name}</p>
            </div>
          </div>

          <div className="display__controller">
            <button className="display__btn">
              <img
                className="display__icon"
                src={previous}
                alt="previous pose"
              />
            </button>
            <button className="display__btn">
              <img
                className="display__icon display__icon--large"
                src={pause}
                alt="previous pose"
              />
            </button>
            <button className="display__btn">
              <img className="display__icon" src={next} alt="previous pose" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
