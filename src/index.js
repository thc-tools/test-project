import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Flag to know if DOM was loaded
document.addEventListener('DOMContentLoaded', () => { window._hasFiredDOMContentLoaded = true; });

/**
 * Initialisation to do when DOM is loaded, then start the application (with the needed part for HOT_RELOAD)
 *
 */
const onDOMContentLoaded = () => {
    ReactDOM.render(<App />, document.getElementById('main-content-app'));
};


/**
 * Initialisation of the application : first the initialisers that don't need the DOM, then the others.
 *
 */
const appInit = () => {
    window.onDOMContentLoaded = onDOMContentLoaded;
    if (window._hasFiredDOMContentLoaded) {
        onDOMContentLoaded();
    } else {
        document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    }
};

// First we load the configuration of the application, then the conf for the user, and only after we start the application
appInit();