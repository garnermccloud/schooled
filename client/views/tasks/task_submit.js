Template.taskSubmit.events({
    'submit form': function(e, template) {
	e.preventDefault();
	
	var $title = $(e.target).find('[name=title]');
	var $dueDate =  $(e.target).find('[name=dueDate]');
	var $percentOfGrade =  $(e.target).find('[name=percentOfGrade]');
	var $type =  $(e.target).find('[name=taskType]').filter(":checked");

	var task = {
	    title: $title.val(),
	    dueDate: new Date($dueDate.val()).getTime(),
	    percentOfGrade: $percentOfGrade.val(),
	    type: $type.val(),
	    courseId: template.data._id
    };

    Meteor.call('addTask', task, function(error, taskId) {
      if (error){
        throwError(error.reason);
      } else {
          $title.val('');
	  $dueDate.val('');
	  $percentOfGrade.val('');
	  $type.val('');
      }
    });
  }
});
