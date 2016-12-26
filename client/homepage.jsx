import React from 'react';
const Component = React.Component;

import { callBackBert } from './utilities';
import ResidentsList from './residents_list';


class Homepage extends Component {

    constructor(props) {
        super(props);

        this.handle = null;
    }

    broadcast_residents(isHappyList) {

        if (this.handle) this.handle.stop();


        this.handle = Meteor.subscribe('residents.byMood', isHappyList,
            {
                onReady: () => console.log('>>> handle is ready for', isHappyList),
                onStop: (err) => console.log('>>> handle STOPPED for', isHappyList)
            });
    }

    componentWillMount() {
        this.broadcast_residents([true, false]);
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps: Received residents:', props);
    }

    handle_add_happy_click()
    {
        Meteor.call('residents.add', 'a', true,
            callBackBert('Added happy')
        )
    }

    handle_add_sad_click()
    {
        Meteor.call('residents.add', 'a', false,
            callBackBert('Added sad')
        )
    }

    handle_both_click()
    {
        this.broadcast_residents([true, false]);
    }

    handle_happy_click()
    {
        this.broadcast_residents([true]);
    }

    handle_sad_click()
    {
        this.broadcast_residents([false]);
    }

    handle_stop_subscription()
    {
        this.handle.stop();
    }

    render() {

        return (
            <div>
                <button className="btn btn-primary"
                        onClick={this.handle_add_happy_click.bind(this)} >
                    Add happy
                </button>

                <button className="btn btn-primary"
                        onClick={this.handle_add_sad_click.bind(this)} >
                    Add sad
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

                <button className="btn btn-block" onClick={this.handle_stop_subscription.bind(this)}>UNSUBSCRIBE</button>

                <ResidentsList />

            </div>
        );
    }
}

export default Homepage;