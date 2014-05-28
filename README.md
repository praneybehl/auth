auth
=======
Meteor’s accounts api makes easy login and register. 


### Installation Project
    mrt add auth

##### Usage login and register template.

    {{> login }} login template 
    {{> register }} register template 
    
    {{ authError }} login or register form errors.
    
### default AuthConfigure 
```javascript
AuthConfigure({
    loginRequiredText: 'Please fill in all required fields',
    loginErrorText: 'The email or password was incorrect',
    registerCompleteText: 'Have you successfully register',
    registerEmailValidText: 'Please enter a valid email address.',
    loginComplete: null, // function()
    registerComplete: null // function() 
});   
```
can see application for a detailed [example](https://github.com/waydin/auth/tree/master/example).
