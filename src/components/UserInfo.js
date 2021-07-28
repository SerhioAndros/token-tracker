import React, { Component } from "react";
import { fetchInfo } from "../services/apiEtherscan";

class userInfo extends Component {
  state = {
    userTXInfo: "",
    // outcomeAddresses,
  };

  componentDidMount() {
    setTimeout(
      () =>
        fetchInfo(this.props.userData.To).then((resp) =>
          this.setState({ userTXInfo: [...resp.result] })
        ),
      500 * (this.props.interval + 1)
    );

    setTimeout(() => this.getAddresses(), 900 * (this.props.interval + 1));
  }

  toNumber = () => {
    if (typeof this.props.userData.Value === "number") {
      return this.props.userData.Value;
    }

    return this.props.userData.Value.split(",").join("");
  };

  getAddresses = () => {
    if (typeof this.state.userTXInfo === "object") {
      const tmpArr = [];
      this.state.userTXInfo.map((eachTX) => tmpArr.push(eachTX.to));
      let uniq = (a) => [...new Set(a)];
      this.setState({ outcomeAddresses: [...uniq(tmpArr)] });
      return;
    }
    return;
  };

  render() {
    return (
      <tr>
        <td>{this.props.userData.To}</td>
        <td>{Math.round(this.toNumber())}</td>
        <td>info</td>
        {this.state.userTXInfo.length === 1 && (
          <>
            <td style={{ color: "green" }}>no</td>
            <td>no outcome address</td>
          </>
        )}
        {this.state.userTXInfo.length <= 0 && (
          <>
            <td style={{ color: "yellow" }}>error</td>
            <td>Outcome transactions (address)</td>
          </>
        )}
        {this.state.userTXInfo.length > 1 && (
          <>
            <td style={{ color: "red" }}>yes</td>
            <td>Addresses: {this.state.outcomeAddresses?.join(", ")}</td>
          </>
        )}
      </tr>
    );
  }
}

export default userInfo;
