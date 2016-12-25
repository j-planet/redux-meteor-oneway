import React from 'react';
const Component = React.Component;
const PropTypes = React.PropTypes;
import { connect } from 'react-redux';
import { Tracker } from 'meteor/tracker';

import { callBackBert } from './utilities';
import setFilter from './actions/set_filter';
import setResidents from './actions/set_residents';
import { ResidentsCollection } from '../collections/residents';


class Homepage extends Component {

    constructor(props) {
        super(props);

        console.log('Constructor: Received residents:', props);
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps: Received residents:', props);
    }

    handle_add_click()
    {
        Meteor.call('residents.add', 'a', true,
            callBackBert('Added')
        )
    }

    handle_both_click()
    {
        this.props.dispatch(setFilter([true, false]));
    }

    handle_happy_click()
    {
        this.props.dispatch(setFilter([true]));

        // if (this.props.originator != 'homepage')
        this.props.handle.stop();

        Tracker.autorun(() => {
            const handle = Meteor.subscribe('residents.byMood', [true]);
            let data = ResidentsCollection.find().fetch();
            console.log('fetched data:', data);
            this.props.dispatch(setResidents({residents: data, handle: handle, originator: 'homepage'}));
        });

    }


    handle_sad_click()
    {
        this.props.dispatch(setFilter([false]));
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary"
                        onClick={this.handle_add_click.bind(this)} >
                    Add
                </button>

                <button className="btn btn-outline-info" onClick={this.handle_both_click.bind(this)}>
                    Both
                </button>

                <button className="btn btn-outline-success" onClick={this.handle_happy_click.bind(this)}>
                    Happy Only
                </button>

                <button className="btn btn-outline-danger" onClick={this.handle_sad_click.bind(this)}>
                    Sad Only
                </button>

                <ul className="list-group">
                    { this.props.residents.map(resident =>
                        <li className="list-group-item" key={resident._id}>
                            { resident.name} is {resident.isHappy ? 'happy' : 'sad'}.
                        </li>)
                    }
                </ul>

            </div>
        );
    }
}

Homepage.propTypes = {
    residents: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps({residentsNhandle}) {
    const {residents, handle, originator} = residentsNhandle;
    return { residents, handle, originator };
}

export default connect(mapStateToProps)(Homepage);