Template.courseEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentCourseId = this._id;

    var courseProperties = {
        title: $(e.target).find('[name=title]').val()
    }

    Courses.update(currentCourseId, {$set: courseProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('coursePage', {_id: currentCourseId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this course?")) {
      var currentCourseId = this._id;
      Courses.remove(currentCourseId);
      Router.go('coursesList');
    }
  }
});
