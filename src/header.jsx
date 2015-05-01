import React from "react/addons"
import Router from "react-router"

let {Link} = Router

/*
export class header extends React.Component {
  constructor () {
    this.state = {
      loggedIn: false
    };
  }

  setStateOnAuth (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  }

  componentWillMount () {
    auth.onChange = this.setStateOnAuth.bind(this);
    auth.login();
  }

  render () {
    return (
      <div className="ui pointing menu">
        <div className="ui page grid">
          <div className="column" style={{"padding-bottom": 0}}>
            <div className="title item">
              <b>JobRunner</b>
            </div>
            <Link className="item" to="home">
              Home
            </Link>
            <Link className="item" to="about">
              About
            </Link>
            <div className="right floated item">
              <i className="setting icon"/>
            </div>
            {this.state.loggedIn ? (
              <div className="right floated item">
                <div className="ui teal button">Log out</div>
              </div>
            ) : (
              <div className="right floated item">
                <div className="ui button">Log in</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
*/
var ui = require('./ui');

export default React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false
    };
  },
  loginClick: function() {
    ui.loginModal();
  },
  render: function() {
    return (
      <div className="appWrapper">
        <div className="ui pointing menu">
        <div className="ui page grid">
          <div className="column" style={{"padding-bottom": 0}}>
            <div className="title item">
              <b>JobRunner</b>
            </div>
            <Link className="item" to="home">
              Home
            </Link>
            <Link className="item" to="about">
              About
            </Link>
            <div className="right floated item">
              <i className="setting icon"/>
            </div>
            {this.state.loggedIn ? (
              <div className="right floated item">
                <div className="ui teal button">Log out</div>
              </div>
            ) : (
              <div className="right floated item">
                <div className="ui button" onClick={this.loginClick}>Log in</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modalHolder">
      </div>
    </div>
    )
  }
});
