var princetonCourseString = Assets.getText('schoolsCourseData/princetonUniversity/spring2014.txt');
var princetonCourses = princetonCourseString.split(",");

 
if (Courses.find().count() === 0) {
    for (var i = 0; i < princetonCourses.length; i++) {
	Courses.insert({
	    title: princetonCourses[i],
	    userId: "serverAdminID",
	    username: "Server Admin",
	    submittedDate: new Date().getTime(),
	    tasksCount: 0,
	    school: "Princeton University"
	});
    }
}
 
