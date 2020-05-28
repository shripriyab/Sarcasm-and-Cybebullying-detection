import React, { Component } from "react";

import "./Result.css";
import { models, sarcasm, sarcasticCyberbullying } from "../../models.js";
import { Link } from "react-router-dom";

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  getResult = async () => {
    let { sentence, endpoint } = this.props.location.state;
    sentence = sentence.replace(/ /g, "%20");

    const response = await fetch(
      `http://127.0.0.1:5000/${endpoint}?query=${sentence}`
    );

    return await response.json();
  };

  async componentDidMount() {
    const result = await this.getResult();
    console.log(result);
    this.setState({
      data: result,
    });
  }

  render() {
    const { data } = this.state;

    const { endpoint, result } = this.props.location.state;

    const modelList = Object.keys(data).filter(
      (element) => element !== "model"
    );

    return (
      <div className="result-body">
        <h1 className="heading">{result}</h1>
        <h1 className="sentence">{this.props.location.state.sentence}</h1>

        <div className="model-grid">
          <div className="model-grid-row">
            <p>Models</p>
            <p>Predicted value</p>
            <p>Result</p>
          </div>

          {modelList.map((element) => (
            <div key={element} className="model-grid-row">
              <p>{models[element]}</p>
              <p>{data[element]}</p>
              <p>
                {endpoint === "sarcasm"
                  ? sarcasm[data[element]]
                  : sarcasticCyberbullying[data[element]]}
              </p>
            </div>
          ))}
        </div>

        <div className="result model-grid-row">
          <p>Neural Networks</p>
          <p>{data.model}</p>
          <p>
            {endpoint === "sarcasm"
              ? sarcasm[data["model"]]
              : sarcasticCyberbullying[data["model"]]}
          </p>
        </div>

        <Link to="/">
          <button className="submit-button try-again" type="submit">
            TRY AGAIN?
          </button>
        </Link>
      </div>
    );
  }
}
