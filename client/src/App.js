import React from "react";

//styles
import "./styles/app.scss";
import logo from './assets/enso-logo.png';
// icons
import camera from './assets/camera.png';
import microphone from './assets/microphone.png';
import screenShare from './assets/screen-share.png';
import options from './assets/options.png';
import phone from './assets/phone.png';
import add from './assets/add.png';
// users
import user1 from './assets/lea.png';
import user2 from './assets/benett.png';
import user3 from './assets/tina.png';


//components
// import Timer from "./components/Timer";
import VidBtn from './components/VidBtn';
import User from './components/User'

function App() {
  const dummy = {
    users: [
      {
        name: 'Lea',
        img: user1
      },
      {
        name: 'Benett',
        img: user2
      },
      {
        name: 'Tina',
        img: user3
      }
    ]
  }

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
            <div className="vid-chat__time">
              3:10:12
            </div>
            <VidBtn icon={camera} alt="toggle video" />
            <VidBtn icon={microphone} alt="toggle microphone" />
            <VidBtn icon={screenShare} alt="screen share" />
            <VidBtn icon={options} alt="options" />
            <VidBtn icon={phone} alt="end call" background='red' />
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
              {dummy.users.map(user => {
                return <User user={user} />
              })}
            </div>
          </div>

        </div>

        <div className="display">

        </div>
      </div>
    </div>
  );
}

export default App;
