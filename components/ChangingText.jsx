"use client"
import React, { Component } from "react";
import Typewriter from "typewriter-effect/dist/core";

class ChangingText extends Component {
  componentDidMount() {
    new Typewriter(this.typewriterRef, {
      strings: ["Clothing", "Vehicles","Electronics"],
      autoStart: true,
      loop: true,
    });
  }

  render() {
    return (
      <h1 className="changing-text" ref={(el) => (this.typewriterRef = el)} />
    );
  }
}

export default ChangingText;
