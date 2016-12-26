import React from 'react';
import ReactDOM from 'react-dom';

import Homepage from './homepage';


Meteor.startup(() => {
    ReactDOM.render(<Homepage />, document.querySelector('#reactContainer'));
});