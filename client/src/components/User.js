import React from "react";

function User(props) {
  return (
    <div className="user">
      <img className="user__img" src={props.user.img} alt="user" />
      <p className="user__name">{props.user.name}</p>
    </div>
  );
}

export default User;
