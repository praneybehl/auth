if (Meteor.isClient) {
    AuthConfigure({
        loginComplete: function() {
            console.log("login user", Meteor.user());
        },
        registerComplete: function() {
            console.log("Register and login user", Meteor.user());
        }
    });
}
