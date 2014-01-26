Template.taskSubmit.events({
    'submit form': function(e, template) {
	e.preventDefault();
	
	var $title = $(e.target).find('[name=title]');
	var $dueDate =  $(e.target).find('[name=dueDate]');
	var $notes =  $(e.target).find('[name=notes]');

	var task = {
	    title: $title.val(),
	    dueDate: new Date($dueDate.val()).getTime(),
	    notes: $notes.val(),
	    courseId: template.data._id
    };

    Meteor.call('addTask', task, function(error, taskId) {
      if (error){
        throwError(error.reason);
      } else {
          $title.val('');
	  $dueDate.val('');
	  $notes.val('');
      }
    });
  }
});
