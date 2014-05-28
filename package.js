Package.describe({
    summary: "Meteor’s accounts api makes easy login and register."
});

Package.on_use(function(api, where) {
    // apis
    api.use(['templating', 'accounts-base', 'accounts-password'], ['client', 'server']);
    api.use('underscore', ['client', 'server']);

    // files
    api.add_files(['auth.html', 'auth.js'], 'client');
});
