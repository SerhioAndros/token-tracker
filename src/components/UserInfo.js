import React, { Component } from "react";
import { fetchInfo } from "../services/apiEtherscan";

const gate = "0x0d0707963952f2fba59dd06f2b425ace40b492fe";
const mxc = "0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88";
const pancake = "0x84e004fa17d4173c5fa49396cb1bd70ae6d94e53";
const uniswap = "0x83054b25b21d1f3a2b96e8e3803dbd4921358d52";
const dehive = "0x9eeb89d38af8d722ab5f5e73d4b8bc64b35630cb";

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
      1000 * (this.props.interval + 1)
    );

    setTimeout(() => this.getAddresses(), 2000 * (this.props.interval + 1));
  }

  toNumber = () => {
    if (typeof this.props.userData.Value === "number") {
      return this.props.userData.Value;
    }

    return this.props.userData.Value.split(",").join("");
  };

  checkExchanges = (arr) => {
    const exchanges = [gate, mxc, pancake, uniswap, dehive];

    const tmpArr = arr.map((address) => exchanges.includes(address));

    if (tmpArr.length > 0 && tmpArr.includes(true)) {
      return this.setState({ exchanges: "Send to exchanges" });
    }
    if (tmpArr.length === 0 || (tmpArr.length > 0 && !tmpArr.includes(true))) {
      return;
    }
    return console.log("false...");
  };

  getAddresses = () => {
    if (typeof this.state.userTXInfo === "object") {
      const tmpArr = [];
      this.state.userTXInfo.map((eachTX) => tmpArr.push(eachTX.to));

      const uniq = (arr) => [...new Set(arr)];

      const filterOutcomeTX = (arr) =>
        arr.filter((item) => item !== this.props.userData.To);

      const tmpArrFin = filterOutcomeTX(uniq(tmpArr));
      this.checkExchanges(tmpArrFin);

      if (tmpArrFin?.length > 0) {
        return this.setState({ outcomeAddresses: [...tmpArrFin] });
      }
      return;
    }
    return console.log("some mistake");
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
            {this.state.outcomeAddresses ? (
              <>
                {this.state.exchanges ? (
                  <td>Withdraw to exchanges</td>
                ) : (
                  <td>Addresses: {this.state.outcomeAddresses?.join(", ")}</td>
                )}
              </>
            ) : (
              <td>Only income TX</td>
            )}
          </>
        )}
      </tr>
    );
  }
}

export default userInfo;
