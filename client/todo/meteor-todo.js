if (Meteor.isClient) {
	Meteor.subscribe("tasks");

	Template.body.helpers({
		tasks: function() {
			if(Session.get("hideCompleted")) {
				return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
			}
			else {
				return Tasks.find({}, {sort: {createdAt: -1}});
			}
		},
		hideCompleted: function () {
			return Session.get("hideCompleted");
		},
		incompleteCount: function() {
			return Tasks.find({checked: {$ne: true}}).count();
		}
	});

	Template.body.events({
		'submit .new-task': function (event) {
			// This function is called when the new task form is submitted

			var text = event.target.taskText.value;

			Meteor.call('addTask', text);

			// Clear form
			event.target.taskText.value = '';

			// Prevent default form submit
			return false;
		},
		'change .hide-completed input': function(event) {
			Session.set('hideCompleted', event.target.checked);
		}
	});
}