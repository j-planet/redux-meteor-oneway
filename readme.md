#Basic and Pragmatic Use of Redux with Meteor

To demonstrate the concept and workflow, the setup is as simple as it gets:
* Lists residents by happy/sad
 * Add residents
 * Unsubscribe from the Meteor DB

![Screenshot at Dec 26 00-38-08.png](https://s29.postimg.org/dix7tdq6f/Screenshot_at_Dec_26_00_38_08.png)

##Motivation

It was sufficient to use Meteor for most of my projects until passing down data 3-levels deep AND maintaining proper route query string became impossible. So, it was time for **app-wide, global** state.

##Design & Workflow

The **key points** are that:
1. Components are the only ones modifying the Meteor DB. Not actions, not reducers. Redux serves only as an app-wide data warehouse.
2. Whichever component modifies the Meteor DB is responsible for populating the Redux store with new data.
3. Components pull data from the Redux store whenever possible. Otherwise, update the store.

![FullSizeRender.jpg](https://s27.postimg.org/d0uukic8j/Full_Size_Render.jpg)

### Setup

* Meteor stuff:
    * a Meteor Mongo collection of residents
* Redux stuff:
    * set_residents action and reducer
* 2 components: 
    * homepage
    * the list of residents    

##Tricky Things that I Eventually Figured Out
* To fetch data from the Meteor DB backend and update the store, wrap `ResidentsCollection.find().fetch()` in a `Tracker.autorun` block.
* Do NOT put `subscribe` in a `Tracker.auto` block.
* When using a new filter to fetch data (e.g. sad residents only instead of all residents), the previous `subscription` has to be stopped. 2 ways to do this:
    1. Saving a handle on the existing the `subscription`.
    2. A stop parameter in the `publication` method.
* `Subscription` results are app-wide!

<br>
<br>
<br>
<br>
<br>
<br>

<sup>Because someone taught me to publish my work in forms of meaningful packages that can be of use to others.</sup>