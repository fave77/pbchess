import React, { Component } from "react";

export default class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    var scrollComp = this;
    document.addEventListener("scroll", function(e) {
      scrollComp.buttonVisible();
    });
  }

  buttonVisible() {
    if (window.pageYOffset > 350) {
      this.setState({
        visible: true
      });
    } else {
      this.setState({
        visible: false
      });
    }
  }

  scrolltoTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div className="scroll-to-top">
        {visible&&(<div className="to-top" onClick={() => this.scrolltoTop()}><i class="fas fa-arrow-up"></i></div>)}
      </div>
    );
  }
}
