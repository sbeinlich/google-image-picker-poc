import React, { useState } from 'react';
import GoogleSafeSearchModal from './components/GoogleSearchModal';

const App = () => {
  const config = {
    programmableSearchUrl: "https://cse.google.com/cse.js?cx=86c2738c64f044e1e",
  };
  const [selectedPhotoUrl, setselectedPhotoUrl] = useState(null);
  const [showGoogleSearchModal, setshowGoogleSearchModal] = useState(false);

  return (
    <div className="App">
      <GoogleSafeSearchModal
        isHidden={showGoogleSearchModal}
        onSelectPhoto={(url) => {
          setselectedPhotoUrl(url);
          setshowGoogleSearchModal(false);
        }}
        programmableSearchUrl={config.programmableSearchUrl}
      />
      <button onClick={() => setshowGoogleSearchModal(!showGoogleSearchModal)} >
        Search for Images
      </button>
      {
        selectedPhotoUrl &&
        <img src={selectedPhotoUrl}
          style={{
            width: "100%",
            height: "auto"
          }}
          alt="Selected from Google" />
      }
    </div >
  );
}

export default App;
