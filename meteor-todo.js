var Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	Template.body.helpers({
		tasks: function() {
			return Tasks.find({}, {sort: {createdAt: -1}});
		}
	});

	Template.body.events({
		'submit .new-task': function (event) {
			// This function is called when the new task form is submitted

			var text = event.target.taskText.value;

			Tasks.insert({
				text: text,
				createdAt: new Date() // current time
			});

			// Clear form
			event.target.taskText.value = '';

			// Prevent default form submit
			return false;
		}
	});

	//in event handler, 'this' refers to the task object
	Template.task.events({
		'change .toggle-checked': function(event) {
			Tasks.update(this._id, {$set: {checked: event.target.checked}});
		},
		'click .delete': function() {
			Tasks.remove(this._id);
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
