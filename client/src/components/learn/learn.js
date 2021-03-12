import React, { Component } from "react";
import Videos from "../videos/videos";
import Vocab from "../vocab/vocab";
import "./learn.css";

const Learn = () => {
  return (
    <div>
      <Vocab />
      <Videos />
    </div>
  );
};

export default Learn;
