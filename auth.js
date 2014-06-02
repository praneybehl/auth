(function() {
    var root = this,
        Templates, Valid, error, Conf, HelperContext; 

    Conf = {
        loginRequiredText: 'Please fill in all required fields',
        loginErrorText: 'The email or password was incorrect',
        registerCompleteText: 'Have you successfully register',
        registerEmailValidText: 'Please enter a valid email address.',
        registerRequiredText: 'Please fill in all required fields',
        loginBtnClass: 'btn btn-login',
        registerBtnClass: 'btn btn-register',
        loginComplete: null,
        registerComplete: null
    };

    // Configure Auth
    root.AuthConfigure = function(obj) {
        Conf = C = _.extend(Conf, obj);
        return C;
    };

    Valid = {
        isNotEmpty: function(val) {
            return !!val || !!val === '';
        },
        isEmail: function(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    };

    HelperContext = {
        conf: function() {
            return Conf;
        }
    };

    authError = function(text) { Session.set('authError', text); };
    onConf = function(fn) { Conf[fn] && Conf[fn](); };

    Templates = {
        Login: {
            Helpers: _.extend({}, HelperContext),
            Events: {
                'submit #AuthLoginForm': function(e, t) {
                    e.preventDefault();
                    var email = t.find('#login_email').value,
                        password = t.find('#login_password').value;
                    if (Valid.isNotEmpty(password) && Valid.isNotEmpty(email)) { 
                        Meteor.loginWithPassword(email, password, function(err) {
                            if (err) {
                                authError(Conf.loginErrorText);
                                return;
                            }
                            authError(false);
                            onConf('loginComplete');
                        });
                    }
                    authError(Conf.loginRequiredText);
                }
            }
        },
        Register: {
            Helpers: _.extend({}, HelperContext),
            Events: {
                'submit #AuthRegisterForm': function(e, t) {
                    e.preventDefault();
                    var email = t.find('#register_email').value,
                        username = t.find('#register_username').value,
                        password = t.find('#register_password').value;
                    if (Valid.isNotEmpty(password) && Valid.isNotEmpty(email) && Valid.isNotEmpty(username)) { 
                        if (!Valid.isEmail(email)) {
                            authError(Conf.registerEmailValidText);
                            return;
                        }
                        Accounts.createUser({
                            username: username,
                            email: email,
                            password: password
                        }, function(err) {
                            if (err) {
                                authError(err.reason);
                                return;
                            }
                            authError(false);
                            onConf('registerComplete');
                        });
                    } else {
                        authError(Conf.registerRequiredText);
                    }
                }
            }
        }
    };

    UI.registerHelper('authError', function() {
        return Session.get('authError');
    });

    // helpers
    Template.login.helpers(Templates.Login.Helpers);
    Template.register.helpers(Templates.Login.Helpers);

    // events
    Template.login.events(Templates.Login.Events);
    Template.register.events(Templates.Register.Events);
}).call(this);
