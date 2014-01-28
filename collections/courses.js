Courses = new Meteor.Collection('courses');

Courses.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Meteor.users.allow({
    update: ownsDocument
});

Courses.deny({
  update: function(userId, course, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title').length > 0);
  }
});

Meteor.methods({
    submitCourse: function(courseAttributes) {
	var user = Meteor.user();
	
	
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login to create new courses");
	
	// ensure the course has a title
	if (!courseAttributes.title)
	    throw new Meteor.Error(422, 'Please fill in a course title');
	
	var courseWithSameTitle = Courses.findOne({title: courseAttributes.title});
	
	// check that there are no previous courses with the same title
	if (courseWithSameTitle) {
	    throw new Meteor.Error(302, 
				   'This course has already been added', 
				   courseWithSameTitle._id);
	}
	
	// pick out the whitelisted keys
	var course = _.extend(_.pick(courseAttributes,'title'), {
	    userId: user._id, 
	    username: user.emails[0].address, 
	    submittedDate: new Date().getTime(),
	    tasksCount: 0,
	    school: user.school
	});
	
	var courseId = Courses.insert(course);
	
	Meteor.users.update(
            user._id,
            {
                $push: {
                    courses: courseId
                }
            }
        );
	

	return courseId;
  
  },
    decrementTasksCount: function(courseId) {
	var user = Meteor.user();


        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login");

	Courses.update(
	    courseId, 
	    {
		$inc: {
		    tasksCount: -1
		} 
	    } 
	);
	
	return courseId;
    },
    
    addCourse: function(course) {
	var user = Meteor.user();
	
	//ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login before you can add a course");
	
	if (!course.title)
	    throw new Meteor.Error(422, 'Please fill in the course title');

	var course = Courses.findOne({title: course.title});
	
	if (!course)
	    throw new Meteor.Error(422, 'Course not found. Please update your query or create a new course.');
	
	for (var i = 0; i < user.courses.length; i++) {
	    if (user.courses[i] == course._id) {
		throw new Meteor.Error(422, 'You have already added this course.');
		break;
	    }
	}
	
	Meteor.users.update(
            user._id,
            { 
                $push: {
                    courses: course._id
                } 
            }
        );
	
	return true;
    },
    
    removeCourse: function(courseId) {
        var user = Meteor.user();

        //ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login before you can remove a course");

        
        Meteor.users.update(
            user._id,
            {
                $pull: {
                    courses: courseId
                }
            }
        );

        return true;
    },


});

