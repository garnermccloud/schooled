Template.task.helpers({
    taskTitle: function() {
	var newestIndex = this.commits.length - 1;
	return this.commits[newestIndex].title;
    },
    taskSubmittedDate: function() {
	var newestIndex = this.commits.length - 1;
	return new Date(this.commits[newestIndex].submittedDate);
    },
     taskDueDate: function() {
        var newestIndex = this.commits.length - 1;
        return new Date(this.commits[newestIndex].dueDate);
    },
    taskType: function() {
        var newestIndex = this.commits.length - 1;
        return (this.commits[newestIndex].type == taskType.TEST) ? "Test" : "Assignment";
    },
    taskPercentOfGrade: function() {
        var newestIndex = this.commits.length - 1;
        return this.commits[newestIndex].percentOfGrade;
    },
    taskUsername: function() {
        var newestIndex = this.commits.length - 1;
        return this.commits[newestIndex].username;
    },

    

});

	
    
