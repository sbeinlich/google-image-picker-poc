import React, { useState } from 'react';
import GoogleSearchModalClass from './components/GoogleSearchModal_prehooks';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        programmableSearchUrl: "https://cse.google.com/cse.js?cx=86c2738c64f044e1e",
        selectedPhotoUrl: null,
        showGoogleSearchModal: true,
      };
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const value = this.state.showGoogleSearchModal;
    const oppositeValue = !this.state.showGoogleSearchModal;
    this.setState({
      showGoogleSearchModal: oppositeValue,
    });
  }

  render() {
      return (
        <div className="App">
          <GoogleSearchModalClass
            isHidden={this.state.showGoogleSearchModal}
            onSelectPhoto={(url) => {
              this.setState({
                selectedPhotoUrl: url,
                showGoogleSearchModal: false,
              });
            }}
            programmableSearchUrl={this.state.programmableSearchUrl}
          />
          <button onClick={this.handleClick} >
            Search for Images
          </button>
          {
            this.state.selectedPhotoUrl &&
            <img src={this.state.selectedPhotoUrl}
              style={{
                width: "100%",
                height: "auto"
              }}
              alt="Selected from Google" />
          }
        </div >
      );
  }
}

export default App;
