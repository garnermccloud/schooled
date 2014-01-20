

Template.coursesList.helpers({
    courses: function() {
	var user = Meteor.user();
	return Courses.find({ _id: { $in: user.courses} }, {sort: {title: 1} });
    }
});
