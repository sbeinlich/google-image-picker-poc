import React, { useState } from 'react';
import GoogleSafeSearchModal from './components/GoogleSearchModal';
import GoogleSearchModalClass from './components/GoogleSearchModal_prehooks';

// const App = () => {
//   const config = {
//     programmableSearchUrl: "https://cse.google.com/cse.js?cx=86c2738c64f044e1e",
//   };
//   const [selectedPhotoUrl, setselectedPhotoUrl] = useState(null);
//   const [showGoogleSearchModal, setshowGoogleSearchModal] = useState(false);

//   return (
//     <div className="App">
//       <GoogleSafeSearchModal
//         isHidden={showGoogleSearchModal}
//         onSelectPhoto={(url) => {
//           setselectedPhotoUrl(url);
//           setshowGoogleSearchModal(false);
//         }}
//         programmableSearchUrl={config.programmableSearchUrl}
//       />
//       <button onClick={() => setshowGoogleSearchModal(!showGoogleSearchModal)} >
//         Search for Images
//       </button>
//       {
//         selectedPhotoUrl &&
//         <img src={selectedPhotoUrl}
//           style={{
//             width: "100%",
//             height: "auto"
//           }}
//           alt="Selected from Google" />
//       }
//     </div >
//   );
// }

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        programmableSearchUrl: "https://cse.google.com/cse.js?cx=86c2738c64f044e1e",
        selectedPhotoUrl: null,
        showGoogleSearchModal: true,
      };
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
          <button onClick={() => this.setState({showGoogleSearchModal: !this.state.showGoogleSearchModal})} >
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
