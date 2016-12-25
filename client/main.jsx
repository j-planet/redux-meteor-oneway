import React from 'react';
import ReactDOM from 'react-dom';
const Component = React.Component;
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Homepage from './homepage';
import Store from './store/store';

// class App extends Component {
//
//     render() {
//         return (<div>{this.props.children}</div>);
//     }
// }

function AppRoot() {
    return (
            <Provider store={Store}>
                <Homepage />
            </Provider>
    );
}

// const routes = (
//     <Router history={browserHistory} >
//         <Route path="/" component={AppRoot} >
//             <IndexRoute component={Homepage}/>
//         </Route>
//     </Router>
// );

Meteor.startup(() => {
    ReactDOM.render(<AppRoot />, document.querySelector('#reactContainer'));
});