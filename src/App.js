import React, { Component } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import presaleUsersArray from "./data/test.json";
import UserInfo from "./components/UserInfo";

class App extends Component {
  state = {
    users: presaleUsersArray,
  };

  render() {
    console.log(this.state);
    return (
      <div className="transaction-history-wrapper">
        <table className="transaction-history">
          <thead>
            <tr>
              <th>User address</th>
              <th>NUX amount (initial)</th>
              <th>NUX amount (current)</th>
              <th>Outcome transactions (yes/no)</th>
              <th>Outcome transactions (address)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => {
              const uniqueKey = uuid();
              return (
                <UserInfo key={uniqueKey} userData={user} interval={index} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
