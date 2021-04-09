import React, { Component } from "react";
import Terms from "./Terms.json";
import ScrollTopButton from "./ScrollTop";
import "./vocab.css";

class Vocab extends Component {
  render() {
    let letters = Terms.terms.filter(x => x.id).map(x => x.id)
    return (
      <div className="content">
        <div className="Container">
          <p className="heading">Learning Chess</p>
          <div className="Terms">
            <div className="tags">
              <h4>
                {letters.map((x,i) => <><a href={`#${x}`}>{x}</a>{i!==letters.length-1 && "-"}</>)}
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
