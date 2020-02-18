import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async () => {
    const { name, email, password } = this.state;

    const body = JSON.stringify({ name, email, password });

    const response = await axios.post(
      'https://cjay-smart-brain-app.herokuapp.com/register',
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const user = response.data;

    if (user) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
