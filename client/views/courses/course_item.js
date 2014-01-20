Template.courseItem.helpers({
    ownCourse: function() {
	return this.userId == Meteor.userId();
    }
});


Template.courseItem.events({
    
    'click #removeCourse': function(e) {
	e.preventDefault();
	
	if (confirm("Remove " +this.title+ " from your courses?")) {
	    var currentCourseId = this._id;
	    var user = Meteor.user();
	    Meteor.call('removeCourse', currentCourseId, function(error) {
		if (error) {
		    // display the error to the user
                    throwError(error.reason);
   		} else {
                    Router.go('coursesList');
		}
            });
	    
	}
    }
});

