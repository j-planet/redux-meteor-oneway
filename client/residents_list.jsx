import React from 'react';
const Component = React.Component;
const PropTypes = React.PropTypes;
import { createContainer } from 'meteor/react-meteor-data';

import { ResidentsCollection } from '../collections/residents';


class ResidentsList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('ResidentsList willMount.');
    }

    componentWillReceiveProps(props) {
        console.log('ResidentsList WillReceiveProps, residents:', props.residents);
    }

        render() {
        return (
            <ul className="list-group">
                { this.props.residents.map(resident =>
                    <li className="list-group-item" key={resident._id}>
                        { resident.name} is {resident.isHappy ? 'happy' : 'sad'}.
                    </li>)
                }
            </ul>
        );
    }
}

ResidentsList.propTypes = {
    currentUser: PropTypes.object,
    residents: PropTypes.arrayOf(PropTypes.object)
};

export default createContainer(
    () =>
    {
        return {
            currentUser: Meteor.user(),
            residents: ResidentsCollection.find().fetch()
        };
    }
    , ResidentsList
);