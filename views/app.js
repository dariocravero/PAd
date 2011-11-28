PAd.Views.App = Backbone.View.extend({
  el: '#PAd',
  initialize: function() {
    _.bindAll(this, 'shortcuts', 'login', 'logout');
    this.views = {};
    return this;
  },
  render: function() {
    // If a user is logged in, show the modules. 
    if (PAd.current_user.logged_in) {
      this.views.container = new PAd.Views.Modules();
    } else { // Otherwise, render index
      this.views.container = new PAd.Views.Index();
    }

    this.views.toolbar = new PAd.Views.Toolbar().render();
    this.views.container.bind('shortcuts', this.shortcuts);
    this.views.container.render();

    PAd.current_user.bind('login:success', this.login);
    PAd.current_user.bind('logout:success', this.logout);

    return this;
  },
  shortcuts: function(shortcuts) {
    this.views.toolbar.update_shortcuts(shortcuts);
  },
  login: function(current_user) {
    console.log('login', current_user);
  },
  logout: function(current_user) {
    console.log('logout', current_user);
  }
});
