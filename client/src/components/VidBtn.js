import React from "react";

function Button(props) {
  const btnClass = () => {
    let className = 'vid-btn'
    if (props.background === 'red') {
      className += ' vid-btn--red'
    }
    return className
  }

  return (
    <button className={btnClass()}>
      <img className="vid-btn__img" src={props.icon} alt={props.alt} />
    </button>
  )
};

export default Button;
