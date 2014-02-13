Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return [ Meteor.subscribe('currentUser'), Meteor.subscribe('courses'), Meteor.subscribe('tasks')]; }
    
});

Router.map(function() {
    
    this.route('home', {
	path: '/',
	template: 'coursesList'
    });
    this.route('coursesList', {path: '/courses'});
  
    this.route('coursePage', {
	path: '/courses/:_id',
	waitOn: function() { return Meteor.subscribe('tasks'); },
	data: function() { return Courses.findOne(this.params._id); }
    });
/*
    this.route('courseEdit', {
        path: '/courses/:_id/edit',
        data: function() { return Courses.findOne(this.params._id); }
    });
    

    this.route('courseSubmit', {
	path: '/submitCourse'
    });
*/
    this.route('taskEdit', {
	path: '/courses/:courseId/tasks/:_id/edit',
	waitOn: function() { return Meteor.subscribe('tasks'); },
	data: function() { return Tasks.findOne(this.params._id); }
    });
    
});


var requireLogin = function() {
    if (! Meteor.user()) {
	if (Meteor.loggingIn())
	    this.render(this.loadingTemplate);
	else
	    this.render('accessDenied');
	this.stop();
    }
}
Router.before(requireLogin);
Router.before(function() { clearErrors() });
