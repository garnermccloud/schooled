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
		    email: user.emails[0].address,
		    submittedDate: new Date().getTime(),
		    dueDate: taskAttributes.dueDate,
		    notes: taskAttributes.notes,
		    valid: true
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


	 var task = Tasks.findOne({_id: taskAttributes._id});
	 
	 var valid = task.commits[task.commits.length - 1].valid;
        
        var commit = {
            title: taskAttributes.title,
            userId: user._id,
            email: user.emails[0].address,
            submittedDate: new Date().getTime(),
            dueDate: taskAttributes.dueDate,
	    notes: taskAttributes.notes,
	    valid: valid
        };

            
        // update the tasks
         return Tasks.update({_id: taskAttributes._id}, {$push: {commits: commit} } );
    },
    
    invalidateTask: function(taskId) {
	 var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add tasks");

        if (!taskId)
            throw new Meteor.Error(422, 'There is no taskId');

	var task = Tasks.findOne({_id: taskId});

	var commit =  task.commits[task.commits.length - 1];

	commit.valid = !commit.valid;


        // update the tasks
         return Tasks.update({_id: task._id}, {$push: {commits: commit} } );

    },

     validateTask: function(taskId) {
         var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add tasks");

        if (!taskId)
            throw new Meteor.Error(422, 'There is no taskId');

	 var task = Tasks.findOne({_id: taskId});
	 
         var commit =  task.commits[task.commits.length - 1];
	 
         commit.valid = !commit.valid;

	 
         // update the tasks
         return Tasks.update({_id: task._id}, {$push: {commits: commit} } );
	 
     }



});
