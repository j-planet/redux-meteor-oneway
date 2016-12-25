import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ResidentsCollection = new Mongo.Collection('residents');

if (Meteor.isServer)
{
    Meteor.publish('residents.byMood', function(isHappyList){

        console.log('in publish residents.byMood', isHappyList);
        if (isHappyList === undefined)
            throw new Meteor.Error(500, 'Must provide isHappy.');

        return ResidentsCollection.find({isHappy: {$in: isHappyList}});
    });
}

Meteor.methods({
    'residents.add'(name, isHappy = true)
    {
        return ResidentsCollection.insert({name, isHappy});
    },

    'residents.remove'(id)
    {
        if (!ResidentsCollection.findOne(id))
            throw new Meteor.Error(500, `Resident with ID ${id} not found.`);

        ResidentsCollection.remove(id);
    }
});