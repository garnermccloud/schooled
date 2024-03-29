Houston.add_collection(Meteor.users);

Meteor.publish('courses', function() {
    var user = Meteor.users.findOne(this.userId);
    var school;
    if (user) {
	school = user.school;
    }
    return Courses.find({school:school});
    
});

Meteor.publish('tasks', function() {

    var user = Meteor.users.findOne(this.userId);
    var courses;
    if (user) {
	if (user.courses) {
            courses = user.courses;
	} else {
	    courses = [];
	}
    } else {
	courses = [];
    }
    //console.log("courses = " + courses)
    return Tasks.find({courseId: { $in: courses} });
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
