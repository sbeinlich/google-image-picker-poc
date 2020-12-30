import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';

// Props: function
const GoogleSearchModal = (props) => {
    useEffect(() => {
        registerCallbacks(props.onSelectPhoto);

        // Add Google Programmable Search Config Script
        const script = document.createElement('script');
        script.id = "GoogleSearchScript"
        script.src = props.programmableSearchUrl;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            cleanupCallbacks();
        }
    }, [props.programmableSearchUrl, props.onSelectPhoto]);

    return (
        <Dialog open={props.isHidden} onClose={props.onClose} fullWidth={true} maxWidth='md'>
            {/* See image_rights set to public domain: https://en.wikipedia.org/wiki/Public_domain */}
            <div className="gcse-searchbox" data-safesearch="true" data-image_as_rights="cc_publicdomain"></div>
            <div className="gcse-searchresults" data-disablewebsearch="true" data-refinementstyle="link"></div>
        </Dialog >

    );
}

const registerCallbacks = (onSelectPhoto) => {
    // Two part callback to handle ready results and rendered results
    const makeTwoPartCallback = () => {
        let photoOnClickFunctions = [];
        // When results are ready, generate onClick functions for each to-be-rendered photo
        const readyCallback = (name, q, promos, results, resultsDiv) => {
            photoOnClickFunctions = []; // clear any previous results
            if (results && results.length > 0 && Object.keys(results[0]).length > 0) {
                for (const result of results) {
                    photoOnClickFunctions.push(() => onSelectPhoto(result.image.url));
                }
            }
        };

        // Once results are rendered, attach onclick functions to each rendered photo
        const renderedCallback = (name, q, promos, results) => {
            if (results && results.length > 0 && photoOnClickFunctions.length > 0) {
                for (let i = 0; i < results.length; ++i) {
                    // Attach an onclick handler to each rendered result
                    results[i].onclick = photoOnClickFunctions[i];
                }
            }
        };
        return {
            readyCallback,
            renderedCallback
        };
    };
    const {
        readyCallback,
        renderedCallback,
    } = makeTwoPartCallback();
    window.__gcse || (window.__gcse = {});
    window.__gcse.searchCallbacks = {
        image: {
            ready: readyCallback,
            rendered: renderedCallback,
        },
    };
}

const cleanupCallbacks = () => {
    window.__gcse.searchCallbacks = {};
}

GoogleSearchModal.propTypes = {
    isHidden: PropTypes.bool.isRequired,
    onSelectPhoto: PropTypes.func.isRequired,
    programmableSearchUrl: PropTypes.string.isRequired
};
export default GoogleSearchModal;