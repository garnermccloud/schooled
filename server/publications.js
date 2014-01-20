Meteor.publish('courses', function() {
    return Courses.find();
});

Meteor.publish('tasks', function(courseId) {
    return Tasks.find({courseId:courseId});
});


Meteor.publish('currentUser', function() {
    return Meteor.users.find(
	this.userId, 
	{
	    fields: {
		courses: 1
	    }
	}
    );
});
