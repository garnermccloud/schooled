Tasks = new Meteor.Collection('tasks');

Tasks.allow({
    remove: ownsDocument
});

Meteor.methods({
    addTask: function(taskAttributes) {
	var user = Meteor.user();
	
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login to add tasks");
	
	if (!taskAttributes.title)
	    throw new Meteor.Error(422, 'Please create a title');
	if (!taskAttributes.dueDate)
            throw new Meteor.Error(422, 'Please give task a due date');
	if (!taskAttributes.courseId)
	    throw new Meteor.Error(422, 'You must add the task to a course');
	
	task = {
	    userId: user._id,
	    courseId: taskAttributes.courseId,
	    commits: [
		{
		    title: taskAttributes.title,
		    userId: user._id,
		    username: user.username,
		    submittedDate: new Date().getTime(),
		    type: (taskAttributes.type == 'test') ? taskType.TEST : taskType.ASSIGNMENT,
		    dueDate: taskAttributes.dueDate,
		    percentOfGrade: taskAttributes.percentOfGrade
		}	    
	    ]
	}
	// update the course with the number of tasks
	Courses.update(task.courseId, {$inc: {tasksCount: 1} } );
	return Tasks.insert(task);
    },

     updateTask: function(taskAttributes) {
        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add tasks");

        if (!taskAttributes.title)
            throw new Meteor.Error(422, 'Please create a title');
        if (!taskAttributes.dueDate)
            throw new Meteor.Error(422, 'Please give task a due date');



        
        var commit = {
                    title: taskAttributes.title,
                    userId: user._id,
                    username: user.username,
                    submittedDate: new Date().getTime(),
                    type: (taskAttributes.type == 'test') ? taskType.TEST : taskType.ASSIGNMENT,
                    dueDate: taskAttributes.dueDate,
                    percentOfGrade: taskAttributes.percentOfGrade
        };

            
        // update the tasks
         return Tasks.update({_id: taskAttributes._id}, {$push: {commits: commit} } );
    }



});
