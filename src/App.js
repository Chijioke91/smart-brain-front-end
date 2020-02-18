import './App.css';
import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  state = initState;

  loadUser = data => {
    this.setState({
      user: {
        ...data
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#imageInput');
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      topRow: height * clarifaiFace.top_row,
      leftCol: width * clarifaiFace.left_col,
      bottomRow: height - clarifaiFace.bottom_row * height,
      rightCol: width - clarifaiFace.right_col * width
    };
  };

  displayFace = box => this.setState({ box });

  onInputChange = input => {
    this.setState({ input });
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    const body = JSON.stringify({ input: this.state.input });

    axios
      .post('https://cjay-smart-brain-app.herokuapp.com/imageurl', body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const body = JSON.stringify({ id: this.state.user.id });
        if (response) {
          axios
            .patch('https://cjay-smart-brain-app.herokuapp.com/image', body, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(({ data }) =>
              this.setState({
                user: {
                  ...this.state.user,
                  entries: data.data
                }
              })
            );
        }
        const returnedBox = this.calculateFaceLocation(response.data);
        return this.displayFace(returnedBox);
      })
      .catch(e => console.log(e));
  };

  render() {
    const {
      isSignedIn,
      box,
      imageUrl,
      route,
      user: { name, entries }
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </Fragment>
        ) : route === 'signin' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
