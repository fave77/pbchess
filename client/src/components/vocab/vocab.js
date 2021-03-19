import React, { Component } from "react";
import Terms from "./Terms.json";
import ScrollTopButton from "./ScrollTop";
import "./vocab.css";

class Vocab extends Component {
  render() {
    console.log(Terms);
    return (
      <div className="content">
        <div className="Container">
          <p className="heading">Learning Chess</p>
          <div className="Terms">
            <div className="tags">
              <h4>
                <a href="#A">A</a>-<a href="#B">B</a>-<a href="#c">C</a>-
                <a href="#D">D</a>-<a href="#E">E</a>-<a href="#F">F</a>-
                <a href="#G">G</a>-<a href="#H">H</a>-<a href="#I">I</a>-
                <a href="#J">J</a>-<a href="#K">K</a>-<a href="#L">L</a>-
                <a href="#M">M</a>-<a href="#N">N</a>-<a href="#O">O</a>-
                <a href="#P">P</a>-<a href="#Q">Q</a>-<a href="#R">R</a>-
                <a href="#S">S</a>-<a href="#T">T</a>-<a href="#U">U</a>-
                <a href="#V">V</a>-<a href="#W">W</a>-<a href="#X">X</a>-
                <a href="#Y">Y</a>-<a href="#Z">Z</a>
              </h4>
              -
            </div>
            {Terms.terms.map((item, i) => (
              <div className="block" id={`${item.id}`}>
                <div className="term-title">
                  <div className="title-size">{item.title}</div>
                </div>
                <div className="meaning">{item.meaning}</div>
              </div>
            ))}
          </div>
        </div>
        <ScrollTopButton />
      </div>
    );
  }
}

export default Vocab;
