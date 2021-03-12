import React, { Component } from "react";
import Videos from "../videos/videos";
import Vocab from "../Vocab/vocab";
import "./learn.css";

export class Learn extends Component {
  render() {
    return (
      <>
        <Vocab />
        <Videos />
      </>
    );
  }
}

export default Learn;
