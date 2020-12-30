import React from 'react';
import GoogleSearchModalPrehooks from './components/GoogleSearchModalPrehooks';

class AppPrehooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programmableSearchUrl: "https://cse.google.com/cse.js?cx=86c2738c64f044e1e",
      selectedPhotoUrl: null,
      showGoogleSearchModal: false,
    };
  }

  render() {
    return (
      <div className="App">
        <GoogleSearchModalPrehooks
          isHidden={this.state.showGoogleSearchModal}
          onSelectPhoto={(url) => {
            this.setState({
              selectedPhotoUrl: url,
              showGoogleSearchModal: false,
            });
          }}
          onClose={() => this.setState({ showGoogleSearchModal: false })}
          programmableSearchUrl={this.state.programmableSearchUrl}
        />
        <button onClick={() => this.setState({ showGoogleSearchModal: !this.state.showGoogleSearchModal })} >
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

export default AppPrehooks;
