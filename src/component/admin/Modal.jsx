import React from "react";
import "./style.scss";

export default function Modal() {
  return (
    <div className="modal">
      <div className="container-modal">
        <div className="big-title">Phim</div>
        <div className="row-input">
          <div className="title">Name</div>
          <input className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Name</div>
          <input className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Name</div>
          <input className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Name</div>
          <input className="input" placeholder="test" />
        </div>
        <div className="row-input">
          <div className="title">Name</div>
          <input className="input" placeholder="test" />
        </div>
        <div className="submit">
          <button type="submit">submit</button>
        </div>
      </div>
    </div>
  );
}
