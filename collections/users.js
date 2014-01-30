Meteor.methods({
    createAccount: function(email, password) {
	return Accounts.createUser({email: email, password: password});
    }
}); 
