import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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
        <>
            {props.isHidden ? (
                <div >
                    {/* See image_rights set to public domain: https://en.wikipedia.org/wiki/Public_domain */}
                    <div className="gcse-searchbox" data-safesearch="true" data-image_as_rights="cc_publicdomain"></div>
                    <div className="gcse-searchresults" data-disablewebsearch="true" data-refinementstyle="link"></div>
                </div >
            ) : null}
        </>
    );
}

const registerCallbacks = (onSelectPhoto) => {
    const makeTwoPartCallback = () => {
        let savedUrlsForRenderCallback = [];
        // When results are ready, save urls corresponding to images
        const readyCallback = (name, q, promos, results, resultsDiv) => {
            if (results && results.length > 0 && Object.keys(results[0]).length > 0) {
                for (const result of results) {
                    savedUrlsForRenderCallback.push(result.image.url);
                }
            }
        };

        // Once results are rendered, attach onclick  callbacks
        const renderedCallback = (name, q, promos, results) => {
            if (results && results.length > 0 && savedUrlsForRenderCallback.length > 0) {
                for (let i = 0; i < results.length; ++i) {
                    results[i].onclick = () => {
                        // pass selected image to parent
                        onSelectPhoto(savedUrlsForRenderCallback[i]);
                    }
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