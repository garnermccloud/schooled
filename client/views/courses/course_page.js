Template.coursePage.helpers({
  tasks: function() {
    return Tasks.find({courseId: this._id, valid: true});
  }
});
