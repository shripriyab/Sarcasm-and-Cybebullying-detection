import React, { Component } from "react";

import "./Home.css";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isValid: false,
      endpoint: "",
    };
  }

  handleTextInput = (e) => {
    const text = e.target.value;

    this.setState({
      text,
      isValid: text ? true : false,
    });
  };

  render() {
    const { text, isValid } = this.state;

    const endpoints = {
      sarcasm: "Sarcasm",
      sarcasticCyberbullying: "Sarcastic Cyberbullying",
    };

    const linksToResult = Object.keys(endpoints).map((endpoint) => (
      <Link
        key={endpoint}
        className={!isValid ? "disabled" : ""}
        to={{
          pathname: "/result",
          state: {
            sentence: text,
            endpoint: `${endpoint}`,
            result: `${endpoints[endpoint]}`,
          },
        }}
      >
        <button className="submit-button" type="submit">
          {endpoints[endpoint]}
        </button>
      </Link>
    ));

    return (
      <div className="container">
        <img
          src="https://famisafe.wondershare.com/cyberbullying/images/banner_img.png "
          alt="Cyberbullying"
        />

        <form id="sarcasm-form">
          <label htmlFor="sarcasm-input" className="text-input">
            Please enter a sentence :
          </label>
          <textarea
            value={text}
            rows="4"
            cols="50"
            name="input"
            type="text"
            placeholder="Input text"
            id="sarcasm-input"
            onChange={this.handleTextInput}
          />

          <div className="submit-buttons">{linksToResult}</div>
        </form>
      </div>
    );
  }
}
