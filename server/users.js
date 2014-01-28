Accounts.onCreateUser(function(options, user) {
    user.courses = [];
    
    var princeton = "princeton.edu";
    var userEmailDomain = user.emails[0].address.split('@').slice(1)[0].toLowerCase();
    if (userEmailDomain === princeton) {
        user.school = "Princeton University";
    } else
	user.school = "";

    if (options.profile)
        user.profile = options.profile;
    return user;
});


Accounts.validateNewUser(function (user) {
  if (user.emails[0].address) {
      var princeton = "princeton.edu";
      var userEmailDomain = user.emails[0].address.split('@').slice(1)[0].toLowerCase();
      if (userEmailDomain === princeton) {
	  return true;
      } else
	  throw new Meteor.Error(403, "Sorry, only valid Princeton email addresses are authorized");
  } else
       throw new Meteor.Error(403, "User doesn't have email address");

});
