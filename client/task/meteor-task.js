if (Meteor.isClient) {
	Template.task.events({
		'change .toggle-checked': function(event) {
			Meteor.call('setChecked', this._id, event.target.checked);
		},
		'click .delete': function() {
			Meteor.call('deleteTask', this._id);
		},
		'click .toggle-private': function() {
			Meteor.call('setPrivate', this._id, ! this.private);
		}
	});

	Template.task.helpers({
		isOwner: function () {
			return this.owner === Meteor.userId();
		}
	});
}