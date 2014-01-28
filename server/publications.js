Meteor.publish('courses', function() {
    var user = Meteor.users.findOne(this.userId);
    var school;
    if (user) {
	school = user.school;
    }
    return Courses.find({school:school});
    
});

Meteor.publish('tasks', function(courseId) {
    return Tasks.find({courseId:courseId});
});


Meteor.publish('currentUser', function() {
    return Meteor.users.find(
	this.userId, 
	{
	    fields: {
		courses: 1,
		school: 1
	    }
	}
    );
});
