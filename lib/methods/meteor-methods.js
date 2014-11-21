Meteor.methods({
	addTask: function(text) {
		// Make sure the user is logged in before inserting a task
		if(! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	deleteTask: function(taskId) {
		var task = Tasks.findOne(taskId);

		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.remove(taskId);
	},
	setChecked: function(taskId, setChecked) {
		var task = Tasks.findOne(taskId);

		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { checked: setChecked} });
	},
	setPrivate: function(taskId, isPrivate) {
		var task = Tasks.findOne(taskId);

		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { private: isPrivate}});
	}
});