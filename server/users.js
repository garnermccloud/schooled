Accounts.onCreateUser(function(options, user) {
    user.courses = [];
    
    if (options.profile)
        user.profile = options.profile;
    return user;
});
