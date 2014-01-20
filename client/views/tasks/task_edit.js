Template.taskEdit.helpers({
    ownTask: function() {
	return this.userId == Meteor.userId();
    },

    taskTitle: function() {
        var newestIndex = this.commits.length - 1;
        return this.commits[newestIndex].title;
    },
    taskDueDate: function() {
        var newestIndex = this.commits.length - 1;
	var dateISO = new Date(this.commits[newestIndex].dueDate).toISOString().substring(0, 10);
	return dateISO;
    },
    taskTypeTest: function() {
        var newestIndex = this.commits.length - 1;
	return (this.commits[newestIndex].type == taskType.TEST) ? "checked" : "";
    },
    taskTypeAssignment: function() {
        var newestIndex = this.commits.length - 1;
        return (this.commits[newestIndex].type == taskType.ASSIGNMENT) ? "checked" : "";
    },

    
    taskPercentOfGrade: function() {
        var newestIndex = this.commits.length - 1;
        return this.commits[newestIndex].percentOfGrade;
    },



});



Template.taskEdit.events({
    'submit form': function(e, template) {
        e.preventDefault();
	
        var $title = $(e.target).find('[name=title]');
        var $dueDate =  $(e.target).find('[name=dueDate]');
        var $percentOfGrade =  $(e.target).find('[name=percentOfGrade]');
        var $type =  $(e.target).find('[name=taskType]').filter(":checked");
	var task = {
	    _id: template.data._id,
            title: $title.val(),
            dueDate: new Date($dueDate.val()).getTime(),
            percentOfGrade: $percentOfGrade.val(),
            type: $type.val(),
        };

	Meteor.call('updateTask', task, function(error, taskId) {
	    if (error){
		throwError(error.reason);
	    } else {
		Router.go('coursePage', {_id: template.data.courseId});
	    }
	});
    },
    
    'click .delete': function(e) {
	e.preventDefault();
	
	if (confirm("Delete this task?")) {
	    var currentTaskId = this._id;
	    
	    Meteor.call('decrementTasksCount', this.courseId, function(error, courseId) {
		if (error) {
		    throwError(error.reason);
		} else {
		    Tasks.remove(currentTaskId);
		    Router.go('coursePage', {_id: courseId});
		}
	    });
	}
    }
});
