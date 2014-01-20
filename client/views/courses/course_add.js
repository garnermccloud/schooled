Template.courseAdd.rendered = function() {
    $('#courseTypeahead').typeahead({
	local: coursesData(),
    });
}

var coursesData = function() {
    var data = [];
    Courses.find().forEach(function(course) {
	data.push(course.title);
    });
    return data;
}


Template.courseAdd.events({
    'submit form': function(e) {
        e.preventDefault();

        var course = {
            title: $(e.target).find('[name=title]').val(),
        }
        Meteor.call('addCourse', course, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
                if (error.error === 302)
                    Router.go('coursesList');
            } else {
                Router.go('coursesList');
            }
        });
    }

});

